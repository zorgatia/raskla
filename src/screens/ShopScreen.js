import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Image,
} from "react-native";
import { Card } from "galio-framework";
import Carousel from "react-native-snap-carousel";
import { Button } from "react-native-elements";
import { Asset } from "expo-asset";
import Sold from "../components/Sold";

const ShopScreen = ({ navigation }) => {
    let { width } = Dimensions.get("window");
    const [tel, setTel] = useState([
        {
            title: "Telecom 1DT",
            image: Asset.fromModule(require("../../assets/tel_1.png")).uri,
            cost: 100,
        },
        {
            title: "Telecom 5DT",
            image: Asset.fromModule(require("../../assets/tel_5.png")).uri,
            cost: 450,
        },
        {
            title: "Telecom 10DT",
            image: Asset.fromModule(require("../../assets/tel_10.png")).uri,
            cost: 800,
        },
    ]);
    const [ore, setOre] = useState([
        {
            title: "Ooredoo 1DT",
            image: Asset.fromModule(require("../../assets/oree_1.png")).uri,
            cost: 100,
        },
        {
            title: "Ooredoo 5DT",
            image: Asset.fromModule(require("../../assets/oree_5.png")).uri,
            cost: 450,
        },
        {
            title: "Ooredoo 10DT",
            image: Asset.fromModule(require("../../assets/oree_10.png")).uri,
            cost: 800,
        },
    ]);
    const [org, setOrg] = useState([
        {
            title: "Orange 1DT",
            image: Asset.fromModule(require("../../assets/orange_1.png")).uri,
            cost: 100,
        },
        {
            title: "Orange 5DT",
            image: Asset.fromModule(require("../../assets/orange_5.png")).uri,
            cost: 450,
        },
        {
            title: "Orange 10DT",
            image: Asset.fromModule(require("../../assets/orange_10.png")).uri,
            cost: 800,
        },
    ]);
    const [active, setActive] = useState(0);
    const [carousel, setCarousel] = useState(null);
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={styles.images}
                    source={{ uri: item.image }}
                ></Image>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#329d7d",
                        textAlign: "center",
                    }}
                >
                    {item.cost} raskla points
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={{ flex: 1, paddingTop: 10, justifyContent: "space-evenly" }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 10,
                }}
            >
                <Carousel
                    firstItem={1}
                    ref={(c) => {
                        setCarousel(c);
                    }}
                    data={tel}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width / 2}
                    // onSnapToItem={(index) => setActive(index)}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 10,
                }}
            >
                <Carousel
                    firstItem={1}
                    ref={(c) => {
                        setCarousel(c);
                    }}
                    data={org}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width / 2}
                    //onSnapToItem={(index) => setActive(index)}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 10,
                }}
            >
                <Carousel
                    firstItem={1}
                    ref={(c) => {
                        setCarousel(c);
                    }}
                    data={ore}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width / 2}
                    //onSnapToItem={(index) => setActive(index)}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <Button
                    title="Scan"
                    titleStyle={{fontSize:25}}
                    onPress={() => navigation.navigate("Scan")}
                ></Button>
                <Button
                    title="Play"
                    titleStyle={{fontSize:25}}
                    onPress={() => navigation.navigate("Send")}
                ></Button>
            </View>
        </SafeAreaView>
    );
};

export default ShopScreen;

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },

    images: {
        resizeMode: "contain",
        height: "80%",
    },
});

/*
 <Card
                    borderless
                    flex
                    style={styles.card}
                    title={
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {item.title}
                        </Text>
                    }
                    imageStyle={styles.imagecard}
                    image={item.image}
                    location={
                        <Text style={{ fontSize: 17, color: "#329d7d" }}>
                            {item.cost} raskla points
                        </Text>
                    }
                />*/
