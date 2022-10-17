import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import books from "./bookSlice";

export default configureStore({
    reducer:{
        books,
    }
});