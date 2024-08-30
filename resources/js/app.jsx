import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
} from "react-router-dom";
import router from './admin/routes';


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<RouterProvider router={router} />);
