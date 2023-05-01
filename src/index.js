import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from './context/companiesContext';
import App from "./App";

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

root.render(
    <Router >
        <Provider>
            <App />
        </Provider>
    </Router>
)
