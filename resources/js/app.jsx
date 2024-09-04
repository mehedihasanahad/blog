import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
} from "react-router-dom";
import router from './admin/routes';
import axios from "axios";

window.$axios = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
});


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<RouterProvider router={router} />);
