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
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { Cluster, OSM, Vector as VectorSource } from "ol/source.js";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style.js";

export class MapCanvas {
  constructor() {}

  initMap() {
    var mousePositionControl = new MousePosition({
      projection: "EPSG:4326"
    });

    const russia = [90, 66];
    const russiaWebMercator = fromLonLat(russia);

    var count = 5000;
    var features = new Array(count);
    var k = 37.5,
      j = 55.7;
    for (var i = 0; i < count; ++i) {
      var coordinates = [
        k + (Math.random() / 10) * 2,
        j + (Math.random() / 10) * 2
      ];
      features[i] = new Feature(new Point(fromLonLat(coordinates)));
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

    var map = new Map({
      target: "map",
      controls: defaultControls().extend([mousePositionControl]),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        clusters
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
  constructor() {}

  setLocation(xy, zoom) {
    let map = new SingletonMap().data;
    let locationWebMercator = fromLonLat(xy);
    map.getView().setZoom(zoom);
    map.getView().setCenter(locationWebMercator);
    map.render();
    map.updateSize();
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
