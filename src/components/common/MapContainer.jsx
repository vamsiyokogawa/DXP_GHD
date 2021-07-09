import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import * as Constants from "../../constants/Constants";
import mapStyles from "../../constants/GoogleMapStyles";

class MapCont extends Component {
    
    render() {
        const { width, height, latLong, darkMode } = this.props;
        return (
            <div
                style={{
                    position: width ? "unset" : "absolute",
                    width: width ? width : "100%",
                    bottom: width ? null : 0,
                    top: width ? null : 40,
                    height: height ? height : null,
                }}
            >
                <Map
                    key={darkMode}
                    google={window.google}
                    initialCenter={latLong}
                    center={latLong}
                    containerStyle={styles.map}
                    styles={darkMode ? mapStyles : []}
                    zoom={14}
                >
                    <Marker position={latLong} name={"Current location"} />
                </Map>
            </div>
        );
    }
}

const styles = {
    map: {
        position: "relative",
    },
};

const MapContainer = GoogleApiWrapper({
    apiKey: Constants.KEY_CONSTANTS.googleApiKey,
})(MapCont);

export default MapContainer;
