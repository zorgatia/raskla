import React, { useState, useEffect,useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Context as AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
const CameraScreen = ({navigation}) => {
    const {  updateUserImage } = useContext(AuthContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [loading, setLoading] = useState(false)

    const takePic = async () => {
        console.log("take pic")
       // console.log(await camera.getAvailablePictureSizesAsync("1:1"))
        
        if (camera) {
          let photo = await camera.takePictureAsync({ base64: true });
          let base64Img = `data:image/jpg;base64,${photo.base64}`;
          let apiUrl = "https://api.cloudinary.com/v1_1/dov1qarzt/image/upload";
          let data = {
            file: base64Img,
            upload_preset: "facerecog",
          };
          console.log("sending")
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
              updateUserImage(data.secure_url);
              setLoading(false);
              navigation.navigate('Account');
            })
            .catch((err) => console.log(err));
        }
      };
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
    return loading?<Loading></Loading>: (
        <View style={{ flex: 1,justifyContent: 'flex-end' }}>
			
            <Camera style={{ flex: 0.6  }} type={Camera.Constants.Type.front} ratio="4:3" pictureSize="720x720" ref={(ref) => setCamera(ref)}>
               </Camera>
               <View
                    style={{
                        flex: 0.2,
                        backgroundColor: "transparent",
						flexDirection: "row",
                        alignSelf:"center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 0.3,
                            alignSelf: "center",
							alignItems: "center",
							backgroundColor:"#999",
							borderRadius: 150/2
                        }}
                        onPress={() => {
                            takePic()
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 27,
                                marginBottom: 10,
								color: "white",
								textAlign:"center",
								textAlignVertical:"center"
                            }}
                        >Take Picture
                        </Text>
                    </TouchableOpacity>
                </View>
            
        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({});
