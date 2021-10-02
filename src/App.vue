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
      const response = await P.resource("/api/v2/pokedex/2/");
      const pokemonEntries = response.pokemon_entries;
      const pokemonPromises = pokemonEntries.map((entry) => {
        const name = entry.pokemon_species.name;
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
