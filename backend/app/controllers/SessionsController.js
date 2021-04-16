const connection = require('../../db/connection');

module.exports = {
  async create(req, res) {
    const userEmail = req.headers.email;
    const userPassword = req.headers.password;

    const organization = await connection('organizations').select('*')
      .where({ email: userEmail, password: userPassword }).first();

    if (!organization) return res.status(401).json({ error: 'Not authorized' });

    return res.json(organization);
  },
};
