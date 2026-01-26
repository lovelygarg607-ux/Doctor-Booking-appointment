import { configureStore } from "@reduxjs/toolkit";
import { Doctorreducer } from "./Reducers.js";

const Store = configureStore({
   reducer:Doctorreducer
})

export default Store;