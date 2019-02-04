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

    var map = new Map({
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
    //map.render();
    //map.renderSync();
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
