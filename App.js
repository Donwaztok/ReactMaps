import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pages } from 'react-native-pages';

export default class App extends Component {
	render() {
		return (
			<Pages>
				<View style={{ flex: 1, backgroundColor: 'red' }} />
				<View style={{ flex: 1, backgroundColor: 'green' }} />
				<View style={{ flex: 1, backgroundColor: 'blue' }} />
			</Pages>
		);
	}
}

const styles = StyleSheet.create({

});
