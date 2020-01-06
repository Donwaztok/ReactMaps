import React, { Component } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';

import { Pages } from 'react-native-pages';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyASspOu0rSMaUOR28MNDZlkEhspkWnKkJo';

export default class App extends Component {
	state = {
		mapRegion: null,
		origin: { latitude: -23.5607, longitude: -46.6293 },
		destination: { latitude: -23.5747, longitude: -46.6369 },
		lastLat: null,
		lastLong: null,
		bottomMargin: 1,
	}

	async requestLocationPermission() {
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the location");
				return true;
			} else {
				console.log("location permission denied");
				return false;
			}
		} catch (err) {
			console.warn(err)
		}
	}

	async componentDidMount() {
		let isGranted = await this.requestLocationPermission();
	}

	handleGetGoogleMapDirections = () => {
		const data = {
			source: this.state.origin,
			destination: this.state.destination,
			params: [
				{
					key: "travelmode",
					value: "driving"
				}
			]
		};
		getDirections(data)
	};

	render() {
		return (
			<Pages>
				<View style={{ flex: 1, backgroundColor: 'red' }} />
				<View style={{ flex: 1, backgroundColor: 'green' }} />
				<View style={{ flex: 1, backgroundColor: 'blue' }}>
					<MapView
						ref={map => this.mapView = map}
						style={[styles.map, { marginBottom: this.state.bottomMargin }]}
						showsUserLocation={true}
						followsUserLocation={true}
						showsCompass={true}
						loadingEnabled={true}
						toolbarEnabled={true}
						zoomControlEnabled={true}
						showsScale={true}
						showsBuildings={true}
						//showsTraffic={true}
						showsIndoors={true}
						onMapReady={() => this.setState({ bottomMargin: 0 })}
						region={{
							latitude: (this.state.origin.latitude + this.state.destination.latitude) / 2,
							longitude: (this.state.origin.longitude + this.state.destination.longitude) / 2,
							latitudeDelta: Math.abs(this.state.origin.latitude - this.state.destination.latitude) + Math.abs(this.state.origin.latitude - this.state.destination.latitude) * .5,
							longitudeDelta: Math.abs(this.state.origin.longitude - this.state.destination.longitude) + Math.abs(this.state.origin.longitude - this.state.destination.longitude) * .5,
						}}
					>
						<MapView.Marker coordinate={this.state.destination} >
							<MapView.Callout onPress={this.handleGetGoogleMapDirections}>
								<Text>Destino (Clique para abrir no Google Maps)</Text>
							</MapView.Callout>
						</MapView.Marker>

						<MapView.Marker coordinate={this.state.origin} >
							<MapView.Callout>
								<Text>Inicio</Text>
							</MapView.Callout>
						</MapView.Marker>

						<MapViewDirections
							strokeWidth={4}
							origin={this.state.origin}
							destination={this.state.destination}
							apikey={GOOGLE_MAPS_APIKEY}
						/>
					</MapView>
				</View>
			</Pages>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	}
});
