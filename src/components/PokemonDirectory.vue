<template>
  <div id="pokemon-directory">
    <img
      v-bind:class="{ loading: loading }"
      class="pokeball"
      alt="Pokeball"
      src="../assets/pokeball.png"
      width="250"
    />
    <div v-if="!loading" class="pokemon-container">
      <div v-for="monster in pokemon" :key="monster.id" class="pokemon">
        <router-link
          :to="{ path: `pokemon/${monster.id}` }"
          style="text-decoration: none; color: #f8f8f6;"
        >
          <img alt="Pokemon Image" :src="`./static/pokemon/${monster.img}`" />
          <h2>{{ monster.name }}</h2>
          <span>{{ monster.id }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import pokemonNames from "../pokemon";
// const Pokedex = require("pokeapi-js-wrapper");
// const customOptions = {
//   cache: true,
//   cacheImages: true,
// };
// const P = new Pokedex.Pokedex(customOptions);

const determineIndex = (index) => {
  if (index < 10) {
    return `00${index}`;
  } else if (index > 9 && index < 100) {
    return `0${index}`;
  } else {
    return index;
  }
};

export default {
  name: "PokemonDirectory",
  data: function() {
    return {
      pokemon: [],
      loading: true,
    };
  },
  components: {},
  methods: {
    fetchPokemon: async function() {
      const pokemon = pokemonNames.map((name, index) => {
        return {
          id: index + 1,
          name: name,
          img: `${determineIndex(index + 1)}.png`,
        };
      });

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
