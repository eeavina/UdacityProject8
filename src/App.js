import React, { Component } from 'react';
import GoogleMapContainer from './components/GoogleMapContainer'
import ListContainer from './components/ListContainer'
import Places from './data/places'

class App extends Component {
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        places: [],
        photos: [],
        photoOwners: []
    }

    // Turn on the info window once a marker is clicked
    onMarkerClick = (props, marker, e) => {
        //console.log('e', props);
        //console.log('marker', marker);
        //console.log('props', props);
        //console.log('photos');
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        })
    };

    // Turn on the info window from the list section by listing button click
    onButtonClick = (place) => {
        //console.log('clicked', place);
        document.querySelector(`[title="${place.title}"]`).click()
    }

    // Filter thru picture names with a text snippet
    searchPlaces = (textInput) => {
        if (!textInput) {
            return this.setState({ places: [] })
        }
        //console.log(textInput);
        const filteredPlaces = Places.filter(place => place.name.toLowerCase().includes(textInput.toLowerCase()));
        this.setState({
            places: filteredPlaces,
            selectedPlace: {},
            showingInfoWindow: false
        });
    }

    // Pop up a message if images could not load
    onImgError = () => {
        alert("Flickr information failed to load");
    }

    componentDidMount() {
        //console.log('we are in component');
        const component = this;
        const photos = {};
        const photoOwners = {};
        Places.map(place => {
            //console.log('print place',place);
            return fetch(place.flickr)
                .then(response => { return response.json(); })
                .then(results => {
                    //console.log('print json', results);
                    const photo = results.photos.photo[0];
                    //console.log('photo in json', photo);
                    const srcPath = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    photo.src = srcPath;
                    //console.log(srcPath);
                    photos[place.title] = (<img className="info-image" key={photo.title} alt={photo.title} src={srcPath}></img>);
                    photoOwners[place.title] = photo.owner;
                    component.setState({ photos: photos, photoOwners: photoOwners });
                    return (<img alt={photo.title} src={photo.src} />);
                })
                 //Alert if the images were not able to load in, but will be replaced with the alternative text
                .catch((results) => {
                    //component.onImgError()
                    console.log('Image was not able to load');
                });
        })
    }

    render() {
        //console.log(this.state.places);
        return (
            <div role="application" className="container">
                <header aria-label="Header containing search list elements">
                    <ListContainer
                        aria-label="Search container"
                        places={this.state.places}
                        selectedPlace={this.state.selectedPlace}
                        searchPlaces={this.searchPlaces}
                        onButtonClick={this.onButtonClick}
                    />
                </header>
                <main aria-label="Main containing map">
                    <GoogleMapContainer
                        aria-label="Map container"
                        activeMarker={this.state.activeMarker}
                        selectedPlace={this.state.selectedPlace}
                        showingInfoWindow={this.state.showingInfoWindow}
                        places={this.state.places}
                        photos={this.state.photos}
                        photoOwners={this.state.photoOwners}
                        onMarkerClick={this.onMarkerClick}
                        searchPlaces={this.searchPlaces}
                    />
                </main>
                <footer aria-label="Footer containing link to Google Dev Platform"><p>See more <a tabIndex="4" href="https://cloud.google.com/maps-platform/">Google Maps Dev</a> ideas here</p></footer>
            </div>
        );
    }
}

export default App
