import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Text,
    Input,
    
    Avatar,
    Overlay,
    CheckBox,
} from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const AccountScreen = ({ navigation }) => {
    const { state, logout, updateUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [genderOver, setGenderOver] = useState(false);
    useEffect(() => {
        console.log("aa");
        console.log(state);
        if (state.user) {
            setForm({
                lastname: state.user.lastname,
                firstname: !state.user.firstname ? "" : state.user.firstname,
                username: !state.user.username ? "" : state.user.username,
                birthday: !state.user.birthday
                    ? new Date().toISOString().substr(0, 10)
                    : state.user.birthday.substr(0, 10),
                region: !state.user.region ? "" : state.user.region,
                gender: !state.user.gender ? "" : state.user.gender,
                image: !state.user.image ? "" : state.user.image,
                phone: !state.user.phone ? "" : state.user.phone,
            });
        }
    }, [state.user]);
    const [form, setForm] = useState({
        lastname: "",
        firstname: "",
        username: "",
        birthday: "",
        region: "",
        gender: "",
        image: "",
        phone: "",
    });
    let {
        lastname,
        firstname,
        username,
        birthday,
        region,
        gender,
        image,
        phone,
    } = form;
    const onChange = (o) => {
        setForm({ ...form, ...o });
    };
    const onDateChange = (event, selectedDate) => {
        const currentDate =
            selectedDate.toISOString().substr(0, 10) || birthday;
        setShow(false);
        setForm({ ...form, birthday: currentDate });
    };
    const onSubmit = () => {
        updateUser({
            lastname,
            firstname,
            username,
            birthday,
            region,
            gender,
            image,
            phone
        });
    };
    return state.user === null ? (
        <View>
            <Text>asd</Text>
        </View>
    ) : (
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <View style={{ alignItems: "center" }}>
                <Avatar
                    source={{ uri: image }}
                    showEditButton
                    rounded
                    size="xlarge"
                    onEditPress={() => navigation.navigate("Camera")}
                />
            </View>

            <View>
                <View style={{ flexDirection: "row" }}>
                    <Input
                        containerStyle={{ width: "50%" }}
                        placeholder="Name"
                        label="Lastname"
                        value={lastname}
                        onChangeText={(v) => onChange({ lastname: v })}
                        leftIcon={{ type: "font-awesome", name: "user" }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                    />
                    <Input
                        containerStyle={{ width: "50%" }}
                        placeholder="firstname"
                        label="Firstname"
                        value={firstname}
                        onChangeText={(v) => onChange({ firstname: v })}
                    />
                </View>
                <View onTouchStart={() => setShow(true)}>
                    <Input
                        placeholder="Birthday"
                        label="Birthday"
                        editable={false}
                        value={birthday}
                        leftIcon={{
                            type: "font-awesome",
                            name: "birthday-cake",
                        }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                    />
                </View>
                <Input
                    placeholder="Phone"
                    label="Phone"
                    keyboardType="phone-pad"
                    value={phone}
                    leftIcon={{ type: "font-awesome", name: "phone" }}
                    leftIconContainerStyle={{ paddingRight: 10 }}
                    onChangeText={(v) => onChange({ phone: v })}
                />
                <Input
                    placeholder="Region"
                    label="Region"
                    value={region}
                    leftIcon={{ type: "font-awesome", name: "map-marker" }}
                    leftIconContainerStyle={{ paddingRight: 10 }}
                    onChangeText={(v) => onChange({ region: v })}
                />
                <View onTouchStart={() => setGenderOver(true)}>
                    <Input
                        placeholder="Gender"
                        label="Gender"
                        editable={false}
                        value={gender}
                        leftIcon={{
                            type: "font-awesome",
                            name: "venus-mars",
                        }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                    />
                </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button titleStyle={{fontSize:25}} title="Update" onPress={() => onSubmit()}></Button>
            <Button titleStyle={{fontSize:25}} title="Logout" onPress={logout}></Button>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                />
            )}
            <Overlay isVisible={genderOver} height="auto">
                <View>
                <Text h3 style={{ textAlign: "center" }}>
                    Gender
                </Text>
                <CheckBox
                    title="Female"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={gender === "Femele"}
                    onPress={() => {
                        setForm({ ...form, gender: "Femele" });
                        setGenderOver(false);
                    }}
                />
                <CheckBox
                    title="Male"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={gender === "Male"}
                    onPress={() => {
                        setForm({ ...form, gender: "Male" });
                        setGenderOver(false);
                    }}
                />
                <CheckBox
                    title="Other"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={gender === "Other"}
                    onPress={() => {
                        setForm({ ...form, gender: "Other " });
                        setGenderOver(false);
                    }}
                />
                </View>
            </Overlay>
        </View>
    );
};

//onPress={() => {console.log(birthday);}}
export default AccountScreen;

const styles = StyleSheet.create({});
