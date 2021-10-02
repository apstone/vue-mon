const fs = require("fs");
const axios = require("axios");
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

const pokemonNames = require("./pokemonNames").pokemonNames;

const determineId = (id) => {
  if (id < 10) {
    return `00${id}`;
  } else if (id > 9 && id < 100) {
    return `0${id}`;
  } else {
    return id;
  }
};

/* ============================================================
  Function: Download Image
============================================================ */

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );

/* ============================================================
  Download Images in Order
============================================================ */

(async () => {
  const pokemonPromises = pokemonNames.map((name) => {
    return P.getPokemonByName(name);
  });

  const pokemon = await Promise.all(pokemonPromises);
  console.log(pokemon);
  for await (const monster of pokemon) {
    await download_image(
      monster.sprites.front_default,
      `${determineId(monster.id)}.png`
    );
  }
})();
