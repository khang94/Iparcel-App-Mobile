/**
 * Copyright 2016 Vihat.VN, Inc.
 *
 * @providesModule F8Navigator
 * @flow
 */

'use strict';

var Platform = require('Platform');

import React, { Component ,select,Navigator} from "react";
import { TouchableHighlight,View } from 'react-native';
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var Text = require('Text');
var { connect } = require('react-redux');

import ListViewPlace from '../component/listview/ListViewPlace'

var NavigationBarRouteMapper = {
  LeftButton: function( route, navigator, index, navState ){
    if (index === 0) {
     return null;
   }
    var previousRoute = navState.routeStack[index - 1];
    return(
      <TouchableOpacity
       onPress={() => navigator.pop()}
       style={styles.navBarLeftButton}>
       <Text style={[styles.navBarText, styles.navBarButtonText]}>
         {previousRoute.title || 'Back' }
       </Text>
     </TouchableOpacity>
    )
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text>{ route.title || 'TeraAdmin'}</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){
    return(
      <Text>{ route.rightButton || '' }</Text>
    )
  }
}

var F8Navigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),


  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);

  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);

  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener: function(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton: function() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  },



  render(){
    return (
      <Navigator
        ref="navigator"
        style={styles.container}

        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene(route, navigator){
    //return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
    return(
        <ListViewPlace navigator={navigator}/>
        );
    }
});

F8Navigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  containerWaiting: {
    flex: 1,
    padding: 26,
    alignItems: 'center',
    backgroundColor: '#25AADA',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});



module.exports = connect(select)(F8Navigator);
//module.exports = F8Navigator;