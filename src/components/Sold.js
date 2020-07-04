import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Asset } from "expo-asset";

const Sold = ({ sold }) => {
    return (
        <View style={styles.contain}>
            <Text style={styles.sold}>
            {"  "}  {sold} raskla points {"    "}
            </Text>
            <View style={styles.logobg}>
            <Image
                style={styles.logo}
                source={{
                    uri: Asset.fromModule(
                        require("../../assets/rasklalogo.png"),
                    ).uri,
                }}
            ></Image>
            </View>
            <Text>{" "}</Text>
        </View>
    );
};

export default Sold;

const styles = StyleSheet.create({
    contain: {
        backgroundColor: "#329d7d",
        flex: 1,
        flexDirection: "row",
        padding:3,
        borderTopRightRadius:90,
        borderBottomRightRadius:90,
        left:-20
        
    },
    logo: {
        marginTop:1,
        width:30,
        height:30,
        resizeMode: "contain",
        alignSelf:"center"
        
    },
    logobg:{
       
        borderRadius:90,
        borderWidth:2,
        borderColor:"white",
        alignItems:"center"
    },
    sold: {
        flex: 1,
        textAlign: "left",
        fontSize: 20,
        color: "white",
    },
});
