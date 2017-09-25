# Iparcel-App-Mobile
DEMO IPARCEL APP

## Introduce : 
This is simple app include push notification and route map for the driver, who get the new random delivery .

### Feature : 
        Push notication directly to the app from server.
        Route map to guide the driver on the street of their delivery.
        Tracking history all delivery which has been notified. 
        
### Guide Set Up : 

Push Notification : npm install --save react-native-fcm .All of the other has been configuration . Replace google-services.json by your firebase app which should be the right name of package.
Put your AUTH_KEY_FCM in the './src/common/Constant.js' to get your notification from server.
You will see the serverUrl: 'http://45.119.81.84:7575/' on the Constant.js file. This port is still being alive to test this demo. Otherwise , you will need pull Iparcel-App-Server to set up in local and use your machine port to test notification.

React-Native-Maps : run npm install --save react-native-maps and npm install react-native-maps @mapbox/polyline --save to run polyline direction with google map api.

Others : Run npm install with the other library if they does not exist in node_modules.

Do not forget to install your google-play-services on the Simulator to run the app.

Finally , we are good to go.

Hope you will enjoy it.
