import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Image, View} from "react-native";
import * as data from '../data/blogData.json';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../Utils/static";
import {useNavigation} from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import {Button, Card, Layout, List, Text, Toggle} from "@ui-kitten/components";
import {ThemeContext} from '../Components/theme-context';
import LottieView from 'lottie-react-native';
import {AuthProvider} from "../Components/AuthProvider";
import firebase from 'firebase';

type blogScreenProp = StackNavigationProp<RootStackParamList, 'Blog'>;

export default () => {
    const navigation = useNavigation<blogScreenProp>();
    const themeContext = React.useContext(ThemeContext);
    const [items, setItems] = useState([])
    const {setAuth} = useContext(AuthProvider);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setItems(data.blogs);
        }, 5000)
    }, [])


// --------------------------------------------onClick notification-----------------------------------------------
    useEffect(() => {
        Notifications.addNotificationResponseReceivedListener(response => {
            Notifications.cancelScheduledNotificationAsync(response.notification.request.identifier)
            navigation.navigate('Blog', {'item': response.notification.request.content.data})
        });


        // Get the access token from firebase
        firebase.auth().currentUser.getIdToken(true).then((idToken) =>{
            console.log(idToken)
        }).catch((error)=> {
            // Handle error
        });

    }, [])

    return (
        <Layout style={styles.mainLayout}>
            {items.length > 0 ?
                <>
                    <Layout style={styles.headerLayout}>
                        <Toggle checked={checked} onChange={() => {
                            setChecked(!checked)
                            themeContext.toggleTheme()
                        }}/>
                        <Button appearance='ghost' style={styles.logoutButton} onPress={() => setAuth(false)}>LOG
                            OUT</Button>
                    </Layout>
                    <List
                        style={styles.listItems}
                        data={items}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={(item) => {
                            return (
                                <Card style={styles.item}
                                      onPress={() => navigation.navigate('Blog', {'item': item.item})}>
                                    <View style={styles.cardLayout}>
                                        <Image style={styles.image} source={{uri: item.item.imageUrl}}/>
                                        <Text
                                            style={styles.title}>{item.item.title.charAt(0).toUpperCase() + item.item.title.slice(0)}</Text>
                                    </View>
                                </Card>
                            )
                        }}
                    />
                </> : <LottieView
                    autoPlay
                    loop
                    style={{
                        width: 400,
                        height: 400,
                    }}
                    source={require('../data/gradientBall.json')}
                />}
        </Layout>);
};

const styles = StyleSheet.create({
    mainLayout: {
        justifyContent: "center",
        flex: 1
    },
    headerLayout: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF"
    },
    logoutButton: {
        marginRight: -20
    },
    listItems: {
        backgroundColor: "#FFFFFF"
    },
    cardLayout: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 20
    },
    item: {
        height: 160,
        elevation: 3,
        borderRadius: 8,
        marginBottom: 12,
        marginHorizontal: 10,
    },
    image: {
        marginLeft: -12,
        marginRight: 12,
        width: 120,
        height: 120,
        borderRadius: 6,
    },
    title: {
        marginRight: 100,
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
    }
});

