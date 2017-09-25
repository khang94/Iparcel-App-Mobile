import React, { Component ,  Navigator, TouchableHighlight, TouchableOpacity} from "react";
import { AppRegistry, StyleSheet, Text, View , Button } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import PushController from "./PushController";
var F8Header = require('F8Header');

var F8Navigator = require('F8Navigator');


export default class App extends Component {

      constructor(props) {
        super(props);

        this.state = {
            token: "",
            tokenCopyFeedback: ""
        }
    }

    componentDidMount() {
    
    }

    onLeftMenu(){
        console.log('on left menu');

    }
    render() {
      let { token, tokenCopyFeedback } = this.state;
    return (
      <View style={styles.container}>
        <PushController
            onChangeToken={token => this.setState({ token: token || "" })}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 20.993776,
            longitude: 105.811417,
            latitudeDelta: 0.021,
            longitudeDelta: 0.021
          }}
          style={styles.map}
        />
        <View style={styles.welcome}>
            <Text> Here is your token to push notification </Text>
            <Text> {this.state.token}</Text>
        </View>

        <F8Header
          style={styles.header}
          title='Map'
          foreground="white"
          leftItem={{
            icon: require('./assets/img/hamburger.png'),
            title: 'Back',
            layout: 'icon',
            onPress: () => this.onLeftMenu()
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map : {
    height : 400,
    //left : 0,
    //right : 0
  },
  welcome : {
      flex : 1
  },
  header: {
    paddingBottom : 50,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height : 100,
    backgroundColor: '#FF4081',
  },
});

AppRegistry.registerComponent("MyMap", () => App);
