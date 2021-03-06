import { React } from 'react';
import './css/marker.css';

const Marker = (props) => {

  console.log("info window props", props.marker);

    return (
      <Marker
        position={{lat: 38.0202145, lng: -85.6470396}}
        visible={true}
      >   
        <div className="infoWindow">
                    <h3>Name: </h3>
                    <h5>Location: </h5>
                    <h5>Atmosphere: </h5>
                    <h5>Boarding: </h5>
        </div>
      </Marker>
    );
  };

  export default Marker;