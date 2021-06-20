import {Map, InfoWindow, Marker, Maps, GoogleApiWrapper} from 'google-maps-react';
import { React, Component, useState, setState, useEffect, useRef} from 'react';
import config from '../config.json';
import './css/main.css';
import InfoWindowBlob from '../components/marker';
 

const MapContainer = (props)=>{
  const style = {
      width: '950px',
      height: '600px',    
  }

  const [selectedFile, setSelectedFile] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  let activeMarker = useRef({});

  const onMarkerClick = (marker) => {
    activeMarker=marker;
    setShowingInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
  };
  
  const onMapClick = () => {
    activeMarker=null;
    setShowingInfoWindow(false)
  };

  useEffect ((marker) => {
  },[activeMarker]);

  // const loadInfoWindow = (marker) => {
  //       return(
  //         <InfoWindow   
  //           key={marker._id}             
  //           onClose={onInfoWindowClose}
  //           visible={showingInfoWindow}
  //           marker={activeMarker}
  //           position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
  //         >   
  //           <div className="infoWindow">
  //                       <h3>Name: {marker.name}</h3>
  //                       <h5>Location: {marker.title}</h5>
  //                       <h5>Atmosphere: {marker.boardingAtmosphere}</h5>
  //                       <h5>Boarding: {marker.boardingDescription}</h5>
  //           </div>
  //         </InfoWindow>
  //       )
  //     }

    return (
      <>
          <Map google={props.google} 
          zoom={18} 
          containerStyle={style}
          initialCenter={{
            lat: props.geoAddress[0],
            lng: props.geoAddress[1]
            }}
          onClick={onMapClick}
          > 
          {props.markerPack.map(marker => {
            return(
                <Marker
                  key={marker._id}
                  name={marker.name}
                  position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
                  title={marker.boardingAtmosphere}
                  address={marker.address}  
                  onClick={onMarkerClick} 
                  onClose={onInfoWindowClose}
                >
                </Marker>
            )})}  
              <InfoWindowBlob props={activeMarker}/>
          </Map>
      </>   
    );
  }
 
export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer)