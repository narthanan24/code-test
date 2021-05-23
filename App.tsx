import React from "react";
import {useFonts} from "expo-font";
import Login from "./src/Screens/Login";
import firebase from "firebase";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./src/Screens/Home";
import {RootStackParamList} from "./src/Utils/static";
import Blog from "./src/Screens/Blog";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import { ThemeContext } from './src/Components/theme-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {StyleSheet} from "react-native";

const Stack = createStackNavigator<RootStackParamList>();

const firebaseConfig = {
    apiKey: "AIzaSyASjtXE98ewUENrR20M23ZvTPE0zVT9O50",
    authDomain: "react-native-code-test-88dc1.firebaseapp.com",
    projectId: "react-native-code-test-88dc1",
    storageBucket: "react-native-code-test-88dc1.appspot.com",
    messagingSenderId: "251539132000",
    appId: "1:251539132000:web:96d1ac0de69396cfd4fd05",
    measurementId: "G-HN491TYXFH"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
    const [theme, setTheme] = React.useState('light');

    const [loaded, error] = useFonts({
        Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    });

    if (!loaded) {
        return null;
    }

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    return (<>
            <IconRegistry icons={EvaIconsPack}/>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <ApplicationProvider {...eva} theme={eva[theme]}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Login">
                            <Stack.Screen name="Login" component={Login}/>
                            <Stack.Screen options={{headerLeft: () => null}} name="Home" component={Home}/>
                            <Stack.Screen name="Blog" component={Blog}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </ApplicationProvider>
            </ThemeContext.Provider></>
    );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
  },
});
