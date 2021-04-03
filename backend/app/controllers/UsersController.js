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

    let {name, nickname, email, password} = req.body;

    const key = uuidv4();
    if(nickname == null) nickname = name.split(' ')[0];

    // TODO: check uniques (key, email)

    await connection('users').insert({
      key,
      ngo_id: ngo.id,
      name,
      nickname,
      email,
      password
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

    let users = [];
    let total = 0;
    if(ngoKey) {
      const ngo = await connection('ngos').select('id').where({key: ngoKey}).first();

      if(ngo) {
        users = await connection('users').select('*').where({ngo_id: ngo.id})
          .limit (size)
          .offset(page * size)
          .orderBy(sort.split(',')[0], sort.split(',')[1])

        total = await connection('users').count('*').where({ngo_id: ngo.id}).first();
      } else
        return res.status(401).json({error: 'Not authorized'});
    } else {
      users = await connection('users').select('*')
        .limit (size)
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

    res = checkOperation(ngoKey, userKey, res);
    if(res) return res;

    const user = await connection('users').select('*').where({key: userKey}).first();

    return res.json(user);
  },

  async update(req, res) {
    const ngoKey = req.headers.authorization;
    const userKey = req.params.key;

    res = checkOperation(ngoKey, userKey, res);
    if(res) return res;

    let {name, nickname, email} = req.body;
    if(nickname == null) nickname = name.split(' ')[0];

    await connection('users').update({
      name,
      nickname,
      email
    }).where({key: userKey});

    return res.json();
  },

  // async patch(req, res) {
  //   const ngoKey = req.headers.authorization;
  //   const userKey = req.params.key;

  //   res = checkOperation(ngoKey, userKey, res);
  //   if(res) return res;

  //   let {key, value} = req.body;

  //   await connection('users').update().where({key: userKey});

  //   return res.json();
  // },

  async delete(req, res) {
    const ngoKey = req.headers.authorization;
    const userKey = req.params.key;

    res = checkOperation(ngoKey, userKey, res);
    if(res) return res;

    await connection('users').delete().where({key: userKey, ngo_id: ngo.id});

    return res.status(204).send();
  }
};

async function checkOperation(ngoKey, userKey, res) {
  if(!ngoKey)
    return res.status(401).json({error: 'Not authorized'});

  const user = await connection('users').select('*').where({key: userKey}).first();
  if(!user)
    return res.status(404).json({error: 'Not found'});

  const ngo = await connection('ngos').select('id').where({key: ngoKey}).first();
  if(ngo.id !== user.ngo_id)
    return res.status(401).json({error: 'Not authorized'});
};