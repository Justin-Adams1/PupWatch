import {Map, InfoWindow, Marker, Maps, GoogleApiWrapper} from 'google-maps-react';
import { React, useState,  useEffect, useRef, useCallback} from 'react';
import ProfileImage from './infoWindowPic';
import MessageForm from './messageForm';
import config from '../config.json';
import './css/main.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Form from 'react-bootstrap/Form';
// import './css/main.css';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import FormData from 'form-data';
 

const MapContainer = (props)=>{
  const style = {
      width: '950px',
      height: '600px',    
  }
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  // const [uploadedPupImage, setUploadedPupImage] = useState("");

  const [internalState, setInternalState] = useState(props);
  const previousValueRef = useRef();
  const previousValue=previousValueRef.current;
  if(props !== previousValue && props !== internalState) {
    setInternalState(props);
  }
  useEffect(() => {
    previousValueRef.current = props;
  });

  // value={internalState}
  // onChange={e => setInternalState(e.currentTarget.value)}

//   useEffect(() => {
//     const listener = e => {
//        if (e.key === "Escape") {
//           setShowingInfoWindow(false);
//        }
//     };
//     window.addEventListener("keydown", listener);
//     return () => {
//        window.removeEventListener("keydown", listener);
//     };
//  }, []);


const onMapClick = useCallback(() => {
  setShowingInfoWindow(false);
}, []);

const onClick = useCallback(() => {
  setShowingInfoWindow(false);
}, []);

useEffect(() => {
  onMapClick();
  setShowingInfoWindow(false);
  setUploadedImage(internalState);
}, [onMapClick]);

  const onMarkerClick = (marker) => {
    setInternalState(marker, showingInfoWindow)
    setShowingInfoWindow(true);
  };

  const loadInfoWindow = (marker, showingInfoWindow) => {
      console.log("passed marker",marker);
      let mapInfo = {lat: marker.position.lat, lng: marker.position.lng}
      if(showingInfoWindow){
        return(
          <InfoWindow
            visible={showingInfoWindow}
            position={mapInfo}
          >   
              <Container className="infoWindow">
                <Row>
                  <Col>
                    <ProfileImage  url={marker.ownerImg}/>
                  </Col>
                  <Col>
                  <Row>
                    <Col className="infoWindowCol">
                      <p>{marker.name}</p>
                      <p>{marker.boardingAtmosphere}</p>
                      <p>{marker.boardingDescription}</p>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <MessageForm />
                  </Col>
                </Row>
              </Container>
          </InfoWindow>
        )
      }
      else{
        <>
        </>
      }        
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
          onMapClick={onMapClick}
          > 
          {props.markerPack.map(marker => {
            return(
                <Marker
                  key={marker._id}
                  name={marker.name}
                  position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
                  boardingAtmosphere={marker.boardingAtmosphere}
                  boardingDescription={marker.boardingDescription}
                  ownerImg={marker.ownerImg}
                  onClick={onMarkerClick} 
                  onMapClick={onMapClick}                                  
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