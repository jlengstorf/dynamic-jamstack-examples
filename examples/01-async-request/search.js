export const searchCharacterByName = async name => {
  const result = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}`,
  )
    .then(response => response.json())
    .catch(error => console.error(error));

  return result;
};
