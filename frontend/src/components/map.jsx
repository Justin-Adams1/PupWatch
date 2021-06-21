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

  const [internalState, setInternalState] = useState(props);
  const previousValueRef = useRef();
  const previousValue=previousValueRef.current;
  if(props !== previousValue && props !== internalState) {
    setInternalState(props);
  }
  useEffect(() => {
    previousValueRef.current = props;
  })

  // value={internalState}
  // onChange={e => setInternalState(e.currentTarget.value)}


  const onMarkerClick = (marker) => {
    setInternalState(marker, showingInfoWindow)
    setShowingInfoWindow(true);
  };

  const onMapClick = () => {
    setShowingInfoWindow(false);
    console.log("state",internalState)
  };

  const loadInfoWindow = (marker, showingInfoWindow) => {
      console.log("passed marker",marker);
      let mapInfo = {lat: marker.position.lat, lng: marker.position.lng}
        return(
          <InfoWindow
            visible={showingInfoWindow}
            position={mapInfo}
            className={"infoWindow"}
          >   
            <div className="infoWindow">
                        <h3>Name: {marker.name}</h3>
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
          onClick={onMapClick}
          > 
          {props.markerPack.map(marker => {
            return(
                <Marker
                  key={marker._id}
                  name={marker.name}
                  position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
                  boardingAtmosphere={marker.boardingAtmosphere}
                  boardingDescription={marker.boardingDescription}
                  onClick={onMarkerClick}
                  
                >
                </Marker>
            )})}
            {showingInfoWindow ?
              loadInfoWindow(internalState, showingInfoWindow)  
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