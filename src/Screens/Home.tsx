import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Image, View} from "react-native";
import * as data from '../data/blogData.json';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../Utils/static";
import {useNavigation} from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import {Button, Card, Layout, List, Text} from "@ui-kitten/components";
import {ThemeContext} from '../Components/theme-context';
import LottieView from 'lottie-react-native';

type blogScreenProp = StackNavigationProp<RootStackParamList, 'Blog'>;

export default () => {
    const navigation = useNavigation<blogScreenProp>();
    const themeContext = React.useContext(ThemeContext);
    const [items, setItems] = useState([])
    const animation = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setItems(data.blogs);
        }, 5000)
        animation.current.play()
    }, [])


// --------------------------------------------onClick notification-----------------------------------------------
    useEffect(() => {
        Notifications.addNotificationResponseReceivedListener(response => {
            Notifications.cancelScheduledNotificationAsync(response.notification.request.identifier)
            navigation.navigate('Blog', {'item': response.notification.request.content.data})
        });
    }, [])

    return (
        <Layout style={{justifyContent: "center", flex: 1}}>
            {items.length > 0 ?
                <>
                    <Button style={{borderRadius: 0}} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
                    <List
                        data={items}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={(item) => {
                            return (
                                <Card style={styles.item}
                                      onPress={() => navigation.navigate('Blog', {'item': item.item})}>
                                    <View style={{flexDirection: "row", alignItems: "center", paddingRight: 20}}>
                                        <Image style={styles.image} source={{uri: item.item.imageUrl}}/>
                                        <Text
                                            style={styles.title}>{item.item.title.charAt(0).toUpperCase() + item.item.title.slice(0)}</Text>
                                    </View>
                                </Card>
                            )
                        }}
                    />
                </> : <LottieView
                    ref={animation}
                    style={{
                        width: 400,
                        height: 400,
                    }}
                    source={require('../data/gradientBall.json')}
                />}
        </Layout>);
};

const styles = StyleSheet.create({
    item: {
        height: 160,
        elevation: 3,
        borderRadius: 8,
        marginTop: 12,
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

