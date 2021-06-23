import {Map, InfoWindow, Marker, Maps, GoogleApiWrapper} from 'google-maps-react';
import { React, useState,  useEffect, useRef, useCallback} from 'react';
import ProfileImage from './infoWindowPic';
import MessageForm from './messageForm';
import config from '../config.json';
import './css/main.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
 

const MapContainer = (props)=>{
  const style = {
      width: '1050px',
      height: '600px',    
  }
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  // const [uploadedPupImage, setUploadedPupImage] = useState("");
  const [refresh, setRefresh] = useState("");

  const [internalState, setInternalState] = useState(props);
  const previousValueRef = useRef();
  const previousValue=previousValueRef.current;
  if(props !== previousValue && props !== internalState) {
    setInternalState(props);
  }
  useEffect(() => {
    previousValueRef.current = props;
    setRefresh(false);
  }, [refresh, props, showingInfoWindow]);

const onMapClick = useCallback(() => {
  setShowingInfoWindow(false);
  setInternalState(null);
}, [props]);

  const onMarkerClick = (marker) => {
    setInternalState(marker, showingInfoWindow)
    setShowingInfoWindow(true);
  };

      
const goPublicProfile = (event) => {
  console.log("gopub")
  window.location = '/publicprofile';
};

  const loadInfoWindow = (marker, showingInfoWindow) => {
      console.log("passed marker",marker);
      let mapInfo = {lat: marker.position.lat, lng: marker.position.lng}
      if(showingInfoWindow){
        return(
          <InfoWindow
            visible={showingInfoWindow}
            name="infowWindow"
            position={mapInfo}
            onMouseOut={onMapClick}
          >   
              <Container className="infoWindow">
                <Row>
                  <Col>
                    <ProfileImage  url={marker.ownerImg}/>
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
                    <Col>
                    </Col>
                  </Row>
                  </Col>
                </Row>
              </Container>
          </InfoWindow>
        )
      }
      else{
        return(
        <>
        </>

        )
      }        
  }

    return (
      <>
          <Map google={props.google} 
          zoom={18} 
          containerStyle={style}
          shouldFocus={true}
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
                  ownerImg={marker.ownerImg}
                  number={marker.number}
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