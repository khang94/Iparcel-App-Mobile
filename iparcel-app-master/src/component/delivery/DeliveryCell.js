
'use strict';
import React, { Component,PropTypes } from 'react';
import {StyleSheet,Text,View ,Image , TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default class DeliveryCell extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      fontSize : 18
    }
  }


  render(){



    return(
      <View style={styles.cellDelivery}>
          

          <View style={styles.cellView}>
            <Text transition="fontSize" style={[styles.cell,{fontSize: this.state.fontSize || 10}]}>Delivery Information</Text>
          </View>

          <View style={styles.cellView3}>
            <Text transition="fontSize" style={[styles.cell2,{fontSize: this.state.fontSize || 10}]}>{this.props.dto.deliveryName}</Text>
          </View>

          <View style={styles.cellView3}>
            <Text transition="fontSize" style={[styles.cell2,{fontSize: this.state.fontSize || 10}]}>{this.props.dto.distance}</Text>
          </View>


      </View>

    )
  }

}



DeliveryCell.propTypes = {
  dto:React.PropTypes.object,
};

var styles = StyleSheet.create({
  cellDelivery:{
   flex: 1,
   paddingTop : 20,
  }, 
  cell : {
      fontSize: 17,
      color:'#FAFAFA',
      flex:1,
      paddingTop:5,
   },
  cell2 : {
      fontSize: 17,
      color:'black',
      flex:1,
      paddingTop:5,
   },
   cellView : {
    //flex:1,
    paddingTop: 10,
    backgroundColor:'rgba(255,0,255,0.8)',
    fontWeight : 'bold'
   },
    cellView2 : {
    //flex:1,
    paddingTop: 10,
    backgroundColor:'rgba(255,100,150,0.5)',
   },
     cellView3 : {
    //flex:1,
    paddingTop: 10,
    backgroundColor:'rgba(255,180,0,0.5)',
   },


});
