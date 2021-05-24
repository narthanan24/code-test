import {ScrollView, Image, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import {RouteProp, useRoute} from "@react-navigation/native";
import {ParamList} from "../Utils/static";
import * as Notifications from 'expo-notifications';
import {Layout, Text} from "@ui-kitten/components";

const Blog = () => {
    const route = useRoute<RouteProp<ParamList, 'Blog'>>();
    const handleNotification = () => {
        Notifications.scheduleNotificationAsync({
            trigger: {repeats: true, seconds: 15},
            content: {
                title: 'Reminder:',
                body: "You haven't finished the " + route.params.item.title,
                data: route.params.item
            },
            identifier: route.params.item.title
        })
    }

    useEffect(() => {
        handleNotification()
    }, [])

    return (
        <Layout style={{backgroundColor: "#FFFFFF"}}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}}
                        onScroll={({
                                       nativeEvent: {
                                           contentOffset: {y: contentOffset_Y},
                                           contentSize: {height: h},
                                           layoutMeasurement: {height: layoutHeight},
                                       }
                                   }) => {
                                        ((contentOffset_Y + layoutHeight) / h * 100 > 70) && Notifications.cancelScheduledNotificationAsync(route.params.item.title)
                                    }}>
                <Image style={styles.image} source={{uri: route.params.item.imageUrl}}/>
                <Layout style={styles.textLayout}>
                    <Text style={styles.content}>
                        {route.params.item.content}
                    </Text></Layout>
            </ScrollView>
        </Layout>
    );
};

export default Blog;

const styles = StyleSheet.create({
    image: {
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 12
    },
    content: {
        textAlign: "justify",
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    textLayout: {
        paddingHorizontal: 5,
        marginBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});
