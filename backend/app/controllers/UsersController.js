const {
  v4: uuidv4,
} = require('uuid');
const connection = require('../../db/connection');

async function checkOperation(ngoKey, incidentKey, res) {
  if (!ngoKey) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const incident = await connection('incidents').select('*').where({ key: incidentKey }).first();
  if (!incident) {
    return res.status(404).json({ error: 'Not found' });
  }

  const ngo = await connection('ngos').select('id').where({ key: ngoKey }).first();
  if (ngo.id !== incident.ngo_id) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  return null;
}

module.exports = {
  async create(req, res) {
    const ngoKey = req.headers.authorization;

    const ngo = await connection('ngos').select('id').where({ key: ngoKey }).first();
    if (!ngo) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const {
      name, nickname = name.split(' ')[0], email, password,
    } = req.body;

    const key = uuidv4();

    // TODO: check uniques (key, email)

    await connection('users').insert({
      key,
      ngo_id: ngo.id,
      name,
      nickname,
      email,
      password,
    });

    return res.status(201).json(
      {
        key,
      },
    );
  },

  async index(req, res) {
    const ngoKey = req.headers.authorization;
    const { page = 0, size = 10, sort = 'id,DESC' } = req.query;

    let users = [];
    let total = 0;
    if (ngoKey) {
      const ngo = await connection('ngos').select('id').where({ key: ngoKey }).first();

      if (ngo) {
        users = await connection('users').select('*').where({ ngo_id: ngo.id })
          .limit(size)
          .offset(page * size)
          .orderBy(sort.split(',')[0], sort.split(',')[1]);

        total = await connection('users').count('*').where({ ngo_id: ngo.id }).first();
      } else {
        return res.status(401).json({ error: 'Not authorized' });
      }
    } else {
      users = await connection('users').select('*')
        .limit(size)
        .offset(page * size)
        .orderBy(sort.split(',')[0], sort.split(',')[1]);

      total = await connection('users').count('*').first();
    }

    const count = total.count ? total.count : 0;
    res.header('X-Total-Count', count);

    return res.json(users);
  },

  async show(req, res) {
    const ngoKey = req.headers.authorization;
    const userKey = req.params.key;

    const response = checkOperation(ngoKey, userKey, res);
    if (response) return response;

    const user = await connection('users').select('*').where({ key: userKey }).first();

    return res.json(user);
  },

  async update(req, res) {
    const ngoKey = req.headers.authorization;
    const userKey = req.params.key;

    const response = checkOperation(ngoKey, userKey, res);
    if (response) return response;

    const { name, nickname = name.split(' ')[0], email } = req.body;

    await connection('users').update({
      name,
      nickname,
      email,
    }).where({ key: userKey });

    return res.json();
  },

  // async patch(req, res) {
  //   const ngoKey = req.headers.authorization;
  //   const userKey = req.params.key;

  // const response = checkOperation(ngoKey, userKey, res);
  // if (response) return response;

  //   const { key, value } = req.body;

  //   await connection('users').update().where({key: userKey});

  //   return res.json();
  // },

  async delete(req, res) {
    const ngoKey = req.headers.authorization;
    const userKey = req.params.key;

    const response = checkOperation(ngoKey, userKey, res);
    if (response) return response;

    await connection('users').delete().where({ key: userKey });

    return res.status(204).send();
  },
};
