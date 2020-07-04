import React, { useEffect, useState, useContext } from "react";
import {Asset} from 'expo-asset';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ListItem } from "react-native-elements";
import { Context as VendingContext } from "../context/VendingContext";

const MappScreen = () => {
    const { state, fetchVendings } = useContext(VendingContext);
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState(null);
    useEffect(() => {
        if (!location) getLocationAsync();

        if (location)
            fetchVendings({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
    }, [location]);

    const getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            console.log("Permission to access location was denied");
        }

        let loc = await Location.getCurrentPositionAsync({});
        //console.log(loc);

        setLocation(loc);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={(map) => setMap(map)}
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 36.81897,
                    longitude: 10.16579,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                {state.vendings.map((v) => (
                    <Marker
						key={v._id}
						image={{uri:v.status==="ON"?Asset.fromModule(require('../../assets/green.png')).uri:Asset.fromModule(require('../../assets/red.png')).uri}}
                        coordinate={{
                            latitude: v.loc.lat,
                            longitude: v.loc.lng,
                        }}
                        title={v.region}
                        description={"asd"}
                    />
                ))}
            </MapView>

            <FlatList
                style={styles.list}
                keyExtractor={(item) => item._id}
                data={state.vendings}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={(e) =>
                                map.animateCamera(
                                    {
                                        center: {
                                            latitude: item.loc.lat,
                                            longitude: item.loc.lng,
                                        },
                                        pitch: 2,

                                        altitude: 200,
                                        zoom: 13,
                                    },
                                    5000,
                                )
                            }
                        >
                            <ListItem
                                key={item._id}
                                chevron
                                title={
                                    item.adress +
                                    " - " +
                                    item.region.toUpperCase()
                                }
                                badge={{
                                    value: ` ${item.dist} km `,
                                    textStyle: { color: "white" },
									containerStyle: { marginTop: -20},
									badgeStyle:{backgroundColor:"#329d7d"}
                                }}
                            ></ListItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default MappScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
    },
    list: {
        width: Dimensions.get("window").width,
    },
});
