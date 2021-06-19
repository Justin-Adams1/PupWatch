import {Map, InfoWindow, Marker, Maps, GoogleApiWrapper} from 'google-maps-react';
import { React, Component, useState, setState, useEffect } from 'react';
import config from '../config.json';
import './css/main.css';
 

const MapContainer = (props)=>{
  const style = {
      width: '950px',
      height: '600px',    
  }

  const [selectedFile, setSelectedFile] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});

  const onMarkerClick = (marker) => {
    setShowingInfoWindow(true);
    setActiveMarker(marker);
    console.log(marker)
  };

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
  };

  const loadMarkers = (props) => {
    return(
      props.markerPack.map(marker => {
        return(
          <Marker
            key={marker._id}
            name={marker.name}
            position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
            title={marker.boardingAtmosphere}
            address={marker.address}  
            onClick={onMarkerClick} 
          >
          <InfoWindow                
            onClose={onInfoWindowClose}
            visible={showingInfoWindow}
            position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
          >
            <div>
              <h3>{marker.name}</h3>
              <p>{marker.title}</p>
              <h5>{marker.boardingAtmosphere}</h5>
              <p>{marker.boardingDescription}</p>
              <p></p>
            </div>
          </InfoWindow>
          </Marker>
        )
      }
      )
    )
  }

    return (
      <>
          <Map google={props.google} 
          zoom={18} 
          containerStyle={style}
          initialCenter={{
            lat: props.geoAddress[0],
            lng: props.geoAddress[1]
            }}
          > 
          {loadMarkers(props)}
          </Map>
      </>   
    );
  }
 
export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer)