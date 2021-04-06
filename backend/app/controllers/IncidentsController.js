const connection = require('../../db/connection');
const {
  v4: uuidv4,
} = require('uuid');

module.exports = {
  async create(req, res) {
    const ngoKey = req.headers.authorization;

    const ngo = await connection('ngos').select('id').where({key: ngoKey}).first();
    if(!ngo)
      return res.status(401).json({error: 'Not authorized'});

    let {title, description, value} = req.body;
    const key = uuidv4();

    // TODO: check uniques (key)

    await connection('incidents').insert({
      key,
      ngo_id: ngo.id,
      title,
      description,
      value
    });

    return res.status(201).json(
      {
        key
      }
    );
  },

  async index(req, res) {
    const ngoKey = req.headers.authorization;
    const {page = 0, size = 10, sort = 'id,DESC'} = req.query;

    let incidents = [];
    let total = 0;
    if(ngoKey) {
      const ngo = await connection('ngos').select('id').where({key: ngoKey}).first();

      if(ngo) {
        incidents = await connection('incidents').select('*').where({ngo_id: ngo.id})
          .limit (size)
          .offset(page * size)
          .orderBy(sort.split(',')[0], sort.split(',')[1])

        total = await connection('incidents').count('*').where({ngo_id: ngo.id}).first();
      } else
        return res.status(401).json({error: 'Not authorized'});
    } else {
      incidents = await connection('incidents').select('*')
        .limit (size)
        .offset(page * size)
        .orderBy(sort.split(',')[0], sort.split(',')[1]);

      total = await connection('incidents').count('*').first();
    }

    const count = total.count ? total.count : 0;
    res.header('X-Total-Count', count);

    return res.json(incidents);
  },

  async show(req, res) {
    const ngoKey = req.headers.authorization;
    const incidentKey = req.params.key;

    res = checkOperation(ngoKey, incidentKey, res);
    if(res) return res;

    const incident = await connection('incidents').select('*').where({key: incidentKey}).first();

    return res.json(incident);
  },

  async update(req, res) {
    const ngoKey = req.headers.authorization;
    const incidentKey = req.params.key;

    res = checkOperation(ngoKey, incidentKey, res);
    if(res) return res;

    let {title, description, value} = req.body;

    await connection('incidents').update({
      title,
      description,
      value
    }).where({key: incidentKey});

    return res.json();
  },

  // async patch(req, res) {
  //   const ngoKey = req.headers.authorization;
  //   const incidentKey = req.params.key;

  //   res = checkOperation(ngoKey, incidentKey, res);
  //   if(res) return res;

  //   let {key, value} = req.body;

  //   await connection('incidents').update().where({key: incidentKey});

  //   return res.json();
  // },

  async delete(req, res) {
    const ngoKey = req.headers.authorization;
    const incidentKey = req.params.key;

    res = checkOperation(ngoKey, incidentKey, res);
    if(res) return res;

    await connection('incidents').delete().where({key: incidentKey, ngo_id: ngo.id});

    return res.status(204).send();
  }
};

async function checkOperation(ngoKey, incidentKey, res) {
  if(!ngoKey)
    return res.status(401).json({error: 'Not authorized'});

  const incident = await connection('incidents').select('*').where({key: incidentKey}).first();
  if(!incident)
    return res.status(404).json({error: 'Not found'});

  const ngo = await connection('ngos').select('id').where({key: ngoKey}).first();
  if(ngo.id !== incident.ngo_id)
    return res.status(401).json({error: 'Not authorized'});
};
