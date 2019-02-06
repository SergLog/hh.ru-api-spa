import "ol/ol.css";
//import { Map, View } from "ol";
import { defaults as defaultControls } from "ol/control.js";
//import TileLayer from "ol/layer/Tile";
//import OSM from "ol/source/OSM";
import MousePosition from "ol/control/MousePosition.js";
import { fromLonLat } from "ol/proj";

import Feature from "ol/Feature.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Point from "ol/geom/Point.js";
import {
  Heatmap as HeatmapLayer,
  Tile as TileLayer,
  Vector as VectorLayer
} from "ol/layer.js";
import { Cluster, OSM, Vector as VectorSource } from "ol/source.js";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style.js";

("use strict");

export class MapCanvas {
  constructor() {}

  initMap() {
    var mousePositionControl = new MousePosition({
      projection: "EPSG:4326"
    });

    const russia = [90, 66];
    const russiaWebMercator = fromLonLat(russia);

    var count = 5000;
    var features = [];
    var k = 37.5,
      j = 55.7;

    var l = 73.39,
      t = 61.25;
    for (var i = 0; i < count; ++i) {
      var coordinates = [
        k + (Math.random() / 10) * 2,
        j + (Math.random() / 10) * 2
      ];

      var coordinates1 = [
        l + (Math.random() / 10) * 2,
        t + (Math.random() / 10) * 2
      ];
      features.push(new Feature(new Point(fromLonLat(coordinates))));
      features.push(new Feature(new Point(fromLonLat(coordinates1))));
    }

    var source = new VectorSource({
      features: features
    });

    var clusterSource = new Cluster({
      distance: 100,
      source: source
    });

    var styleCache = {};
    var clusters = new VectorLayer({
      source: clusterSource,
      style: function(feature) {
        var size = feature.get("features").length;
        var style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 15,
              stroke: new Stroke({
                color: "#fff"
              }),
              fill: new Fill({
                color: "#e55055"
              })
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: "#fff"
              })
            })
          });
          styleCache[size] = style;
        }
        return style;
      }
    });

    var rasterLayer = new TileLayer({
      source: new OSM()
    });
    rasterLayer.typeLayer = "raster";

    var map = new Map({
      target: "map",
      controls: defaultControls().extend([mousePositionControl]),
      layers: [
        rasterLayer,
        clusters
        //vectorPoint,
        //vectorHeat
      ],
      view: new View({
        center: russiaWebMercator,
        zoom: 3
      })
    });
    new SingletonMap(map);
  }
}

export class MapSetting {
  constructor() {
    this.map = new SingletonMap().data;
  }

  setLocation(xy, zoom) {
    let locationWebMercator = fromLonLat(xy);
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(locationWebMercator);
    this.map.render();
    this.map.updateSize();
  }

  heatMap() {
    var count = 5000;
    var features = [];
    var k = 37.5,
      j = 55.7;

    var l = 73.39,
      t = 61.25;
    for (var i = 0; i < count; ++i) {
      var coordinates = [
        k + (Math.random() / 10) * 2,
        j + (Math.random() / 10) * 2
      ];

      var coordinates1 = [
        l + (Math.random() / 10) * 2,
        t + (Math.random() / 10) * 2
      ];
      features.push(new Feature(new Point(fromLonLat(coordinates))));
      features.push(new Feature(new Point(fromLonLat(coordinates1))));
    }

    var source = new VectorSource({
      features: features
    });

    var vectorHeat = new HeatmapLayer({
      source: source,
      blur: 40,
      radius: 8
    });

    var vectorPoint = new VectorLayer({
      source: source,
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "black"
          })
        })
      })
    });

    this.map.getLayers().forEach(layer => {
      if (layer.typeLayer != "raster") {
        this.map.removeLayer(layer);
      }
    });

    this.map.addLayer(vectorPoint);
    this.map.addLayer(vectorHeat);
  }
}

let _singleton = null;

export class SingletonMap {
  constructor(data) {
    if (!_singleton) {
      this.data = data;
      _singleton = this;
    } else return _singleton;
  }
}
