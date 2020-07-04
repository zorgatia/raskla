import React, { useState, useContext } from "react";
import { StyleSheet, View, Image} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input, Text } from "react-native-elements";
import { Toast, Block } from "galio-framework";

import { Context as AuthContext } from "../context/AuthContext";
import { Asset } from "expo-asset";
import FBLoginButton from "../components/FBLoginButton";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { state, register } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        flex: 1,
                        resizeMode: "contain",
                        width: "50%",
                        alignSelf: "center",
                    }}
                    source={{
                        uri: Asset.fromModule(
                            require("../../assets/rasklalogo.png"),
                        ).uri,
                    }}
                ></Image>
            </View>

            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text h3 style={{ textAlign: "center" }}>
                    Register
                </Text>

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
                    leftIcon={{ type: "font-awesome", name: "key" }}
                    leftIconContainerStyle={{ paddingRight: 10 }}
                    secureTextEntry
                    viewPass
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <Button
                    title="Register"
                    onPress={() => register({ email, password })}
                ></Button>
                <Text h5 style={{ textAlign: "center" }}>
                    already have account, just{" "}
                    <Text
                        style={{ color: "#329d7d", fontWeight: "bold" }}
                        h5
                        onPress={() => navigation.navigate("Login")}
                    >
                        Login
                    </Text>
                </Text>
            </View>
            <View style={{flex:1,justifyContent:"center"}}>
              <FBLoginButton  />
            </View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: "space-evenly",
    },
});
