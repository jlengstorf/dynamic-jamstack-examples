const axios = require('axios');

module.exports = async (query, variables = {}) =>
  axios
    .post(
      'https://graphql.fauna.com/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
        },
      },
    )
    .then(response => response.data.data)
    .catch(error => {
      console.error(error);
    });
