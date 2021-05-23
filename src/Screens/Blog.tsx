import {ScrollView, Image, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import {RouteProp, useRoute} from "@react-navigation/native";
import {ParamList} from "../Utils/static";
import * as Notifications from 'expo-notifications';
import {Layout,Text} from "@ui-kitten/components";

const Blog = () => {
    const route = useRoute<RouteProp<ParamList, 'Blog'>>();
    const handleNotification = () => {
        Notifications.scheduleNotificationAsync({
            trigger: {repeats: true, seconds: 15},
            content: {
                title: 'Reminder:',
                body: "You haven't finished the " + route.params.item.title,
                data:route.params.item
            },
            identifier:route.params.item.title
        })
    }


    useEffect(()=>{
        handleNotification()
    },[])

    return (
        <Layout>
        <ScrollView contentContainerStyle={{paddingHorizontal:10}}
            onScroll={({
                           nativeEvent: {
                               contentOffset: {y: contentOffset_Y},
                               contentSize: {height: h},
                               layoutMeasurement: {height: layoutHeight},
                           }
                       }) => {
                if ((contentOffset_Y + layoutHeight) / h * 100 > 70) {
                    Notifications.cancelScheduledNotificationAsync(route.params.item.title)
                }
            }}>
            <Image style={styles.image} source={{uri: route.params.item.imageUrl}}/>
            <Text style={styles.content}>
                {route.params.item.content}
            </Text>
        </ScrollView>
        </Layout>
    );
};

export default Blog;

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 6,
        marginTop:12
    },
    content: {
        fontSize: 20,
        fontFamily:'Roboto'
    }
});
