import React, { Component } from 'react';
import 'whatwg-fetch';
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
	FusionTablesLayer,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			userAddress: '',
			readytoMap: false,
			markers: '',
			lat: '',
			lng: ''
		}
		this.handleClick = this.handleClick.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
	}
	handleClick(evt) {
		const parent = this;
		evt.preventDefault();
		let input = this.state.userAddress;
		fetch('/search', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		    address: input
		  })
		})
		.then(checkStatus)
		.then(parseJSON)
		.then(function(data) {
				console.log('request succeeded with JSON response', data);
				parent.setState({markers:data.data});
				parent.setState({lat:data.geo.lat});
				parent.setState({lng:data.geo.lng});
				parent.setState({readytoMap: true});

		}).catch(function(error) {
			console.log('request failed', error.response)
		})
	}
	updateInputValue(evt) {
		this.setState({
			userAddress: evt.target.value
		});
	}
	render() {
		const ready = this.state.readytoMap;
		return (
			<div>
			{ready ? (<MapWithAMarkerClusterer lat={this.state.lat} lng={this.state.lng} markers={this.state.markers} />) : (<form onSubmit={this.handleClick}>
					        								<input type="text" onChange={this.updateInputValue} value={this.state.userAddress} placeholder="ENTER ADDRESS"/>
					        								<input type="submit" value="submit"/>
					      							</form>)
			}
			</div>
		);
	}
}


const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAOTZRfzVH_ZBJcQXoXxtNI6YA6KE35kug&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.fname}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lon) }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);



function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response.text()
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}



export default SearchForm;




// const MapWithAMarkerClusterer = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAOTZRfzVH_ZBJcQXoXxtNI6YA6KE35kug&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withHandlers({
//     onMarkerClustererClick: () => (markerClusterer) => {
//       const clickedMarkers = markerClusterer.getMarkers()
//       console.log(`Current clicked markers length: ${clickedMarkers.length}`)
//       console.log(clickedMarkers)
//     },
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap
//     defaultZoom={11}
//     defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
//   >
//     <MarkerClusterer
//       onClick={props.onMarkerClustererClick}
//       averageCenter
//       enableRetinaIcons
//       gridSize={60}
//     >
//       {props.markers.map(marker => (
//         <Marker
//           key={marker.fname}
//           position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lon) }}
//         />
//       ))}
//     </MarkerClusterer>
//   </GoogleMap>
// );
