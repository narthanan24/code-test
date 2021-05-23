import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import firebase from 'firebase';
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../Utils/static";
import {Input, Layout, Text, Button, Spinner} from "@ui-kitten/components";

type FormData = {
    email: string;
    password: string;
};

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default () => {
    const navigation = useNavigation<loginScreenProp>();
    const [formErr, setFormErr] = useState('');
    const [loading,setLoading] = useState(false);

    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm<FormData>();

    const onSubmit = handleSubmit(data => {
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                    navigation.navigate('Home')
                }
            )
            .catch((e) => {
                console.log(e)
                setFormErr('Invalid email or password')
            })
            .finally(()=>{
                setLoading(false)
            })
    });

    const LoadingIndicator = () => (
        <View style={styles.indicator}>
            <Spinner status='control' size='small'/>
        </View>
    );

    return (
        <Layout style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => {
                            onChange(value)
                            setFormErr('')
                        }}
                        value={value}
                    />
                )}
                name="email"
                rules={{required: true}}
            />
            <Text style={styles.validate}> {errors.email ? "Email is required." : ""}</Text>
            <Text style={styles.label}>Password</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => {
                            onChange(value)
                            setFormErr('')
                        }}
                        value={value}
                    />
                )}
                name="password"
                rules={{required: true}}
            />
            <Text style={styles.validate}>{errors.password ? "Password is required." : ""}</Text>
            <Text style={[styles.validate, {alignSelf: 'center'}]}>{formErr}</Text>
            <Button onPress={onSubmit}>{loading?LoadingIndicator:"Login"}</Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },

    input: {
        height: 40,
        borderRadius: 4,
    },

    validate: {
        color: '#3366FF',
        marginBottom: 5
    },
    indicator:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});
