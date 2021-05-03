const keyable = require('../../../src/utils/keyable');

describe('generate uuid', () => {
  it('should generate uuid', () => {
    const uuid = keyable();
    expect(uuid).toHaveLength(36);
  });
});
