import user from "./slice/userSlice";
import {configureStore} from "@reduxjs/toolkit";

const buildStore = () => {
    return configureStore({
        reducer: {
            user
        }
    });
}

const blog = buildStore();

export default blog;