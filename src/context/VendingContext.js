import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import trakerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const vendingReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "getVendings":
            return { ...state, vendings: payload, errors: "" };
        case "setVending":
            return {
                ...state,
                vending: state.vendings.find((v) => v._id === payload),
                errors: "",
            };
       
        case "add_error":
            return { ...state, errors: payload };
        default:
            return state;
    }
};
const fetchVendings = (dispatch) => async ({ lat, lng }) => {
    console.log(lng);

    try {
        const response = await trakerApi.get("/api/vending/loc", {
            params: { lat, lng },
        });
        dispatch({ type: "getVendings", payload: response.data });
    } catch (err) {
        dispatch({ type: "add_error", payload: "errror " });
        console.log(err);
    }
};



export const { Provider, Context } = createDataContext(
    vendingReducer,
    { fetchVendings },
    { vendings: [], errors: "", vending: null },
);
