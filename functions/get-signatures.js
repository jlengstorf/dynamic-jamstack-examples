const graphql = require('./util/graphql');

exports.handler = async () => {
  const { signatures } = await graphql(`
    query {
      signatures {
        data {
          name
        }
      }
    }
  `);

  return {
    statusCode: 200,
    body: JSON.stringify(signatures.data),
  };
};
