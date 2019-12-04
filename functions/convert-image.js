const fs = require('fs');
const path = require('path');
const tmp = require('tmp');
const jimp = require('jimp');
const axios = require('axios');

const uploadToGitHub = (imagePath, tmpDir) => {
  const GITHUB_API = 'https://api.github.com';
  const username = 'jlengstorf';
  const repo = 'dynamic-jamstack-examples';
  const dir = 'examples/02-offload-intense-work/images';

  // get the image data as a base64-encoded string so we can send via HTTP PUT
  const imageData = fs.readFileSync(path.join(tmpDir, imagePath));
  const imageContent = Buffer.from(imageData).toString('base64');

  // upload the converted image to our GitHub repo
  // see https://developer.github.com/v3/repos/contents/#create-or-update-a-file
  return axios.put(
    `${GITHUB_API}/repos/${username}/${repo}/contents/${dir}/${imagePath}`,
    {
      message: `feat: upload ${imagePath}`,
      content: imageContent,
    },
    {
      headers: {
        // get a token at https://github.com/settings/tokens
        // make sure it has the `public_repo` scope
        // set this as an env var for your site at https://app.netlify.com
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    },
  );
};

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404, body: '404 Not Found' };
  }
  try {
    // get the image URL from the POST submission
    const { imageURL } = JSON.parse(event.body);

    // use a temporary directory to avoid intermediate file cruft
    const tmpDir = tmp.dirSync();

    // create a unique filename for the converted image
    const { name, ext } = path.parse(imageURL);
    const targetPath = `${name}-bw-${Date.now()}${ext}`;

    // load the image from URL
    // see https://www.npmjs.com/package/jimp
    const image = await jimp.read(imageURL);

    // convert the image to greyscale and save to the new filename
    await image.greyscale().writeAsync(path.join(tmpDir.name, targetPath));

    // upload the processed image to GitHub
    const response = await uploadToGitHub(targetPath, tmpDir.name);

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: response.data.content.download_url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
