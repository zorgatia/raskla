import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Context as AuthContext } from "../context/AuthContext";
import { Overlay, Button } from "react-native-elements";

import { Asset } from "expo-asset";

const ScanScreen = ({ navigation }) => {
    const { state, qrCode } = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleBarCodeScanned = ({ type, data }) => {
        camera.pausePreview();
        setScanned(true);
        console.log("error: " + state.qr_error);
        console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`,
        );
        qrCode(data);
    };
    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={(ref) => setCamera(ref)}
                style={{ flex: 1 }}
                ratio="16:9"
                type={Camera.Constants.Type.back}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ></Camera>

            <Overlay isVisible={scanned} height="auto">
                {state.qr_error === null ? (
                    <Text>Loading</Text>
                ) : state.qr_error === "errror" ? (
                    <View >
                        <Image  style={{height:200,resizeMode:"contain",margin:20}} source={{uri:Asset.fromModule(require('../../assets/fail.gif')).uri}}></Image>
                        <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",margin:20}}>Sorry... Invalid Qr Code</Text>
                        <Button
                            title="ReScan"
                            titleStyle={{fontSize:20}}
                            onPress={() => {
                                console.log(scanned);
                                setScanned(false);
                                camera.resumePreview();
                                state.qr_error = null;
                            }}
                ></Button>
                    </View>
                ) : (
                    <View >
                        <Image  style={{height:200,resizeMode:"contain",margin:20}} source={{uri:Asset.fromModule(require('../../assets/succ.gif')).uri}}></Image>
                        <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",margin:20}}>Success !!!</Text>
                        <Button
                            title="Finish"
                            titleStyle={{fontSize:20}}
                            onPress={() => {
                                console.log(scanned);
                                setScanned(false);
                                camera.resumePreview();
                                state.qr_error = null;
                                navigation.navigate('Shop');
                            }}
                ></Button>
                    </View>
                )}
               
                
            </Overlay>
        </View>
    );
};

export default ScanScreen;

const styles = StyleSheet.create({});
