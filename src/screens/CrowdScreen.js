import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DeckSwiper, Block } from "galio-framework";
import { Context as AuthContext } from "../context/AuthContext";
import { Button } from "react-native-elements";

const elements = [
    <View style={{ backgroundColor: "#B23AFC" }}>
        <Text>You wanna see a cool component?</Text>
        <Text>Galio has this cool Deck Swiper</Text>
    </View>,
    <View style={{ backgroundColor: "#FE2472", height: 250, width: 250 }}>
        <Text>What did you expect?</Text>
        <Text>This React Native component works perfectly</Text>
    </View>,
    <View style={{ backgroundColor: "#FF9C09", height: 250, width: 250 }}>
        <Text>Maybe you want to build the next Tinder</Text>
    </View>,
    <View style={{ backgroundColor: "#45DF31", height: 250, width: 250 }}>
        <Text>or maybe you just want a nice deck swiper component</Text>
        <Text>Galio has everything sorted out for you</Text>
    </View>,
];

const CrowdScreen = ({navigation}) => {

    return (
        <View style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate('Send')} title="Start">
                {" "}
            </Button>
        </View>
    );
};

export default CrowdScreen;

const styles = StyleSheet.create({});
