import "ol/ol.css";
import { Map, View } from "ol";
import { defaults as defaultControls } from "ol/control.js";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import MousePosition from "ol/control/MousePosition.js";
import { fromLonLat } from "ol/proj";

export class MapCanvas {
  constructor() {}

  initMap() {
    var mousePositionControl = new MousePosition({
      projection: "EPSG:4326"
    });

    const russia = [90, 66];
    const russiaWebMercator = fromLonLat(russia);

    const map = new Map({
      target: "map",
      controls: defaultControls().extend([mousePositionControl]),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: russiaWebMercator,
        zoom: 3
      })
    });
  }

  getMap() {}
}
