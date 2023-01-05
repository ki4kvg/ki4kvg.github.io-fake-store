import React from 'react';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {createRoot} from "react-dom/client";

const store = setupStore();

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<Provider store={store}><App/></Provider>)
