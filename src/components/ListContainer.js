import React, { Component } from 'react';

class ListContainer extends Component {

    state = {
        title : "Find the closest baths in Budapest"
    }

    render() {
        const places = this.props.places;
        return (
            <div role="region" aria-label="Search panel region" className="list-container">
                <section role="region" aria-label="Section of the region">
                    <h2>{this.state.title}</h2>
                    <input role="search" aria-label="Text input for search" onChange={e => this.props.searchPlaces(e.target.value)} type="text" placeholder="Search for baths" />
                </section>
                <section role="region" aria-label="Section of the region">
                    {/* Might work on it later and add it to the application*/}
                    {/*<input id="show-listings" type="button" value="Show Listings" />
                    <input id="hide-listings" type="button" value="Hide Listings" />*/}
                </section>
                <section role="region" aria-label="Section of the region">
                    <div aria-label="List of baths" className="bath-list">
                        {
                            places.map(place => {
                                return (
                                    <div role="list" aria-label="Button list" key={place.name} className="bath">
                                        <button role="button" aria-label="Button to turn on markers" className="bath" onClick={e => this.props.onButtonClick(place)}>{place.name}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>

        );
    }
}

export default ListContainer