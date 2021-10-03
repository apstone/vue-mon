<template>
  <div class="pokemon w-80 lg:w-4/12 m-auto">
    <router-link to="/" class="back-link"
      ><span class="text-left">Back to Directory</span></router-link
    >
    <div v-if="pokemon">
      <pokemon-card
        :name="pokemon.name"
        :img="pokemon.sprites.front_default"
        :types="pokemon.types"
        :stats="pokemon.stats"
        :species="species"
        :abilities="
          pokemon.abilities.filter((ability) => ability.is_hidden === false)
        "
      />
    </div>
  </div>
</template>

<script>
import PokemonCard from "../components/PokemonCard.vue";
const Pokedex = require("pokeapi-js-wrapper");
const customOptions = {
  cache: true,
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);

export default {
  name: "Pokemon",
  components: { PokemonCard },
  data: function() {
    return {
      pokemon: undefined,
      species: undefined,
      loading: true,
    };
  },
  methods: {
    fetchPokemon: async function(id) {
      const pokemon = await P.getPokemonByName(id);
      const species = await P.getPokemonSpeciesByName(id);
      console.log(pokemon);
      console.log(species);
      return {
        pokemon,
        species,
      };
    },
  },
  mounted: function() {
    this.fetchPokemon(this.$route.params.id).then((data) => {
      this.pokemon = data.pokemon;
      this.species = data.species;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
h1 {
  text-transform: capitalize;
}
.back-link {
  text-decoration: none;
  color: #f8f8f6;
}
</style>
