const graphql = require('./util/graphql');

const GET_SIGNATURES = `
  query {
    signatures {
      data {
        name
      }
    }
  }
`;

exports.handler = async () => {
  const { signatures } = await graphql(GET_SIGNATURES);

  return {
    statusCode: 200,
    body: JSON.stringify(signatures.data),
  };
};
