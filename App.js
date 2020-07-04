import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Context as AuthContext } from "./src/context/AuthContext";
import { Provider as VendingProvider } from "./src/context/VendingContext";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "./src/screens/AccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import MappScreen from "./src/screens/MappScreen";

import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreeen from "./src/screens/ResolveAuthScreeen";
import CameraScreen from "./src/screens/CameraScreen";
import ScanScreen from "./src/screens/ScanScreen";
import Loading from "./src/components/Loading";
import CrowdScreen from "./src/screens/CrowdScreen";
import SendScrenn from "./src/screens/SendScrenn";
import VoteScreen from "./src/screens/VoteScreen";
import { ThemeProvider } from "react-native-elements";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopScreen from "./src/screens/ShopScreen";
import Sold from "./src/components/Sold";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = () => {
    const { state } = useContext(AuthContext);
    console.log("aaaa" + state.user);
    
    return state.user!==null && (
        <Sold sold={state.user.credit}></Sold>
    );
};

const theme = {
    Button: {
        
        titleStyle: {
            color: "white",
		},
		buttonStyle:{backgroundColor:"#329d7d"}
    },
    Input:{
        labelStyle:{color:"#329d7d"}
    }
};

const Root = () => (
    <Tab.Navigator initialRouteName="Shop"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Account") {
                    iconName = focused
                        ? "face"
                        : "face-outline";
                } else if (route.name === "Mapp") {
                    iconName = focused ? "map-search" : "map-search-outline";
                }else if (route.name === "Shop") {
                    iconName = focused ? "cart" : "cart-outline";
				}
			

                // You can return any component that you like here!
                return <MaterialCommunityIcons name={iconName} size={size} color={"#329d7d"} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: "#329d7d",
            inactiveTintColor: "gray",
        }}
    >
        
        <Tab.Screen name="Mapp" component={MappScreen} options={{title:"Map"}} />
        <Tab.Screen name="Shop" component={ShopScreen} options={{title:"Store"}} />
        <Tab.Screen name="Account" component={AccountScreen} options={{title:"Account"}} />
        
    </Tab.Navigator>
);

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <VendingProvider>
                <AuthProvider>
                    <NavigationContainer 
                        ref={(navigator) => setNavigator(navigator)}
                    >
                        <Stack.Navigator >
                            <Stack.Screen 
                                name="ResolveAuth"
                                component={ResolveAuthScreeen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Camera"
                                component={CameraScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Send"
                                component={SendScrenn}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Vote"
                                component={VoteScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Scan"
                                component={ScanScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Root"
                                component={Root}
                                options={{
                                    headerTitle: (props) => (
                                        <LogoTitle {...props} />
                                    ),
                                    headerLeft: null,

                                }}

                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthProvider>
            </VendingProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
