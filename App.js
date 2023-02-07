/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import "react-native-gesture-handler";
import Routes from "@config/routes";
import { UserProvider } from "@config/userProvider";
import { Alert, Linking, LogBox, Platform } from "react-native";
import VersionCheck from "react-native-version-check";

import { useForceUpdate } from "@customHooks";

LogBox.ignoreAllLogs(); //Ignore all log notifications

const triggerUpdatePopUp = async () => {
  const listingURL = await VersionCheck.getStoreUrl({
    appID: Platform.OS === "ios" ? "com.yocharge.yocharge" : "com.yocharge",
  });

  console.log({ listingURL });

  Alert.alert(
    "New Version Available",
    "Please, update the app to new version to continue.",
    [
      {
        text: "Update",
        onPress: async () => {
          const canOpenURL = await Linking.canOpenURL(listingURL);

          if (canOpenURL) {
            Linking.openURL(listingURL);
          }
        },
      },
    ]
  );
};

const App = () => {
  const { needUpdate, setNeedUpdate } = useForceUpdate();

  useEffect(() => {
    if (needUpdate) {
      triggerUpdatePopUp();
      setNeedUpdate(false); // reset update state back to initial
    }
  }, [needUpdate]);

  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
};

export default App;
