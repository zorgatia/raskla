import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trakerApi from "../api/tracker";
import { navigate } from "../navigationRef";
const AuthReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "add_error":
            return { ...state, errors: payload };
        case "register":
            return { errors: "", user: payload };
        case "login":
            return { errors: "", user: payload };
        case "loginfb":
            return { errors: "", user: payload, facebook: true };
        case "logout":
            return { user: null, errors: "", facebook: false };
        case "userface":
            return { ...state, user: { ...state.user, image: payload } };
        case "qr_code":
            return { ...state, qr_error: "success" , user: {...state.user,credit:payload} };
        case "vote":
        return { ...state, user: {...state.user,credit:payload} };
        case "qr_error":
            return { ...state, qr_error: payload };
        default:
            return state;
    }
};

const register = (dispatch) => async ({ email, password }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };
        const body = JSON.stringify({ email, password });
        const response = await trakerApi.post("/mob/user", body, config);
        await AsyncStorage.setItem("idUser", response.data._id);
        dispatch({ type: "register", payload: response.data });
        navigate("Root",{screen: 'Shop'});

    } catch (err) {
        dispatch({ type: "add_error", payload: "errror register" });

        console.log(err.response.data);
    }
};

const login = (dispatch) => async ({ email, password }) => {
    try {
        console.log(123);
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };
        const body = JSON.stringify({ email, password });
        const response = await trakerApi.post("/mob/auth", body, config);
        console.log(response.data);

        await AsyncStorage.setItem("idUser", response.data._id);

        dispatch({ type: "login", payload: response.data });
        navigate("Root",{screen: 'Shop'});

    } catch (err) {
        dispatch({ type: "add_error", payload: "errror register" });
        console.log(err.response.data);
    }
};

const tryLocalLogin = (dispatch) => async () => {
    const idUser = await AsyncStorage.getItem("idUser");
    if (idUser) {
        console.log("trylocal");
        console.log(idUser);
        const response = await trakerApi.get(`/mob/auth/${idUser}`);

        console.log(response.data);
        dispatch({ type: "login", payload: response.data });
        navigate("Root",{screen: 'Shop'});

    } else {
        navigate("Login");
    }
};

const loginFb = (dispatch) => async ({ email }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };
        const body = JSON.stringify({ email });
        const response = await trakerApi.post("/mob/auth/fb", body, config);
        console.log(response.data);

        await AsyncStorage.setItem("idUser", response.data._id);
        dispatch({ type: "loginfb", payload: response.data });
        navigate("Root",{screen: 'Shop'});
    } catch (err) {
        dispatch({ type: "add_error", payload: "errror register" });
        console.log(err.response.data);
    }
};

const updateUserImage = (dispatch) => async (image) => {
    dispatch({ type: "userface", payload: image });
};
const updateUser = (dispatch) => async ({
    lastname,
    firstname,
    username,
    birthday,
    region,
    gender,
    image,
    phone
}) => {
    try {
        const idUser = await AsyncStorage.getItem("idUser");
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };
        const body = JSON.stringify({
            lastname,
            firstname,
            username,
            birthday,
            region,
            gender,
            image,
            phone
        });
        const response = await trakerApi.post(
            `/mob/user/profile/${idUser}`,
            body,
            config,
        );
        console.log(response.data);

        dispatch({ type: "login", payload: response.data });
    } catch (err) {
        dispatch({ type: "add_error", payload: "errror register" });
        console.log(err.response.data);
    }
};

const logout = (dispatch) => async () => {
    await AsyncStorage.removeItem("user");
    dispatch({ type: "logout" });
    navigate("Login");
};

const qrCode = (dispatch) => async (qrcode) => {
    try {
        const user = await AsyncStorage.getItem("idUser");
        console.log(user);
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };
        const body = JSON.stringify({
            id: user,
            qr: qrcode,
        });
        const response = await trakerApi.post("/mob/vending/qr", body, config);
        console.log(response.data);
        dispatch({ type: "qr_code", payload: response.data.credit });
    } catch (err) {
        dispatch({ type: "qr_error", payload: "errror" });
        //console.log(err);
    }
};

const submitVote = (dispatch) => async (votes) => {
    
    const config = {
        headers: {
            "Content-Type": "Application/json",
        },
    };
    const body = JSON.stringify({votes:votes});
    const response= await trakerApi.post(`/mob/data/vote/${await AsyncStorage.getItem("idUser")}`, body, config);
    dispatch({ type: "vote", payload: response.data.credit });
    navigate("Shop");
};

export const { Provider, Context } = createDataContext(
    AuthReducer,
    {
        login,
        register,
        logout,
        tryLocalLogin,
        loginFb,
        updateUser,
        updateUserImage,
        qrCode,
        submitVote
    },
    { user: null, errors: "", facebook: false, qr_error: null },
);
