import React from 'react';
import './css/marker.css';

const InfoWindow = (marker) => {

  console.log("info window props", marker)

    return (
      <InfoWindow   
        // key={marker.marker._id}             
        // onClose={marker.onInfoWindowClose}
        // visible={marker.showingInfoWindow}
        // marker={marker.activeMarker}
        // position={ {lat: marker.marker.geoAddress[0], lng: marker.marker.geoAddress[1]} }
      >   
        <div className="infoWindow"> Info Window Test
                    {/* <h3>Name: {marker.marker.name}</h3>
                    <h5>Location: {marker.marker.title}</h5>
                    <h5>Atmosphere: {marker.marker.boardingAtmosphere}</h5>
                    <h5>Boarding: {marker.marker.boardingDescription}</h5> */}
        </div>
      </InfoWindow>      
    );
  };

  export default InfoWindow;