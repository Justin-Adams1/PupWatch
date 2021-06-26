import { React, useState,  useEffect, useRef, useCallback} from 'react';
import { GoogleMap, useJsApiLoader, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './css/main.css';
import Container from 'react-bootstrap/Container';
import ProfileImage from './infoWindowPic';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import config from '../config.json'

const containerStyle = {
  width: 'fit',
  height: '1000px'
};

function MapContainer(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.API_KEY
  })

  const [map, setMap] = useState({})
  const [setZoom, useSetZoom] = useState(17);

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);    
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const ref = useRef(props);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
      
const goPublicProfile = (event) => {
  console.log("gopub")  
  const pubProfile  = activeMarker._id;
  localStorage.setItem('pubProfile', pubProfile);
  return(
  window.location = '/publicprofile'
  )
};
const onMarkerClick = (marker) => {
  setShowingInfoWindow(true);
  setActiveMarker(marker);
};
const onMapClick = () => {
  setShowingInfoWindow(false);
};


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
                  lat: props.geoAddress[0],
                  lng: props.geoAddress[1]
                }}
        zoom={setZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        key={props.id}
      >
        {props.markerPack.map(marker => {
            return(
              <div ref={ref} id="marker" key={marker._id}>
                <Marker                  
                  name={marker.name}
                  clickable={true}
                  position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
                  boardingAtmosphere={marker.boardingAtmosphere}
                  boardingDescription={marker.boardingDescription}
                  ownerImg={marker.ownerImg}
                  number={marker.number}
                  onClick={() => onMarkerClick(marker)}                          
                >
                </Marker>
                    {console.log(activeMarker)}
                {(showingInfoWindow && activeMarker._id === marker._id)  &&
                    <InfoWindow
                        position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
                        key={marker.id}
                        visible={showingInfoWindow}
                      >   
                        <Container className="infoWindow">
                          <Row>
                            <Col>
                              <ProfileImage url={marker.ownerImg}/>
                            </Col>
                            <Col>
                            <Row>
                              <Col>
                                <p>{marker.name}</p>
                                <p className="infoWindowTextBottom">{marker.boardingDescription}</p>
                                  <button className="messageItem"  
                                          type="textarea"  
                                          onClick={(event)=>goPublicProfile(event)}
                                          placeholder="Hey! I'm interested in arranging a boarding session (etc)">
                                          My Profile
                                  </button>
                              </Col>
                            </Row>
                            </Col>
                          </Row>
                        </Container>
                      </InfoWindow>    
                }
              </div>
        )})}
      </GoogleMap>
  ) : <></>
}

export default MapContainer;