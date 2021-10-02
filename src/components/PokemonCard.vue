<template>
  <div id="pokemon-card" class="flex flex-col">
    <h1 class="capitalize text-left text-5xl font-bold mt-12">{{ name }}</h1>
    <div class="flex flex-row my-4">
      <div class="flex-1">
        <img v-bind:src="img" width="250px" />
      </div>
      <div class="stat-sheet p-4 rounded flex-1 drop-shadow text-left">
        <h4 class="text-2xl font-bold mb-3">Stats</h4>
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-container flex flex-row justify-between"
        >
          <span class="stat-title text-lg"
            >{{ formatStatTitle(stat.stat.name) }}:
          </span>
          <span class="stat-value">{{ stat.base_stat }}</span>
        </div>
      </div>
    </div>
    <div class="types text-left py-4">
      <span
        v-for="type in types"
        :key="type.slot"
        :class="type.type.name"
        class="type px-4 py-2 mr-2 rounded text-center capitalize font-bold"
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
    stats: Array,
  },
  methods: {
    formatStatTitle: function formatStatTitle(title) {
      switch (title) {
        case "hp":
          return "HP";
        case "attack":
          return "Attack";
        case "defense":
          return "Defense";
        case "special-attack":
          return "Special Attack";
        case "special-defense":
          return "Special Defense";
        case "speed":
          return "Speed";
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.stat-sheet {
  background-color: #f8f8f6;
  color: #303554;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.5);
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
