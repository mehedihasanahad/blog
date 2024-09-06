import {
    createBrowserRouter,
} from "react-router-dom";

import Error from '../error/404.jsx';
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Posts = lazy(() => import('../pages/Blog'));
const CreatePost = lazy(() => import('../pages/CreateBlog'));
const Category = lazy(() => import('../pages/Category'));
const CreateCategory = lazy(() => import('../pages/CreateCategory'));

const router = createBrowserRouter([
    {
        path: "/admin/",
        Component: lazy(() => import('../layout')),
        errorElement: <Error/>,
        children: [
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                ),
                // Component: await lazy(() => import('../pages/Dashboard'))
            },
            {
                path: 'posts',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Posts />
                    </Suspense>
                ),
            },
            {
                path: 'posts/create',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreatePost />
                    </Suspense>
                ),
            },
            {
                path: 'categories',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Category />
                    </Suspense>
                ),
            },
            {
                path: 'categories/create',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreateCategory />
                    </Suspense>
                ),
            },
        ]
    }
], {
    // basename: 'admin'
});

export default router;
