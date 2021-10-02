<template>
  <div id="pokemon-card" class="flex flex-col">
    <img v-bind:src="img" width="250px" />
    <h1 class="capitalize text-left text-5xl font-bold">{{ name }}</h1>
    <div class="types text-left py-4">
      <span
        v-for="type in types"
        :key="type.slot"
        :class="type.type.name"
        class="type px-4 py-2 mr-2"
      >
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    name: String,
    img: String,
    types: Array,
  },
};
</script>
<style scoped>
.type {
  text-align: center;
  border-radius: 5px;
  text-transform: capitalize;
}
.ice {
  background: linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%);
  background-color: #51c4e7;
}
.flying {
  background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
  background-color: #3dc7ef;
}
.psychic {
  background: linear-gradient(180deg, #f366b9 50%, #f366b9 50%);
  background-color: #f366b9;
}
.fire {
  background: linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%);
  background-color: #fd7d24;
}
.poison {
  background: linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%);
  background-color: #b97fc9;
}
.grass {
  background-color: #9bcc50;
  background: linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%);
}
</style>
