import React, { Component } from "react";

import Map from '../elements/Map/Map'
import SearchBar from "../elements/SearchBar/SearchBar"
import Menu from "../elements/Menu/Menu"
import SelectedSpot from "./SelectedSpot/SelectedSpot"
import {connect} from "react-redux"
import Axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {

      spots: [],
      error: null,

      //map states
      user_location: [2, 46.8],
      map_zoom: 5,

      search: "",
      spotResults: [],
      userResults: [],

    };
    this.handleChange = this.handleChange.bind(this)
    this.onSelectSpot = this.onSelectSpot.bind(this)
  }

  componentDidMount() {
    
    Axios.get('/api/spots/getAll').then((res) => this.setState({ spots: res.data.spots },()=>{console.log(this.state.spots)}))
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ user_location: [position.coords.longitude, position.coords.latitude], map_zoom: 12 });
    }, () => { }, { enableHighAccuracy: true, maximumAge: 0 })

  }

  handleChange(e) {
    Axios.get('/api/users/getSearchResults',{params:{search : e.target.value}}).then(res=>{this.setState({userResults : res.data.users})})
    this.setState({ [e.target.name]: e.target.value, spotResults : this.state.spots.filter(spot => spot.name.toLowerCase().includes(e.target.value.toLowerCase())) });
  }

  onSelectSpot(spot_name) {
    this.setState({search : spot_name, spotResults: [], userResults: []})
  }

  render() {
    return (
      <div>
        <Map selectedSpot={this.props.spot.selectedSpot} user_location={this.state.user_location} map_zoom={this.state.map_zoom} addControl={true} spots={this.state.spots} onSelectSpot={this.onSelectSpot}/>
        <SearchBar search={this.state.search} onChange={this.handleChange} spotResults={this.state.spotResults} userResults={this.state.userResults} mapCenter={this.state.user_location} onSelectSpot={this.onSelectSpot}/>
        {this.props.spot.selectedSpot &&
          <SelectedSpot user_location={this.state.user_location}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spot:state.spot,
    menu: state.menu
  }
}

export default connect(mapStateToProps)(Landing);
