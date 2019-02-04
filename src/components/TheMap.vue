<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="2">
          <b-list-group>
            <b-list-group-item
              button
              v-for="(item, index) in ZoomMap"
              :key="index"
              @click="setZoom(item.xy,item.zoom)"
            >{{item.location}}</b-list-group-item>
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
import { MapCanvas, SingletonMap, MapSetting } from "../modules/map.js";

export default {
  data: () => ({
    ZoomMap: [
      { location: "Россия", xy: [90, 66], zoom: 3 },
      { location: "Москва", xy: [37.62, 55.75], zoom: 10 },
      { location: "Питер", xy: [30.31, 59.96], zoom: 10 },
      { location: "Сургут", xy: [73.39, 61.25], zoom: 12 },
      { location: "Екатеринбург", xy: [60.6, 56.85], zoom: 12 },
      { location: "Тюмень", xy: [65.54, 57.15], zoom: 12 },
      { location: "Новосибирск", xy: [82.92, 55], zoom: 12 },
      { location: "Казань", xy: [49.12, 55.78], zoom: 12 }
    ]
  }),
  methods: {
    setZoom(xy, zoom) {
      new MapSetting().setLocation(xy, zoom);
    }
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(function() {
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

      