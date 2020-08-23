import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                center={this.props.center}
                zoom={this.props.zoom}
                streetViewControl={true}
                containerStyle={{
                    position: 'relative',
                    width: '100%',
                    height: '75vh',
                }}
                onClick={this.onMapClicked}
            >
                {
                    this.props.spots
                        ? this.props.spots.map((spot, i) => {
                            return <Marker
                                onClick={this.onMarkerClick}
                                icon={spot.marker}
                                patroli={spot.patroli}
                                position={{
                                    lat: parseFloat(spot.latitude),
                                    lng: parseFloat(spot.longitude)
                                }}
                            />
                        })
                        : console.log("no spots")
                }

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    {this.state.selectedPlace.patroli
                        ? <div>
                            <center>
                                <b>{this.state.selectedPlace.patroli.id_daerah_patroli.nama_daerah_patroli}</b>
                            </center>
                            <center>Lat: {this.state.selectedPlace.patroli.laporanDarat[0].latitude} | Lng: {this.state.selectedPlace.patroli.laporanDarat[0].longitude} </center>
                            <br />
                            <table>
                                <tr>
                                    <td>Kategori</td>
                                    <td>:</td>
                                    <td>Patroli {this.state.selectedPlace.patroli.kategori_patroli}</td>
                                </tr>
                                <tr>
                                    <td>Regu/Tim </td>
                                    <td>:</td>
                                    <td>{this.state.selectedPlace.patroli.regu_patroli.daerah.nama_daops}</td>
                                </tr>
                                <tr>
                                    <td>Ketua Regu </td>
                                    <td>:</td>
                                    <td>{this.state.selectedPlace.patroli.regu_patroli.ketua.nama}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>{this.state.selectedPlace.patroli.regu_patroli.ketua.email}</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Wilayah </td>
                                    <td>:</td>
                                    <td>{this.state.selectedPlace.patroli.id_daerah_patroli.tipe_wilayah} {this.state.selectedPlace.patroli.id_daerah_patroli.nama_wilayah}</td>
                                </tr>
                            </table>
                            <br />
                            <center>
                                <a href='http://103.129.223.216/simadu2/app/downloader.php?id={this.props.patroli.id_laporan_header}' target='_blank'>Unduh Laporan</a>
                            </center>
                        </div>
                        : <h3>No Content</h3>}
                </InfoWindow>
            </Map >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAG1wy8E-WZuD5kvCYMODyh9fZ2RConDkQ',
    language: 'id',
    region: 'ID'
})(MapContainer)