import {
    createBrowserRouter,
} from "react-router-dom";

import Error from '../error/404.jsx';
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import('../pages/Dashboard'));

// Post pages
const Posts = lazy(() => import('../pages/post/Blog'));
const CreatePost = lazy(() => import('../pages/post/CreateBlog'));
const EditPost = lazy(() => import('../pages/post/EditBlog'));

// Category pages
const Category = lazy(() => import('../pages/category/Category'));
const CreateCategory = lazy(() => import('../pages/category/CreateCategory'));
const EditCategory = lazy(() => import('../pages/category/EditCategory'));

// Tag pages
const Tag = lazy(() => import('../pages/tag/Tag'));
const CreateTag = lazy(() => import('../pages/tag/CreateTag'));
const EditTag = lazy(() => import('../pages/tag/EditTag'));

// Login page
const Login = lazy(() => import('../pages/Login'));

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
                )
            },
            {
                path: 'posts',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Posts />
                    </Suspense>
                )
            },
            {
                path: 'posts/create',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreatePost />
                    </Suspense>
                )
            },
            {
                path: 'posts/edit/:id',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <EditPost />
                    </Suspense>
                )
            },
            {
                path: 'categories',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Category />
                    </Suspense>
                )
            },
            {
                path: 'categories/create',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreateCategory />
                    </Suspense>
                )
            },
            {
                path: 'categories/edit/:id',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <EditCategory />
                    </Suspense>
                )
            },
            {
                path: 'tags',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Tag />
                    </Suspense>
                )
            },
            {
                path: 'tags/create',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreateTag />
                    </Suspense>
                )
            },
            {
                path: 'tags/edit/:id',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <EditTag />
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '/admin/login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        )
    },
], {
    // basename: 'admin'
});

export default router;
