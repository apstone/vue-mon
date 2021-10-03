<template>
  <div id="pokemon-directory" class="flex flex-col items-center">
    <img
      v-bind:class="{ loading: loading }"
      class="pokeball mb-8"
      alt="Pokeball"
      src="../assets/pokeball.png"
      width="250"
    />
    <h1 class="text-6xl font-bold pb-4 px-4">Vue-mon</h1>
    <p class="px-4">
      Pokedex built using
      <a href="https://vuejs.org/" target="_blank" class="underline">Vue</a>,
      <a href="https://tailwindcss.com/" target="_blank" class="underline"
        >TailwindCSS</a
      >, and
      <a href="https://pokeapi.co/docs/v2" target="_blank" class="underline"
        >PokeAPI</a
      >
      by
      <a href="https://aaronstone.dev" target="_blank" class="underline"
        >Aaron Stone</a
      >
    </p>
    <div v-if="!loading" class="flex flex-col md:flex-row py-8">
      <input
        v-model="search"
        placeholder="Search"
        class="search px-4 py-2 w-80 md:w-96 rounded"
      />
      <span
        v-if="search.length > 0"
        v-on:click="clearSearch()"
        class="px-4 py-2 cursor-pointer underline block"
        >Clear</span
      >
    </div>
    <div v-if="!loading" class="flex flex-wrap flex-row justify-center">
      <span v-if="pokemon.length === 0">No results found for {{ search }}</span>
      <div v-for="monster in pokemon" :key="monster.id" class="pokemon">
        <router-link
          :to="{ path: `pokemon/${monster.id}` }"
          style="text-decoration: none; color: #f8f8f6;"
        >
          <img
            alt="Pokemon Image"
            :src="`./static/pokemon/${monster.img}`"
            class="m-auto"
          />
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
      search: "",
    };
  },
  components: {},
  watch: {
    search: async function(val, prevVal) {
      if (val.length > 0) {
        if (prevVal.length < val.length) {
          this.pokemon = this.pokemon.filter((monster) => {
            return monster.name.startsWith(val.toLowerCase());
          });
        } else {
          this.fetchPokemon().then((data) => {
            this.pokemon = data.filter((monster) => {
              return monster.name.startsWith(val.toLowerCase());
            });
          });
        }
      } else {
        this.pokemon = await this.fetchPokemon();
      }
    },
  },
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
    clearSearch: function() {
      this.search = "";
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
.pokeball:hover,
.pokeball:active,
.pokeball:focus {
  animation: wiggle 1s 2;
}
.pokeball.loading {
  animation: spin 2s infinite;
}
.search {
  color: #303554;
}

@media screen and (max-width: 400px) {
  .pokemon {
    padding: 15px;
    width: 125px;
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(0deg);
  }
  85% {
    transform: rotate(5deg);
  }
  95% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
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
