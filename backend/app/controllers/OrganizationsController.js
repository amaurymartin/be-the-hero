const {
  v4: uuidv4,
} = require('uuid');
const connection = require('../../db/connection');

module.exports = {
  async create(req, res) {
    const {
      name, nickname = name.split(' ')[0], email, password, whatsapp, city, state, country,
    } = req.body;

    const key = uuidv4();

    // TODO: check uniques (key, email, whatsapp)

    await connection('organizations').insert({
      key,
      name,
      nickname,
      email,
      password,
      whatsapp,
      city,
      state,
      country,
    });

    return res.status(201).json(
      {
        key,
      },
    );
  },

  async index(_req, res) {
    const organizations = await connection('organizations').select('*');
    const total = await connection('organizations').count('*').first();

    const count = total.count ? total.count : 0;
    res.header('X-Total-Count', count);

    return res.json(organizations);
  },

  async show(req, res) {
    const organizationKey = req.params.key;
    const organization = await connection('organizations').select('*')
      .where({ key: organizationKey });

    return res.json(organization);
  },

  async update(req, res) {
    const { authorization } = req.headers.authorization;
    const organizationKey = req.params.key;

    const organizationAsToken = await connection('organizations').select('*')
      .where({ key: authorization });

    if (!organizationAsToken) return res.status(401).json({ error: 'Not authorized' });

    const organization = await connection('organizations').select('*')
      .where({ key: organizationKey });

    if (!organization) return res.status(404).json({ error: 'Not found' });

    if (organizationAsToken.id !== organization.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const {
      name, nickname = name.split(' ')[0], email, whatsapp, city, state, country,
    } = req.body;

    // TODO: check email uniqueness
    await connection('organizations').update({
      name,
      nickname,
      email,
      whatsapp,
      city,
      state,
      country,
    }).where({ key: organizationKey });

    return res.json();
  },

  // async patch(req, res) {
  //   const { authorization } = req.headers.authorization;
  //   const organizationKey = req.params.key;

  //   const organizationAsToken = await connection('organizations').select('*')
  //     .where({ key: authorization });

  //   if (!organizationAsToken) return res.status(401).json({ error: 'Not authorized' });

  //   const organization = await connection('organizations').select('*')
  //     .where({ key: organizationKey });

  //   if (!organization) return res.status(404).json({ error: 'Not found' });

  //   if (organizationAsToken.id !== organization.id) {
  //     return res.status(403).json({ error: 'Forbidden' });
  //   }

  //   const { key, value } = req.body;

  //   await connection('organizations').update().where({ key: organizationKey });

  //   return res.json();
  // },

  async delete(req, res) {
    const { authorization } = req.headers.authorization;
    const organizationKey = req.params.key;

    const organizationAsToken = await connection('organizations').select('*')
      .where({ key: authorization });

    if (!organizationAsToken) return res.status(401).json({ error: 'Not authorized' });

    const organization = await connection('organizations').select('*')
      .where({ key: organizationKey });

    if (!organization) return res.status(404).json({ error: 'Not found' });

    if (organizationAsToken.id !== organization.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await connection('organizations').delete().where({ key: organizationKey });

    return res.status(204).send();
  },
};
