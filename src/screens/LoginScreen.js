import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input,Text } from "react-native-elements";

import FBLoginButton from "../components/FBLoginButton";

import { Context as AuthContext } from "../context/AuthContext";
import { Asset } from "expo-asset";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { state, login } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, resizeMode: "contain" ,width:"50%",alignSelf:"center"}}
                    source={{
                        uri: Asset.fromModule(
                            require("../../assets/rasklalogo.png"),
                        ).uri,
                    }}
                ></Image>
            </View>
            <View style={{flex:1 , justifyContent:"space-between"}}>
                <Text h3 style={{textAlign:"center"}}>Login</Text>
                <Input
                    placeholder="Email"
                    
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
                    leftIconContainerStyle={{ paddingRight: 10 }}
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <Input
                    placeholder="password"
                    secureTextEntry
                    viewPass
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                    leftIcon={{ type: "font-awesome", name: "key" }}
                    leftIconContainerStyle={{ paddingRight: 10 }}
                />
                <Button
                    title="Login"
                    onPress={() => login({ email, password })}
                ></Button>
                <Text h5 style={{textAlign:"center"}}>
                    don't have account,{' '}
                    <Text style={{color:"#329d7d",fontWeight:"bold"}} h5 onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </Text>
            </View>
            <View style={{flex:1,justifyContent:"center"}}>
              <FBLoginButton  />
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: "space-evenly",
    },
});
