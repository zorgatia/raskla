import React, { useEffect, useState,useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    SafeAreaView,
} from "react-native";
import Loading from "../components/Loading";
import trakerApi from "../api/tracker";
import { Card } from "../components/Card";
import Swiper from "react-native-deck-swiper";
import { Context as AuthContext } from "../context/AuthContext";





const VoteScreen = ({navigation}) => {
    const { submitVote } = useContext(AuthContext);
    const [elements, setElements] = useState(null);
    const [votes, setVotes] = useState([]);
    const [count, setCount] = useState(0);

    
    useEffect(() => {
        (async () => {
            const photo = await trakerApi.get(
                `mob/data/${await AsyncStorage.getItem("idUser")}`,
            );
            
            console.log(photo.data);
            if(photo.data.length===0) navigation.navigate("Shop");
            setElements(photo.data);
        })();
    }, []);
    return elements === null ? (
        <Loading></Loading>
    ) : (
        <SafeAreaView style={styles.container}>
            <Swiper
                cards={elements}
                renderCard={Card}
                //infinite // keep looping cards infinitely
                backgroundColor="white"
                cardHorizontalMargin={0}
                stackSize={1} // number of cards shown in background
                onSwipedLeft={(i) => setVotes([...votes, { data: elements[i]._id, vote: "NO" }])}
                onSwipedRight={(i) => setVotes([...votes, { data: elements[i]._id, vote: "YES" }])}
                onSwipedAll={() => submitVote(votes)}
            />
        </SafeAreaView>
    );
};

export default VoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
});

/*
 <View style={{ flex: 1 }}>
            <Text>Helloaa</Text>
            <Block style={{ flex: 1 }}>
                <DeckSwiper
                    onSwipeRight={() => votee("right")}
                    onSwipeLeft={() => votee("left")}
                    components={els(elements)}
                />
            </Block>
        </View>
*/
