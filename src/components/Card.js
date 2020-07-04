import React from "react";
import { Platform, StyleSheet, Image, View } from "react-native";
import { Tile, Text } from "react-native-elements";
import Layout from "./Layout";
import { Asset } from "expo-asset";

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49; // found from https://stackoverflow.com/a/50318831/6141587

export const Card = ({ image, product }) => (
    <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        flex: 1,
                        resizeMode: "contain",
                        //backgroundColor: "red",
                    }}
                    source={{
                        uri: Asset.fromModule(require("../../assets/ri.png"))
                            .uri,
                    }}
                ></Image>
                <Text style={{fontSize:20,textAlign:"center",fontWeight:"bold",color:"#d0021b"}}>NO</Text>
            </View>

            <Text style={styles.title} h3>
                {product.toUpperCase()}
            </Text>
            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        flex: 1,
                        resizeMode: "contain",
                        //backgroundColor: "red",
                    }}
                    
                    source={{
                        uri: Asset.fromModule(require("../../assets/left.png"))
                            .uri,
                    }}
                ></Image>
                <Text style={{fontSize:20,textAlign:"center",fontWeight:"bold",color:"#66cc33"}}>YES</Text>
            </View>
        </View>

        <Image
            style={styles.imageContainer}
            resizeMode="contain"
            source={{ uri: image }}
        ></Image>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    imageContainer: {
        //backgroundColor: "red",
        width: Layout.window.width - 10,
        height: Layout.window.height - 20,
        borderRadius: 30,
        flex: 6,
        //overflow: "hidden",
        resizeMode: "contain",
    },
    title: {
        color: "black",
        flex: 2,
        textAlign: "center",
        alignSelf: "center",
    },
});

/*
<Tile
            imageSrc={{ uri: image }}
            imageContainerStyle={styles.imageContainer}
            imageProps={{
                resizeMode: "contain",
                borderRadius: 20,
                overflow: "hidden",
                width: Layout.window.width - 10,
                height: Layout.window.height - 30,
            }}
            activeOpacity={0.9}
            title={product}
            titleStyle={styles.title}
            //caption={caption}
            // captionStyle={styles.caption}
            containerStyle={styles.container}
            featured
        />*/
