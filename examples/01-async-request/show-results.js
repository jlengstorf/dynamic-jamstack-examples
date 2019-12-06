const createResultRow = container => character => {
  if (!'content' in document.createElement('template')) {
    console.error('your browser does not support the template element');
  }

  // load the template for a result row
  const template = document.getElementById('search-result-template');
  const result = document.importNode(template.content, true);

  // update the template content
  result.querySelector('.name').textContent = character.name;
  result.querySelector('.species').textContent = character.species;
  result.querySelector('.status').textContent = character.status;

  // update the character image and add alt text
  const img = result.querySelector('.image');
  img.src = character.image;
  img.alt = character.name;

  // add the new row to the results container
  container.appendChild(result);
};

export default characters => {
  const searchResults = document.getElementById('search-results');

  // remove any existing search results
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

  // loop through the results and create a new listing for each character
  characters.map(createResultRow(searchResults));
};
