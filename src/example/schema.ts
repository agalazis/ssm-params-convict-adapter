const schema = {
  auth: {
    default: true,
    doc: 'Whether authentication is required',
    env: 'TESTDB_AUTH',
    format: Boolean,
  },
  password: {
    default: '',
    doc: 'The example testdb password',
    env: 'TESTDB_PASS',
    format: String,
    ssmParameter: {
      path: '/testdb/db/password',
      strict: false,
    },
  },
  username: {
    default: '',
    doc: 'The example testdb username',
    env: 'TESTDB_USER',
    format: String,
    ssmParameter: {
      path: '/testdb/db/username',
      strict: true,
    },
  },
};
export default schema;
