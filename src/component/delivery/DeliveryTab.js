
'use strict';
import React, { Component,PropTypes } from 'react';
import {StyleSheet,Text,View ,Image , TouchableOpacity , ListView} from 'react-native';

import DeliveryCell from './DeliveryCell';

export default class DeliveryTab extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      fontSize : 18,
      dataSource: dataSource.cloneWithRows(this.props.deliveries),
    }
  }

    renderRow(rowData) {
      return(
        <DeliveryCell dto={rowData}></DeliveryCell>
      );
    }


  render(){

    return(
        <ListView
            style={{height:500}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            //renderHeader={() => <AppointmentHeader/>
            renderSectionHeader={this._renderAppointmentHeader}>
        </ListView>

    )
  }

}



DeliveryTab.propTypes = {
  dto:React.PropTypes.object,
  onAppointmentDetail : React.PropTypes.func,
  appointments : React.PropTypes.any
};

var styles = StyleSheet.create({
  container : {
      flex : 1
  }

});
