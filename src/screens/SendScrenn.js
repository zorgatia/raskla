import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImageManipulator from "expo-image-manipulator";
import { CheckBox } from "react-native-elements";
import trakerApi from "../api/tracker";

const SendScrenn = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imgcrod, setImgcrod] = useState(null);
    const [imgurl, setImgurl] = useState(null);
    const [chek, setChek] = useState("Plastic");

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const takePic = async () => {
        console.log("take pic");
        // console.log(await camera.getAvailablePictureSizesAsync("1:1"))

        if (camera) {
            let photo = await camera.takePictureAsync({ base64: true });
            let mod = await ImageManipulator.manipulateAsync(
                photo.uri,
                [
                    {
                        crop: {
                            originX: photo.width / 4,
                            originY: 0,
                            width: photo.width / 2,
                            height: photo.height,
                        },
                    },
                ],
                {
                    compress: 0.5,
                    format: ImageManipulator.SaveFormat.JPEG,
                    base64: true,
                },
            );
            console.log(mod.uri);
            setImgcrod(mod);
        }
    };

    const uploadPic = async () => {
        let base64Img = `data:image/jpg;base64,${imgcrod.base64}`;
        let apiUrl = "https://api.cloudinary.com/v1_1/dov1qarzt/image/upload";
        let data = {
            file: base64Img,
            upload_preset: "facerecog",
        };
        console.log("sending");
        setLoading(true);
        fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
        })
            .then(async (r) => {
                let data = await r.json();
                console.log(data.secure_url);
                const config = {
                    headers: {
                        "Content-Type": "Application/json",
                    },
                };
                const body = JSON.stringify({ image:data.secure_url, product:chek });
                const response = await trakerApi.post(`/mob/data/publish/${await AsyncStorage.getItem("idUser")}`, body, config);
                
                setImgcrod(null);
                
                navigation.navigate("Vote");
                //updateUserImage(data.secure_url);
                //setLoading(false);
                //navigation.navigate("Account");
            })
            .catch((err) => console.log(err));
    };
    if (hasPermission === null) {
        return <View></View>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return imgcrod !== null ? (
        <View style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 30, marginTop: 40 }}>
                2- Choose the type of Bottle
            </Text>
            <Image
                style={{ flex: 7, resizeMode: "contain" }}
                source={{ uri: imgcrod.uri }}
            ></Image>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <CheckBox
                    center
                    title="Plastic"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={chek === "Plastic"}
                    onPress={() => setChek("Plastic")}
                />
                <CheckBox
                    center
                    title="Can"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={chek === "Can"}
                    onPress={() => setChek("Can")}
                />
                <CheckBox
                    center
                    title="Glass"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={chek === "Glass"}
                    onPress={() => setChek("Glass")}
                />
            </View>

            <View
                style={{
                    flex: 1,

                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        backgroundColor: "#999",
                        borderRadius: 150 / 2,
                    }}
                    onPress={() => {
                        uploadPic();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 27,
                            marginBottom: 10,
                            color: "white",
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                    >
                        {" "}
                        Comfirm{" "}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        alignContent: "center",
                        backgroundColor: "#999",
                        borderRadius: 150 / 2,
                    }}
                    onPress={() => {
                        setImgcrod(null);
                    }}
                >
                    <Text
                        style={{
                            fontSize: 27,
                            marginBottom: 10,
                            color: "white",
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                    >
                        {" "}
                        Retake Picture{" "}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 30 }}>1- Pick a photo of Bottle</Text>
            <Camera
                style={{ flex: 0.65 }}
                type={Camera.Constants.Type.back}
                ratio="4:3"
                pictureSize="720x720"
                ref={(ref) => setCamera(ref)}
            >
                <View style={{ flex: 4, flexDirection: "row" }}>
                    <View
                        style={{ flex: 1, backgroundColor: "#0e0e0e80" }}
                    ></View>
                    <View
                        style={{ flex: 1, backgroundColor: "transparent" }}
                    ></View>
                    <View
                        style={{ flex: 1, backgroundColor: "transparent" }}
                    ></View>
                    <View
                        style={{ flex: 1, backgroundColor: "#0e0e0e80" }}
                    ></View>
                </View>
            </Camera>
            <View
                style={{
                    flex: 0.2,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignSelf: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 0.3,
                        alignSelf: "center",
                        alignItems: "center",
                        backgroundColor: "#999",
                        borderRadius: 150 / 2,
                    }}
                    onPress={() => {
                        takePic();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 27,
                            marginBottom: 10,
                            color: "white",
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                    >
                        Take Picture
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SendScrenn;

const styles = StyleSheet.create({});
