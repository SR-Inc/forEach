import React, { Component } from "react";
import { 
  Map, 
  TileLayer, 
  CircleMarker, 
  Popup 
} from "react-leaflet";
import {
  attribution,
  tileUrl,
  myLocation,
} from './utils/Utils';
import { DemoMapTooltip, CityMapTooltip } from "./DemoMapTooltip";


export default class DemoMap extends Component {
  constructor() {
    super();
    // this.state = myLocation;
    this.state = {
      cities: [],
    };
  }
  
  componentDidMount() {
    fetch('/location')
      .then(res => res.json())
      .then(res => {
        this.setState({cities: res.locations});
      })
      .catch(err => console.log('Error fetching locations >>>', err));
  }

  render() {
    const cityMarkers = [];
    this.state.cities.forEach((city, idx) => cityMarkers.push(
      <CircleMarker 
          key={`city-${city._id}`}
          color='black'
          radius={15}
          weight={city.donationscount}
          onClick={() => { 
            this.setState({...this.state, activeCity: city })
          }}
          center={[city.lat, city.long]}
          >
    </CircleMarker>
    ));

    return this.state.cities ? (
      <div >
        <Map
          center={[myLocation.lat, myLocation.lng]}
          zoom={myLocation.zoom}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          minZoom={myLocation.minZoom}
        >
        <TileLayer
            attribution={attribution}
            url={tileUrl}
        />
        {cityMarkers}

        {this.state.activeCity && <Popup
          position={[this.state.activeCity.lat,this.state.activeCity.long] }
          onClose={() => {
              this.setState({...this.state, activeCity: null })
          }}
        >
          <CityMapTooltip
            city={this.state.activeCity}
          />
        </Popup>}
      </Map>
    </div>
  ) : (
      "Data is loading..."
  );
  }
}
