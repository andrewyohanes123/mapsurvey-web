import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import Menu from './Menu';
import '../index.css';

mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmV3eW9oYW5lcyIsImEiOiJjamxqMGtjb3UwNnd2M3BvNThqZWhvM3lpIn0.pd3hVH7lja3mmaD2rSAgvw";
export default class Dashboard extends Component {
  // mapbox.
  state = {
    map: {},
    marker : {},
    coords: [124.839157, 1.490715]
  }
  componentDidMount = () => {
    this.setState({
      map: new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: this.state.coords,
        zoom: 13
      })
    }, this.setPosition)
  }

  setPosition = () => {
    const {map} = this.state;
    this.state.map.addControl(new mapboxgl.NavigationControl({ position: 'top-left', }))
    navigator.geolocation.getCurrentPosition(pos => {
      // this.state.map.
      this.state.map.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 15,
        speed: 0.5,
        curve: 1,
        easing(t) {
          return t;
        }
      });
    });
    map.on('load', function() {
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
  
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
          }
      }
  
      map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
              'fill-extrusion-color': '#aaa',
  
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                  "interpolate", ["linear"], ["zoom"],
                  15, 0,
                  15.05, ["get", "height"]
              ],
              'fill-extrusion-base': [
                  "interpolate", ["linear"], ["zoom"],
                  15, 0,
                  15.05, ["get", "min_height"]
              ],
              'fill-extrusion-opacity': .6
          }
      }, labelLayerId);
  });
  }

  render() {
    return (
      <div>
        <div id="map"></div>
        <Menu />
      </div>
    )
  }
}
