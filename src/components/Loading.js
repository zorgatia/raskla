import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Asset } from 'expo-asset'

const Loading = () => {
    return (
        <View style={{flex:1, justifyContent:"center"}}>
            <Image
            style={styles.image}
            source={{uri:Asset.fromModule(require('../../assets/load.gif')).uri}}
          ></Image>
        <Text style={styles.text}>Loading ...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    image:{
        flex:0.5,
        alignContent:"center",
        alignSelf:"center",
        alignSelf:"center",
        aspectRatio: 1, 
        resizeMode: 'contain',
       
        
    },
    text:{
        
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:50,
        color:"#329d7d",
        
    }
})
