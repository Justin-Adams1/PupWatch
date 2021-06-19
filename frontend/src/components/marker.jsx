import React from 'react';
import './css/marker.css';

const Marker = (props) => {

  console.log("marker props", props.props)

    return (

      <div className="marker"
        position={{ lat: props.props.geoAddress[0], lng: props.props.geoAddress[1] }}
        key={props.props.id}
        name={props.props.name}
        address={props.props.address}
        title={props.props.boardingAtmosphere}
      />
      
    );
  };

  export default Marker;