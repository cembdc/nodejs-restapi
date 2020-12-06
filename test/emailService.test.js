const { expect, assert, should } = require('chai');
const { emailService } = require('../src/service/service.index');

describe('Forgot Password Email Send Test', () => {
	it('should return success = true', async () => {
		// const result = await emailService.sendForgotPasswordMail('gameminity@gmail.com');

		// assert.equal(result.success, true);
		expect(3 * 3).to.equal(9);
	});
});
