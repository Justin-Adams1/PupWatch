import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { React, Component } from 'react';
import config from '../config.json';
import './css/main.css';
 
export class MapContainer extends Component {
  render() {
    const style = {
      width: '950px',
      height: '600px',
    }
    return (
      <Map google={this.props.google} 
      zoom={16} 
      containerStyle={style}
      initialCenter={{
        lat: 38.0202145,
        lng: -85.6470396
      }}/>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer)