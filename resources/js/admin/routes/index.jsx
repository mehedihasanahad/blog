import {
    createBrowserRouter,
} from "react-router-dom";

import Error from '../error/404.jsx';
import {lazy} from "react";

const router = createBrowserRouter([
    {
        path: "/admin/",
        Component: lazy(() => import('../layout')),
        errorElement: <Error/>,
        children: [
            {
                path: 'dashboard',
                Component: lazy(() => import('../pages/Dashboard'))
            },
            {
                path: 'blogs',
                Component: lazy(() => import('../pages/Blog'))
            }
        ]
    }
]);

export default router;
