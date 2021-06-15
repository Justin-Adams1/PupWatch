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
      <Map google={this.props.google} zoom={14} containerStyle={style}>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer)