export default async event => {
  event.preventDefault();

  const elements = event.target.elements;
  const imageURL = elements['imageURL'].value;

  const result = await fetch('/.netlify/functions/convert-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageURL }),
  })
    .then(result => result.json())
    .catch(error => console.error(error));

  const template = document.getElementById('conversion-template');
  const converted = document.importNode(template.content, true);

  console.log(converted);

  const originalImage = converted.querySelector('.original');
  originalImage.src = imageURL;

  const convertedImage = converted.querySelector('.converted');
  convertedImage.src = result.url;

  const convertedDisplay = document.getElementById('converted');
  convertedDisplay.appendChild(converted);
};
