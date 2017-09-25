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

## Some screenshot demo about the app.

1. ![screen shot 2017-09-25 at 22 34 50](https://user-images.githubusercontent.com/20040653/30818191-13e79a12-a245-11e7-9721-523fdb40c04d.png)
2. ![screen shot 2017-09-25 at 22 34 50](https://user-images.githubusercontent.com/20040653/30818227-2cdd6736-a245-11e7-86ab-af34a1853ad5.png)
3. ![screen shot 2017-09-25 at 22 34 50](https://user-images.githubusercontent.com/20040653/30818262-4a935fd8-a245-11e7-970a-a9f7fddd4959.png)
4. ![screen shot 2017-09-25 at 22 34 50](https://user-images.githubusercontent.com/20040653/30818285-57a9682a-a245-11e7-98d3-0ba5c282c951.png)
5. ![screen shot 2017-09-25 at 22 34 50](https://user-images.githubusercontent.com/20040653/30818306-6967cd2c-a245-11e7-95d2-8e4206215a4f.png)
6. ![screen shot 2017-09-25 at 22 34 50](https://user-images.githubusercontent.com/20040653/30818349-86402a3e-a245-11e7-87c3-08d3c50aad1f.png)

## Hope you will enjoy it.

## LICENSE
Khang Mai (khang.nm94@gmail.com).
