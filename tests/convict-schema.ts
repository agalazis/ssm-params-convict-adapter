const schema = {
	b: {
		default: '',
		doc: 'an eaxmaple string',
		env: 'EXAMPLE_STRING',
		format: String,
		ssmParameter: {
			path: '/path/b',
			strict: false
		}
	}
};
export default schema;
