<template>
  <div class="pokemon">
    <router-link to="/" class="back-link"
      ><span>Back to Directory</span></router-link
    >
    <div v-if="pokemon">
      <img v-bind:src="pokemon.sprites.front_default" width="250px" />
      <h1>{{ pokemon.name }}</h1>
      <span>{{
        pokemon.types.map((type) => type.type.name.toUpperCase()).join(", ")
      }}</span>
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
  name: "Pokemon",
  components: {},
  data: function() {
    return {
      pokemon: undefined,
      loading: true,
    };
  },
  methods: {
    fetchPokemon: async function(id) {
      const pokemon = await P.getPokemonByName(id);
      console.log(pokemon);
      return pokemon;
    },
  },
  mounted: function() {
    this.fetchPokemon(this.$route.params.id).then((data) => {
      this.pokemon = data;
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
