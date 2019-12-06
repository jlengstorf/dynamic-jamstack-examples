# Async/Dynamic JAMstack Examples

This repo is a collection of demos to accompany an article for Smashing Magazine.

## Run this repo locally

TODO add full instructions

- clone the repo (`git clone git@github.com:jlengstorf/dynamic-jamstack-examples.git`)
- install dependencies for the serverless functions (`yarn` or `npm i`)
- install the Netlify CLI (`yarn global add netlify-cli` or `npm i -g netlify-cli`)
- create a Netlify site (`ntl init`)
- open the site’s dashboard (`ntl open`)
- go to Deploys => Deploy Settings => Environment
- add an environment variable called `GITHUB_TOKEN`
  - get this token from https://github.com/settings/tokens
  - give the token the `public_repo` scope
- add an environment variable called `FAUNA_SERVER_KEY`
  - log in or sign up at https://dashboard.fauna.com/
  - create a new database
  - click "security" in the left-hand menu
  - click "new key"
  - change the role to "Server"
  - add a name for the key (e.g. "Smashing JAMstack Demos")
  - click "save"
- upload the GraphQL schema for your Fauna database
  - on your Fauna dashboard (https://dashboard.fauna.com/), choose the database you just created
  - click "GraphQL" in the left-hand menu
  - click "import schema"
  - upload `db-schema.gql` (located at `examples/03-store-data/db-schema.gql`)
- start Netlify Dev (`ntl dev`)
- open the site at http://localhost:3000

