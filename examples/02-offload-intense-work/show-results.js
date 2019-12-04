// remove any existing nodes from a given DOM element
const emptyContainer = container => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

export default async (originalImageURL, conversionPromise) => {
  // get the display DOM element and make sure it’s empty
  const convertedDisplay = document.getElementById('converted');
  emptyContainer(convertedDisplay);

  // add a loading state
  convertedDisplay.innerHTML = '<p>processing...</p>';

  // grab the template for showing images
  const template = document.getElementById('conversion-template');
  const converted = document.importNode(template.content, true);

  // wait for the images to load before trying to display them
  await Promise.all([
    new Promise(resolve => {
      const originalImage = converted.querySelector('.original');
      originalImage.addEventListener('load', () => resolve());
      originalImage.src = originalImageURL;
    }),
    new Promise(async resolve => {
      const convertedImage = converted.querySelector('.converted');
      convertedImage.addEventListener('load', () => resolve());

      const result = await Promise.resolve(conversionPromise);
      convertedImage.src = result.url;
    }),
  ]);

  // remove the loading text
  emptyContainer(convertedDisplay);

  // add the images to the container
  convertedDisplay.appendChild(converted);
};
