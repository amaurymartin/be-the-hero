const connection = require('../../db/connection');
const {
  v4: uuidv4,
} = require('uuid');

module.exports = {
  async create(req, res) {
    let {name, nickname, email, whatsapp, city, state, country} = req.body;

    const key = uuidv4();

    if(nickname == null) nickname = name.split(' ')[0];

    // TODO: check uniques (key, email, whatsapp)

    await connection('ngos').insert({
      key,
      name,
      nickname,
      email,
      whatsapp,
      city,
      state,
      country
    });

    return res.status(201).json(
      {
        key
      }
    );
  },

  async index(_req, res) {
    const ngos = await connection('ngos').select('*');
    let total = await connection('ngos').count('*').first();

    const count = total.count ? total.count : 0;
    res.header('X-Total-Count', count);

    return res.json(ngos);
  },

  async show(req, res) {
    const ngoKey = req.params.key;
    const ngo = await connection('ngos').select('*').where({key: ngoKey});

    return res.json(ngo);
  },

  async update(req, res) {
    const ngoKey = req.params.key;
    let {name, nickname, email, whatsapp, city, state, country} = req.body;

    if(nickname == null) nickname = name.split(' ')[0];

    await connection('ngos').update({
      name,
      nickname,
      email,
      whatsapp,
      city,
      state,
      country
    }).where({key: ngoKey});

    return res.json();
  },

  async patch(req, res) {
    const ngoKey = req.params.key;
    let {key, value} = req.body;

    // await connection('ngos').update({
    // }).where({key: ngoKey});

    return res.json();
  },

  async delete(req, res) {
    const ngoKey = req.params.key;
    await connection('ngos').delete().where({key: ngoKey});

    return res.status(204).send();
  }
};
