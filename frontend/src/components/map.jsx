import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { React, Component } from 'react';
import config from '../config.json';
import './css/main.css';
 

const MapContainer = (props)=>{
    const style = {
      width: '950px',
      height: '600px',
    
    }
    console.log("geoAddress",props.props[0])

    return (
      <Map google={props.google} 
      zoom={16} 
      containerStyle={style}
      initialCenter={{
        lat: props.props[0],
        lng: props.props[1]
      }}/>
    );
  }
 
export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer)