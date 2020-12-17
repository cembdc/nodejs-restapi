const mongoose = require('mongoose');
const { expect } = require('chai');
const { toJSON } = require('../../src/model/plugins/plugins.index');

describe('toJSON plugin Test', () => {
	let connection;

	beforeEach(() => {
		connection = mongoose.createConnection();
	});

	it('should replace _id with id', () => {
		const schema = mongoose.Schema();
		schema.plugin(toJSON);
		const Model = connection.model('Model', schema);
		const doc = new Model();
		expect(doc.toJSON()).to.not.have.property('_id');
		expect(doc.toJSON()).to.have.property('id', doc._id.toString());
	});

	it('should remove __v', () => {
		const schema = mongoose.Schema();
		schema.plugin(toJSON);
		const Model = connection.model('Model', schema);
		const doc = new Model();
		expect(doc.toJSON()).to.not.have.property('__v');
	});

	it('should remove createdAt and updatedAt', () => {
		const schema = mongoose.Schema({}, { timestamps: true });
		schema.plugin(toJSON);
		const Model = connection.model('Model', schema);
		const doc = new Model();
		expect(doc.toJSON()).to.not.have.property('createdAt');
		expect(doc.toJSON()).to.not.have.property('updatedAt');
	});

	it('should remove any path set as private', () => {
		const schema = mongoose.Schema({
			public: { type: String },
			private: { type: String, private: true }
		});
		schema.plugin(toJSON);
		const Model = connection.model('Model', schema);
		const doc = new Model({ public: 'some public value', private: 'some private value' });
		expect(doc.toJSON()).to.not.have.property('private');
		expect(doc.toJSON()).to.have.property('public');
	});

	it('should remove any nested paths set as private', () => {
		const schema = mongoose.Schema({
			public: { type: String },
			nested: {
				private: { type: String, private: true }
			}
		});
		schema.plugin(toJSON);
		const Model = connection.model('Model', schema);
		const doc = new Model({
			public: 'some public value',
			nested: {
				private: 'some nested private value'
			}
		});
		expect(doc.toJSON()).to.not.have.property('nested.private');
		expect(doc.toJSON()).to.have.property('public');
	});
});
