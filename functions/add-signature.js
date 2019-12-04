const qs = require('querystring');
const graphql = require('./util/graphql');

const ADD_SIGNATURE = `
  mutation($signature: String!) {
    createSignature(data: { name: $signature }) {
      _id
    }
  }
`;

exports.handler = async event => {
  try {
    // get the signature from the form data
    const { signature } = qs.parse(event.body);

    // store the signature in the database
    await graphql(ADD_SIGNATURE, { signature });

    // send people back to the petition page
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <!doctype html>
        <html>
          <head>
            <meta http-equiv="Refresh" content="0; url=/03-store-data" />
          </head>
          <body>
            <p>
              Redirecting <a href="/03-store-data">back to the petition</a>...
            </p>
          </body>
        </html>
      `,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
