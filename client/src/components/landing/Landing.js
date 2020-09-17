import React, { Component } from "react";

import Map from '../elements/Map/Map'
import SearchBar from "../elements/SearchBar/SearchBar"
import Menu from "../elements/Menu/Menu"

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      //map states
      user_location: [2, 46.8],
      map_zoom: 5,

    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ user_location: [position.coords.longitude, position.coords.latitude], map_zoom :12 });
    },()=>{},{enableHighAccuracy : true, maximumAge : 0})
  }



  render() {
    return (
      <div>
        <Map user_location={this.state.user_location} map_zoom={this.state.map_zoom} addControl={true}/>
        <SearchBar />
        <Menu />
      </div>
    );
  }
}

export default Landing;
