import GoogleMapReact from 'google-map-react';

function createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
        mapTypeControl: true,
        mapTypeId: 'hybrid',
        streetViewControl: true
    };
}

function Map(props) {
    const renderMarkers = (map, maps, latitude, longitude) => {
        let marker = new maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title: 'Hotspot Marker'
        });
        return marker;
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '75vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyAG1wy8E-WZuD5kvCYMODyh9fZ2RConDkQ',
                    language: 'id',
                    region: 'ID'
                }}
                center={props.center}
                zoom={props.zoom}
                options={createMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    props.hotspots.forEach((hotspot) => {
                        renderMarkers(map, maps, parseFloat(hotspot.latitude), parseFloat(hotspot.longitude));
                    })
                }}
            >
            </GoogleMapReact>
        </div>
    );
}

export default Map;