import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pages } from 'react-native-pages';
import MapView from  'react-native-maps';

export default class App extends Component {
	render() {
		return (
			<Pages>
				<View style={{ flex: 1, backgroundColor: 'red' }} />
				<View style={{ flex: 1, backgroundColor: 'green' }} />
				<View style={{ flex: 1, backgroundColor: 'blue' }}>
					<MapView 
						style={styles.map}
						initialRegion={{
							latitude: 13.139238380834923,
							longitude: 80.25188422300266,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}>
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
