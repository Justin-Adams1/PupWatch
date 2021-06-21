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
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  let activeMarker = useRef();
  const [refresh, setRefresh] = useState(false);

  const onMarkerClick = (marker) => {
    activeMarker.current=marker;
    setShowingInfoWindow(true);
    setRefresh(true);
  };

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false);
    setRefresh(true);
  };
  
  const onMapClick = () => {
    activeMarker.current=null;
    setShowingInfoWindow(false);
    setRefresh(true);
    console.log(activeMarker.current)
  };

  useEffect(() => {
    setRefresh(false)
    console.log(activeMarker.current)
},[refresh]);


  const loadInfoWindow = (marker, showingInfoWindow) => {
      console.log("passed marker",marker.marker);
      let mapInfo = {lat: marker.mapCenter.lat, lng: marker.mapCenter.lng}
        return(
          <InfoWindow
            visible={showingInfoWindow}
            position={mapInfo}
            className={"infoWindow"}
          >   
            <div className="infoWindow">
                        <h3>Name: {marker.name}</h3>
                        <h5>Location: {marker.address}</h5>
                        <h5>Atmosphere: {marker.boardingAtmosphere}</h5>
                        <h5>Boarding: {marker.boardingDescription}</h5>
            </div>
          </InfoWindow>
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
          onClick={() => {setShowingInfoWindow(false)}}
          > 
          {props.markerPack.map(marker => {
            return(
                <Marker
                  key={marker._id}
                  name={marker.name}
                  position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
                  boardingAtmosphere={marker.boardingAtmosphere}
                  boardingDescription={marker.boardingDescription}
                  address={marker.address}  
                  onClick={onMarkerClick}
                  
                >
                </Marker>
            )})}
            {showingInfoWindow ?
              loadInfoWindow(activeMarker.current, showingInfoWindow)  
              :
              <>
              </>          
            }


          </Map>
      </>   
    );
  }
 
export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer)