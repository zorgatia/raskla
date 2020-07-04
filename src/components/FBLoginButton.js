import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Facebook from "expo-facebook";
import { Context as AuthContext } from "../context/AuthContext";
import { Button } from "react-native-elements";

const FBLoginButton = () => {
  const { state, loginFb } = useContext(AuthContext);

  const logIn = async () => {
    try {
      await Facebook.initializeAsync("655656898609959");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
        );
        const res = await response.json();
        console.log(res.email);
        loginFb({email:res.email});
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <Button title="Login with Facebook" buttonStyle={{backgroundColor:"#4267b2",width:"50%",paddingHorizontal:15,alignSelf:"center"}} onPress={() => logIn()} icon={{ type: "font-awesome", name: "facebook" ,color:"white" }}
    >
      
      
    </Button>
  );
};

export default FBLoginButton;

const styles = StyleSheet.create({});


/*

<TouchableOpacity onPress={() => logIn()}>
      <View
        style={{
          width: "55%",
          alignSelf: "center",
          borderRadius: 4,
          padding: 24,
          backgroundColor: "#3B5998"
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Login with Facebook
        </Text>
      </View>
    </TouchableOpacity>
*/