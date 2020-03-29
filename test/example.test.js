const { expect, assert, should } = require('chai');

describe('Simple Math Test', () => {
	it('should return 2', () => {
		expect(1 + 1).to.equal(2);
	});
	it('should return 9', () => {
		expect(3 * 3).to.equal(9);
	});
});
