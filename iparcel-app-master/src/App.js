import React, { Component ,  Navigator, TouchableHighlight, TouchableOpacity} from "react";
import { AppRegistry, StyleSheet, Text, View , Button , ListView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import PushController from "./PushController";
var F8Header = require('F8Header');

import Constant from './common/Constant';
import Utils from 'Utils';

var Polyline = require('@mapbox/polyline');

const CURRENT_POINT = "10.8232, 106.6301";

var dataSource = new ListView.DataSource(
    {rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2}
  );
const MOCK_DATA = require('./model/DeliveryListMock');
import DeliveryCell from './component/delivery/DeliveryCell';
import GridView from 'react-native-grid-view';

export default class App extends Component {

      constructor(props) {
        super(props);

        this.onRegionChange = this.onRegionChange.bind(this);
        this.onPushNotificationClick = this.onPushNotificationClick.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);

        var deliveryList = MOCK_DATA.deliveryList;

        this.state = {
            token: "",
            tokenCopyFeedback: "",
            region : new Object(),
            coords : [],
            deliveryName : '',
            deliveryList: [],
            dataSource: dataSource.cloneWithRows(deliveryList),
            optionRender : 0,
            delivery : new Object()
        }
    }

    componentDidMount() {
        this.getDirections(CURRENT_POINT, "10.8050,106.6252");
        this.getListDelivery();
    }

    onLeftMenu(){
        console.log('on left menu');

    }


    onRegionChange(region){
      console.log('latitude [' + region.latitude + ']');
      console.log('longitude [' + region.longitude + ']');
      console.log('latitudeDelta [' + region.latitudeDelta + ']');
      console.log('longitudeDelta [' + region.longitudeDelta + ']');
    }

    updateNewRegion(delivery){
      var region = delivery.coorTo;
      region.latitudeDelta = '0.004116185009479523';
      region.longitudeDelta = '0.004116185009479523';

      this.setState({
        region : region
      })
    }

    getCoordinateData(delivery){
      var destiny = delivery.toPoint;
      var coords = [];

      this.setState({
        deliveryName : delivery.deliveryName,
        delivery : delivery
      })
      
      this.getDirections(CURRENT_POINT , destiny);
    }

    onPushNotificationClick(){

        var method='POST';
        var deviceKey = this.state.token;
        var authKeyFcm = Constant.AUTH_KEY_FCM;
        var url=Constant.serverUrl + 'delivery/push?deviceKey=' + deviceKey + '&authKeyFcm=' + authKeyFcm;

        fetch(url, {
          method: method,
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            ""
          )
          }).then((response) => response.json())
          .then((responseJson) => {
              //Utils.showSuccessBar("Update setting list successfully !");
              console.log('response ' + responseJson);
              if(responseJson.status == 'success'){
                Utils.showMessage('You have new delivery...');
                this.getCoordinateData(responseJson.object);
                this.updateNewRegion(responseJson.object);
              } else {
                Utils.showMessage('Get new delivery fail...Check your network');
              }
              
          })
          .catch((error) => {
            console.log('error [' + error + ']');
        });
    }

    getListDelivery(){

        var method = 'GET';
        var url=Constant.serverUrl + 'delivery/getAll';

        fetch(url, {
          method: method,
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          }).then((response) => response.json())
          .then((responseJson) => {
              //Utils.showSuccessBar("Update setting list successfully !");
              console.log('response ' + responseJson);
              if(responseJson.status == 'success'){
                Utils.showMessage('Get all delivery success...');
                this.setState({
                  deliveryList : responseJson.object,
                  dataSource : dataSource.cloneWithRows(responseJson.object)
                });
              } else {
                Utils.showMessage('Get new delivery fail...Check your network');
              }
              
          })
          .catch((error) => {
            console.log('error [' + error + ']');
        });
    }

    onChangeToken(token){
      this.setState({ token: token || "" });
    }

    renderRow(rowData) {
      return(
        <DeliveryCell dto={rowData}></DeliveryCell>
      );
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

    _renderMap(){
      return(
        <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 10.8232812381982,
            longitude: 106.63018841296434,
            latitudeDelta: 0.007853101115275152,
            longitudeDelta: 0.008223988115773295
          }}
          style={styles.map}
          onRegionChange={(region) => this.onRegionChange(region)}>


          <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={3}
            strokeColor="red"
            fillColor="rgba(255,0,0,0.5)"
            />

        </MapView>
        </View>
      );
    }

    onChangeOption(){
      if(this.state.optionRender == 0){
        this.getListDelivery();
        this.setState({
          optionRender : 1
        })
      } else {
        this.setState({
          optionRender : 0
        })
      }
    }





    _renderListView(){
      return(
        <View style={styles.listViewWrap}>
          <ListView
            style={styles.listview}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}>
          </ListView>
        </View>
      );

    }

    _renderOption(){
      let screen = null;
      if(this.state.optionRender == 0){
        screen = this._renderMap();
      } else {
        screen = this._renderListView();
      }
      return screen;
    }




render() {
      let { token, tokenCopyFeedback } = this.state;
      var titleButton = (this.state.optionRender == 0) ? "Get history delivery" : "View Map Data";
    return (
      <View style={styles.container}>
        <PushController
            onChangeToken={token => this.onChangeToken(token)}
        />
        {this._renderOption()}
        

        <View style={(this.state.optionRender == 0) ? styles.welcomeMap : styles.welcome}>
            <Text style={styles.explanation}>New Delivery : {this.state.delivery.deliveryName}</Text>
            <Text style={styles.explanation}>Route Distance : {this.state.delivery.distance}</Text>
        </View>
        

        <Button
          onPress={this.onChangeOption}
          title={titleButton}
          color="#841584"
          style={styles.button}
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={styles.space}></View>
        <Button
          onPress={this.onPushNotificationClick}
          title='Get Random New Delivery'
          color="#841584"
          style={styles.button}
          accessibilityLabel="Learn more about this purple button"
        />

        <F8Header
          style={styles.header}
          title=''
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
    height : 500,
    width: 500,
    left : 0,
    right : 0,
    position : 'absolute'
  },
  listview : {
    height : 500
  },
  listViewWrap : {
    height : 500,
    paddingTop : 50
  },
  welcomeMap : {
      flex : 1,
      paddingTop : 500,
  },
  welcome : {
      flex : 1,
  },
  explanation : {
    fontSize : 18,
    fontWeight : 'bold',
    color : 'blue'
  },
  header: {
    paddingBottom : 50,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height : 50,
    backgroundColor: '#FF4081',
  },
  button : {
    position : 'absolute',
    left:0,
    right :0,
    flex : 1,
    marginTop : 5
  },
  space : {
    height : 10
  }
});

AppRegistry.registerComponent("MyMap", () => App);

