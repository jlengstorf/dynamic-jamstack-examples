exports.handler = async (_event, context) => {
  try {
    const { user } = context.clientContext;

    if (!user) throw new Error('Not Authorized');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <h1>You’re Invited, ${user.user_metadata.full_name}!</h1>
        <p>If you can read this it means we’re best friends.</p>
        <p>
          Here are the secret details for my birthday party:<br />
          <a href="https://jason.af/party">jason.af/party</a>
        </p>
      `,
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: 'Not Authorized',
    };
  }
};
