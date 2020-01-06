import React, { Component } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import { Pages } from 'react-native-pages';
import MapView from 'react-native-maps';

export default class App extends Component {
	state = {
		mapRegion: null,
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

	getLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			let newOrigin = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
			this.setState({
				origin: newOrigin
			});
		}, (err) => {
			console.log('error');
			console.log(err)
		}, { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 })
	};

	async componentDidMount() {
		let isGranted = await this.requestLocationPermission();
		if (isGranted) {
			this.getLocation();
		}
		this.getLocation();
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
						style={[styles.map, { marginBottom: this.state.bottomMargin }]}
						region={this.state.mapRegion}
						showsUserLocation={true}
						onMapReady={() => this.setState({ bottomMargin: 0 })}>
						<MapView.Marker
							coordinate={{
								latitude: (this.state.lastLat + 0.00050) || -36.82339,
								longitude: (this.state.lastLong + 0.00050) || -73.03569,
							}}>
							<View>
								<Text style={{ color: '#000' }}>
									{this.state.lastLong} / {this.state.lastLat}
								</Text>
							</View>
						</MapView.Marker>
					</MapView>
				</View>
			</Pages>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		height: 100,
		flex: 1
	}
});
