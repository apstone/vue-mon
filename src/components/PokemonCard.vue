<template>
  <div id="pokemon-card" class="flex flex-col">
    <h1 class="capitalize text-left text-5xl font-bold mt-12">{{ name }}</h1>
    <div class="types text-left py-4">
      <div>
        <span
          v-for="type in types"
          :key="type.slot"
          :class="type.type.name"
          class="type px-4 p-1 mr-2 rounded text-center capitalize font-bold inline-block"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
    <div class="flex flex-col md:flex-row my-4">
      <div class="flex-1 md:pr-4">
        <img v-bind:src="img" width="250px" class="m-auto" />
      </div>
      <div class="flex-1 md:pl-4">
        <div class="stat-sheet p-4 rounded drop-shadow text-left">
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
    </div>
    <div v-if="species.flavor_text_entries.length > 0" class="text-left">
      <h4 class="text-2xl font-bold my-4">About</h4>

      <p class="text-left">
        {{ species.flavor_text_entries[0].flavor_text.replace("\u000c", " ") }}
      </p>
    </div>
    <div class="text-left">
      <h4 class="text-2xl font-bold my-4">Abilities</h4>
      <ul class="list-inside list-disc">
        <li
          v-for="(ability, index) in abilities"
          :key="index"
          class="capitalize"
        >
          {{ ability.ability.name.replace("-", " ") }}
        </li>
      </ul>
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
    species: Object,
    abilities: Array,
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
.water {
  background: linear-gradient(180deg, #4592c4 50%, #4592c4 50%);
  background-color: #4592c4;
}
.dark {
  background: linear-gradient(180deg, #707070 50%, #707070 50%);
  background-color: #707070;
}
.dragon {
  background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
  background-color: #53a4cf;
}
.fighting {
  background: linear-gradient(180deg, #d56723 50%, #d56723 50%);
  background-color: #d56723;
}
.ground {
  background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);
  background-color: #f7de3f;
}
.fairy {
  background: linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%);
  background-color: #fdb9e9;
}
.rock {
  background: linear-gradient(180deg, #a38c21 50%, #a38c21 50%);
  background-color: #a38c21;
}
.electric {
  background: linear-gradient(180deg, #eed535 50%, #eed535 50%);
  background-color: #eed535;
}
.normal {
  background: linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%);
  background-color: #a4acaf;
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
