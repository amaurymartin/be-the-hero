const {
  v4: uuidv4,
} = require('uuid');
const connection = require('../../db/connection');

async function getOrganization(organizationKey) {
  const organization = await connection('organizations').select('id')
    .where({ key: organizationKey }).first();

  return organization;
}

async function getIncident(incidentKey = null) {
  if (!incidentKey) return null;

  const incident = await connection('incidents').select('*').where({ key: incidentKey }).first();

  return incident;
}

module.exports = {
  async create(req, res) {
    const organizationKey = req.headers.authorization;

    if (!organizationKey) return res.status(403).json({ error: 'Forbidden' });

    const organization = await getOrganization(organizationKey);
    if (!organization) return res.status(401).json({ error: 'Not authorized' });

    const { title, description, value } = req.body;
    const key = uuidv4();

    // TODO: check uniques (key)

    await connection('incidents').insert({
      key,
      organization_id: organization.id,
      title,
      description,
      value,
    });

    return res.status(201).json(
      {
        key,
      },
    );
  },

  async index(req, res) {
    const organizationKey = req.headers.authorization;
    const { page = 0, size = 10, sort = 'id,DESC' } = req.query;

    let incidents = [];
    let total = 0;

    if (organizationKey) {
      const organization = await getOrganization(organizationKey);
      if (!organization) return res.status(401).json({ error: 'Not authorized' });

      incidents = await connection('incidents').select('*')
        .where({ organization_id: organization.id })
        .limit(size)
        .offset(page * size)
        .orderBy(sort.split(',')[0], sort.split(',')[1]);
      total = await connection('incidents').count('*')
        .where({ organization_id: organization.id }).first();
    } else {
      incidents = await connection('incidents').select('*')
        .limit(size)
        .offset(page * size)
        .orderBy(sort.split(',')[0], sort.split(',')[1]);

      total = await connection('incidents').count('*').first();
    }

    const count = total.count ? total.count : 0;
    res.header('X-Total-Count', count);

    return res.json(incidents);
  },

  async show(req, res) {
    const organizationKey = req.headers.authorization;
    const incidentKey = req.params.key;

    let organization;
    if (organizationKey) {
      organization = await getOrganization(organizationKey);
      if (!organization) return res.status(401).json({ error: 'Not authorized' });
    }

    const incident = await getIncident(incidentKey);
    if (!incident) return res.status(404).json({ error: 'Not found' });

    if (organization && (organization.id !== incident.organization_id)) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    return res.json(incident);
  },

  async update(req, res) {
    const organizationKey = req.headers.authorization;
    const incidentKey = req.params.key;

    if (!organizationKey) return res.status(403).json({ error: 'Forbidden' });

    const organization = await getOrganization(organizationKey);
    if (!organization) return res.status(401).json({ error: 'Not authorized' });

    const incident = await getIncident(incidentKey);
    if (!incident) return res.status(404).json({ error: 'Not found' });

    if (organization && (organization.id !== incident.organization_id)) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const { title, description, value } = req.body;

    await connection('incidents').update({
      title,
      description,
      value,
    }).where({ key: incidentKey });

    return res.json();
  },

  // async patch(req, res) {
  //   const organizationKey = req.headers.authorization;
  //   const incidentKey = req.params.key;

  //   if (!organizationKey) return res.status(403).json({ error: 'Forbidden' });

  //   const organization = await getOrganization(organizationKey);
  //   if (!organization) return res.status(401).json({ error: 'Not authorized' });

  //   const incident = await getIncident(incidentKey);
  //   if (!incident) return res.status(404).json({ error: 'Not found' });

  //   if (organization && (organization.id !== incident.organization_id)) {
  //     return res.status(401).json({ error: 'Not authorized' });
  //   }

  //   const { key, value } = req.body;

  //   await connection('incidents').update().where({ key: incidentKey });

  //   return res.json();
  // },

  async delete(req, res) {
    const organizationKey = req.headers.authorization;
    const incidentKey = req.params.key;

    if (!organizationKey) return res.status(403).json({ error: 'Forbidden' });

    const organization = await getOrganization(organizationKey);
    if (!organization) return res.status(401).json({ error: 'Not authorized' });

    const incident = await getIncident(incidentKey);
    if (!incident) return res.status(404).json({ error: 'Not found' });

    if (organization && (organization.id !== incident.organization_id)) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await connection('incidents').delete().where({ key: incidentKey });

    return res.status(204).send();
  },
};
