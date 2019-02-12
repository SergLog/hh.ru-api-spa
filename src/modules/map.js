import "ol/ol.css";
import { defaults as defaultControls } from "ol/control.js";
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

    var rasterLayer = new TileLayer({
      source: new OSM()
    });
    rasterLayer.typeLayer = "raster";

    var map = new Map({
      target: "map",
      controls: defaultControls().extend([mousePositionControl]),
      layers: [rasterLayer],
      view: new View({
        center: russiaWebMercator,
        zoom: 3
      })
    });
    new SingletonMap(map);
  }
}

let sourceObjects = [];

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

  setSource(arrayCoordinates) {
    this.map.getLayers().forEach(layer => {
      if (!(layer instanceof TileLayer)) {
        this.map.removeLayer(layer);
      }
    });

    var features = [];
    arrayCoordinates.forEach(p => {
      features.push(new Feature(new Point(fromLonLat([p.lng, p.lat]))));
    });

    var source = new VectorSource({
      features: features
    });

    sourceObjects = source;

    var clusterSource = new Cluster({
      distance: 10,
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

    this.map.addLayer(clusters);
  }

  heatMap() {
    var source = sourceObjects;

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
      if (!(layer instanceof TileLayer)) {
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
