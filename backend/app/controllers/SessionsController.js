const connection = require('../../db/connection');
const {
  v4: uuidv4,
} = require('uuid');

module.exports = {
  async create(req, res) {
    const userEmail = req.headers.email;
    const userPassword = req.headers.password;

    const user = await connection('users').select('*').where({email: userEmail, password: userPassword}).first();
    let ngo = {};

    if(user)
      ngo = await connection('ngos').select('*').where({id: user.ngo_id});
    else
      return res.status(401).json({error: 'Not authorized'});

    return res.json(ngo);
  }
};
