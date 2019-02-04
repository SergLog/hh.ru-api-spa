<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-list-group>
            <b-list-group-item
              @click="settingMap"
              button
              v-for="(item, index) in ZoomMap"
              :key="index"
            >{{item}}</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="10">
          <div id="map" class="map"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { MapCanvas } from "../modules/map.js";

export default {
  data: () => ({
    ZoomMap: ["Россия", "Москва", "Питер", "Сургут"]
  }),
  methods: {
    settingMap() {}
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        new MapCanvas().initMap();
      }, 1000);
    });
  },
  created() {}
};
</script>

<style>
.map {
  width: 100%;
  height: 600px;
}
</style>

      