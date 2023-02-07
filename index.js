/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/utility/global';
import messaging from '@react-native-firebase/messaging';
import {saveValueInStore} from '@utility/KeychainStore';
import Helper from "@utility/Helper";


messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Your code to handle notifications in killed state. For example
    console.log('Killed state notification.', remoteMessage)
    const url = Helper.handleNotification(remoteMessage);

    saveValueInStore('background-notif-link', url, (data) => {
        console.log('notification link saved to Async storage', data);
    })

});


AppRegistry.registerComponent(appName, () => App);
