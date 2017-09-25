/*
 * @providesModule Utils
 */

const Alert = require('Alert');
import MessageBar from './MessageBar';
import Constants from 'Constants'

var Utils = {
  showMessage(message){
  Alert.alert(
      Constants.appName,
      message,
    [
      { text: 'OK' , onPress: () => {
      }},
    ]
  );
  },
    showMessageBar(mess){
        MessageBar.show({
            message: mess,
            type: 'warning'
        });
    },
    showSuccessBar(mess){
        MessageBar.show({
            message: mess,
            type: 'success'
        });
    },
}

export { Utils as default };
