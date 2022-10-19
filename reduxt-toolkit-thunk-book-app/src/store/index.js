import { configureStore } from "@reduxjs/toolkit";
import books from "./bookSlice";
import auth from "./authSlice"; 
import report from "./reportSlice";

export default configureStore({
    reducer:{ 
        // Can't fetch api 
        // Code is pure js 
        // can't read files 
        books, auth ,report
    },
});