const qs = require('querystring');
const graphql = require('./util/graphql');

exports.handler = async event => {
  try {
    // get the signature from the POST data
    const { signature } = qs.parse(event.body);

    const ADD_SIGNATURE = `
      mutation($signature: String!) {
        createSignature(data: { name: $signature }) {
          _id
        }
      }
    `;

    // store the signature in the database
    await graphql(ADD_SIGNATURE, { signature });

    // send people back to the petition page
    return {
      statusCode: 302,
      headers: {
        Location: '/03-store-data/',
      },
      // body is unused in 3xx codes, but required in all function responses
      body: 'redirecting...',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
