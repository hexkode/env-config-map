const envConfigMap = require('../../index.js');

describe('default redaction', () => {
  test('should equal to "**********"', () => {
    process.env.FIXTURE = 'mypassword';
    const configMap = {
      FIXTURE: { redact: true },
    };

    const config = envConfigMap(configMap);
    const redacted = config.getRedacted();
    expect(redacted.FIXTURE).toStrictEqual('**********');
  });
});
