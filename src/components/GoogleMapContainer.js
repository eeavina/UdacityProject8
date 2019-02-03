import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapStyles from '../data/mapstyles'

export class GoogleMapContainer extends Component {

    render() {
        const mapStyles = MapStyles;
        const selectedPlace = this.props.places.filter(place => this.props.selectedPlace.title === place.name)[0]
        //console.log('selectedPlace', selectedPlace);
        const photos = this.props.photos;
        //console.log('this', this.props.photos);

        //// Will be used later to play with the marker colors
        //// Style the markers PERSONALIZE
        //var defaultIcon = makeMarkerIcon('0091ff');
        //// Highlight when hovering over PERSONALIZE
        //var highlightedIcon = makeMarkerIcon('FFFF24');

        //makeMarkerIcon(markerColor) {
        //    var markerImage = new window.google.maps.MarkerImage(
        //        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        //        '|40|_|%E2%80%A2',
        //        new window.google.maps.Size(21, 34),
        //        new window.google.maps.Point(0, 0),
        //        new window.google.maps.Point(10, 34),
        //        new window.google.maps.Size(21, 34));
        //    return markerImage;
        //}
        //const markers = this.props.markers;

        return (
            <Map
                role="map"
                aria-label="Map container with Google map"
                google={this.props.google}
                zoom={12}
                styles={mapStyles}
                initialCenter={{
                    lat: 47.507121, 
                    lng: 19.045669
                }}>


                {this.props.places.map((place) => {
                    return (
                        <Marker
                            aria-label="Marker"
                            tabIndex="0"
                            onClick={this.props.onMarkerClick}
                            key={place.id}
                            position={place.latlng}
                            title={place.name}
                        />
                    );
                })
                }
                <InfoWindow
                    aria-label="info"
                    tabIndex="0"
                    onClose={this.onInfoWindowClose}
                    style={require('../App.css')}
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}
                >
                    {selectedPlace ? < div className={"info"} aria-label={"Location information window"}>

                        {this.props.searchPlaces[selectedPlace.name]}
                        <h2 tabIndex="0" className={"info"}>{selectedPlace.name}</h2>
                        <a href={selectedPlace.wikiLink}>More info from Wikipedia</a>
                        <p tabIndex="0">Flickr owner number: <em>{this.props.photoOwners[selectedPlace.name]}</em></p>
                        {this.props.photos[selectedPlace.name]}
                    </div> : <div></div>}
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDH7AMkksocQDJ8xcZd1Uzx5Jngi6bC7dE")
})(GoogleMapContainer)