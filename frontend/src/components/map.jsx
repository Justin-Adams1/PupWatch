// import {Map, InfoWindow, Marker, Maps, GoogleApiWrapper} from 'google-maps-react';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { React, useState,  useEffect, useRef, useCallback} from 'react';
// import ProfileImage from './infoWindowPic';
// import MessageForm from './messageForm';
// // import Marker from './marker';
// // import InfoWindow from './infoWindow';
// import config from '../config.json';
// import './css/main.css';
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Marker from './marker';
 

// const MapContainer = (props)=>{
//   const style = {
//       width: '1050px',
//       height: '600px',    
//   }
//   const [showingInfoWindow, setShowingInfoWindow] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState("");
//   // const [uploadedPupImage, setUploadedPupImage] = useState("");
//   const [refresh, setRefresh] = useState("");

//   const [open, setOpen] = useState(false);

//   const [internalState, setInternalState] = useState(props);
//   const previousValueRef = useRef();
//   const previousValue=previousValueRef.current;
//   if(props !== previousValue && props !== internalState) {
//     setInternalState(props);
//   }
//   useEffect(() => {
//     previousValueRef.current = props;
//     setRefresh(false);
//   }, [refresh, props, showingInfoWindow]);
      
// const goPublicProfile = (event) => {
//   console.log("gopub")
//   return(
//   window.location = '/publicprofile'
//   )
// };

//   const onMarkerClick = (marker) => {
//     setInternalState(marker, showingInfoWindow)
//     setShowingInfoWindow(true);
//   };
  
//   const onMapClick = (event) => {
//     setShowingInfoWindow(false);
//   };

// const ref = useRef(props);

// useEffect(() => {
//   const onMapClick = (event) => {
//     if (ref.current && ref.current.contains(event.target)) {
//       return;
//     }
//     setShowingInfoWindow(false);
//   };
//   document.body.addEventListener("click", onMapClick, { capture: true });

//   return () => {
//     document.body.removeEventListener("click", onMapClick);
//   };
// }, [setShowingInfoWindow]);

// useEffect((marker) => {
//   const onMarkerClick = (event) => {
//     if (ref.current && ref.current.contains(event.target)) {
//       setInternalState(marker, showingInfoWindow)
//       setShowingInfoWindow(true);
//       return;
//     }
//   };
//   document.body.addEventListener("click", onMarkerClick, { capture: true });

//   return () => {
//     document.body.removeEventListener("click", onMarkerClick);
//   };
// }, [showingInfoWindow]);

// const onClickOutside = e => {
//   const { onClose } = this.props;
//   const element = e.target;

//   if (this.modalRef.current
//     && !this.modalRef.current.contains(element)) {
//     e.preventDefault();
//     e.stopPropagation();
//     onClose();
//   }
// };

  //     const loadInfoWindow = (marker, showingInfoWindow) => {
  //       console.log("passed marker",marker);
  //       // document.body.addEventListener("click", onClickOutside);
  //       if(showingInfoWindow){
  //         return(
  //           <div ref={ref} id="infowindow">
  //           <InfoWindow
  //             visible={showingInfoWindow}
  //             position={{lat: marker.position.lat, lng: marker.position.lng}}
  //           >   
  //             <Container className="infoWindow">
  //               <Row>
  //                 <Col>
  //                   <ProfileImage  url={marker.ownerImg}/>
  //                 </Col>
  //                 <Col>
  //                 <Row>
  //                   <Col>
  //                     <p>{marker.name}</p>
  //                     <p className="infoWindowTextBottom">{marker.boardingDescription}</p>
  //                       <button className="messageItem"  
  //                               type="textarea"  
  //                               onClick={(event)=>goPublicProfile(event)}
  //                               placeholder="Hey! I'm interested in arranging a boarding session (etc)">
  //                               My Profile
  //                       </button>
  //                   </Col>
  //                   <Col>
  //                   </Col>
  //                 </Row>
  //                 </Col>
  //               </Row>
  //             </Container>
  //         </InfoWindow>
  //         </div>
  //       )
  //     }
  //     else{
  //       return(
  //       <>
  //       </>

  //       )
  //     }        
  // }
  

    // return (
      // <div ref={ref} id="map">
      //     <Map google={props.google} 
      //     zoom={18} 
      //     containerStyle={style}
      //     shouldFocus={true}
      //     initialCenter={{
      //       lat: props.geoAddress[0],
      //       lng: props.geoAddress[1]
      //       }}
      //     onClick={onMapClick}
      //     > 
      //     {props.markerPack.map(marker => {
      //       return(
      //         <div ref={ref} id="marker">
      //           <Marker
      //             key={marker._id}
      //             name={marker.name}
      //             position={ {lat: marker.geoAddress[0], lng: marker.geoAddress[1]} }
      //             boardingAtmosphere={marker.boardingAtmosphere}
      //             boardingDescription={marker.boardingDescription}
      //             ownerImg={marker.ownerImg}
      //             number={marker.number}
      //             onClick={onMarkerClick}                          
      //           >
      //           </Marker>
      //         </div>
      //       )})}
      //       {showingInfoWindow ?
      //         // loadInfoWindow(internalState, showingInfoWindow)  
      //         <>
      //         </>
      //         :
      //         <>
      //         </>          
      //       }


      //     </Map>
      // </div>   

      // <div id="map">
       /* { {function myMap(props) {
          var mapProp= {
            center:new google.maps.LatLng(props.geoAddress[0],props.geoAddress[1]),
            zoom:5,
          };
          var map = new google.maps.Map(document.getElementById("map"),mapProp);
          
          google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(map, event.latLng)
          })

          function placeMarker(map, location) {
            var marker = new google.maps.Marker({
              position: location,
              map: map
            });
            var infowindow = new google.maps.InfoWindow({
              content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
            });
            infowindow.open(map,marker);
          }}} }*/
      // </div>

      

import { React, useState,  useEffect, useRef, useCallback} from 'react';
import { GoogleMap, useJsApiLoader, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './css/main.css';
import Container from 'react-bootstrap/Container';
import ProfileImage from './infoWindowPic';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import config from '../config.json'

const containerStyle = {
  width: '900px',
  height: '900px'
};

function MapContainer(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.API_KEY
  })

  const [map, setMap] = useState({})

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);    
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const ref = useRef(props);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
  // const [uploadedPupImage, setUploadedPupImage] = useState("");
  // const [open, setOpen] = useState(false);
  // const [internalState, setInternalState] = useState(props);
  // const previousValueRef = useRef();
  // const previousValue=previousValueRef.current;

  // //usePrevious Hook
  // if(props !== previousValue && props !== internalState) {
  //   setInternalState(props);
  // }
  // useEffect(() => {
  //   previousValueRef.current = props;
  // }, [props, showingInfoWindow]);
      
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
        zoomDefault={17}
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