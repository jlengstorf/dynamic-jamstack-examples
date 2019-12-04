const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');

const uploadToGitHub = (imagePath, callback) => {
  const GITHUB_API = 'https://api.github.com';
  const username = 'jlengstorf';
  const repo = 'dynamic-jamstack-examples';
  const dir = 'examples/02-offload-intense-work/images';

  // get the image data as a base64-encoded string so we can send via HTTP PUT
  const imageData = fs.readFileSync(imagePath);
  const imageContent = Buffer.from(imageData).toString('base64');

  // upload the converted image to our GitHub repo
  // see https://developer.github.com/v3/repos/contents/#create-or-update-a-file
  axios
    .put(
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
    )
    .then(response => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          url: response.data.content.download_url,
        }),
      });
    })
    .catch(error => {
      callback({
        statusCode: 500,
        body: JSON.stringify('unable to upload image to GitHub'),
      });
    });
};

const convertToGrayscale = (inputPath, callback) => {
  // create a unique filename for the converted image
  const { name, ext } = path.parse(inputPath);
  const targetPath = `${name}-bw-${Date.now()}${ext}`;

  // convert the image to greyscale using Sharp
  // see https://sharp.pixelplumbing.com/en/v0.17.1/api-constructor/
  // see https://sharp.pixelplumbing.com/en/v0.17.1/api-colour/#tocolorspace
  sharp(inputPath)
    .toColorspace('b-w')
    .toFile(targetPath, err => {
      if (err) {
        callback({
          statusCode: 500,
          body: JSON.stringify('unable to convert image to greyscale'),
        });
        return;
      }

      // once the file is converted, upload it to GitHub
      uploadToGitHub(targetPath, callback);
    });
};

exports.handler = (event, _context, callback) => {
  const { imageURL } = JSON.parse(event.body);
  const imagePath = path.basename(imageURL);
  const file = fs.createWriteStream(imagePath);

  https.get(imageURL, response => {
    // store the image data from the URL in the newly created file
    response.pipe(file);

    file
      .on('finish', () => {
        // once the file is downloaded, close it and convert it to B&W
        file.close(() => {
          convertToGrayscale(imagePath, callback);
        });
      })
      .on('error', () => {
        // if something goes wrong, delete the file and send back an error
        fs.unlink(imagePath);

        callback({
          statusCode: 500,
          body: JSON.stringify('unable to download image'),
        });
      });
  });
};
