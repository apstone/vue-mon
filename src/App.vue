<template>
  <div id="app">
    <img
      v-bind:class="{ loading: loading }"
      class="pokeball"
      alt="Pokeball"
      src="./assets/pokeball.png"
      width="250"
    />
    <div v-if="!loading" class="pokemon-container">
      <div v-for="monster in pokemon" :key="monster.id" class="pokemon">
        <img alt="Pokemon Image" v-bind:src="monster.sprites.front_default" />
        <h2>{{ monster.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import pokemonNames from "./pokemon";
const Pokedex = require("pokeapi-js-wrapper");
const customOptions = {
  cache: true,
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);

export default {
  name: "App",
  data: function() {
    return {
      pokemon: [],
      loading: true,
    };
  },
  components: {},
  methods: {
    fetchPokemon: async function() {
      const pokemonPromises = pokemonNames.map((name) => {
        return P.getPokemonByName(name);
      });

      const pokemon = await Promise.all(pokemonPromises);

      return pokemon;
    },
  },
  mounted: function() {
    this.fetchPokemon().then((data) => {
      this.pokemon = data;
      this.loading = false;
    });
  },
};
</script>

<style>
html {
  background-color: #303554;
  color: #f8f8f6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.pokemon-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.pokemon {
  padding: 20px;
  width: 150px;
}
.pokemon h2 {
  text-transform: capitalize;
}
.pokeball.loading {
  animation: spin 2s infinite;
}

@media screen and (max-width: 400px) {
  .pokemon {
    padding: 15px;
    width: 125px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
