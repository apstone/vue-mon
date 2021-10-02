<template>
  <div class="home">
    <pokemon-directory />
  </div>
</template>

<script>
// @ is an alias to /src
import PokemonDirectory from "../components/PokemonDirectory.vue";

export default {
  name: "Home",
  components: {
    PokemonDirectory,
  },
};
</script>
