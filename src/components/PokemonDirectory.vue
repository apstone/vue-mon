<template>
  <div id="pokemon-directory" class="flex flex-col items-center">
    <img
      v-bind:class="{ loading: loading }"
      class="pokeball"
      alt="Pokeball"
      src="../assets/pokeball.png"
      width="250"
    />
    <div v-if="!loading" class="flex flex-wrap flex-row justify-center">
      <div v-for="monster in pokemon" :key="monster.id" class="pokemon">
        <router-link
          :to="{ path: `pokemon/${monster.id}` }"
          style="text-decoration: none; color: #f8f8f6;"
        >
          <img alt="Pokemon Image" :src="`./static/pokemon/${monster.img}`" />
          <h2 class="capitalize">{{ monster.name }}</h2>
          <span>{{ monster.id }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import pokemonNames from "../pokemon";

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
.pokemon {
  padding: 20px;
  width: 150px;
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
