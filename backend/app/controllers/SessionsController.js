const connection = require('../../db/connection');

module.exports = {
  async create(req, res) {
    const { email, password } = req.headers;

    const organization = await connection('organizations').select('*')
      .where({ email, password }).first();

    if (!organization) return res.status(401).json({ error: 'Not authorized' });

    return res.status(201).json(organization);
  },
};
