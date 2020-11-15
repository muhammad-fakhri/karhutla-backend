import GoogleMapReact from 'google-map-react'

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
	}
}

function Map(props) {
	const handleApiLoaded = (map, maps, hotspots) => {
		const markers = []
		const infowindows = []
		const defaultMarker =
			'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
		hotspots.forEach((hotspot) => {
			markers.push(
				new maps.Marker({
					position: {
						lat: parseFloat(hotspot.latitude),
						lng: parseFloat(hotspot.longitude)
					},
					map,
					icon: hotspot.marker ? hotspot.marker : defaultMarker
				})
			)

			infowindows.push(
				new maps.InfoWindow({
					content: hotspot.html
				})
			)
		})

		markers.forEach((marker, i) => {
			marker.addListener('click', () => {
				infowindows[i].open(map, marker)
			})
		})
	}

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
				onGoogleApiLoaded={({ map, maps }) =>
					props.hotspots != undefined
						? handleApiLoaded(map, maps, props.hotspots)
						: ''
				}
			></GoogleMapReact>
		</div>
	)
}

export default Map
