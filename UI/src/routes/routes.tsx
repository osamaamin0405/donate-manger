import LoadeComponent from "../components/utils/loadeComponent";
import { AuthLayout } from "../layout/AuthLayout";
import  MainLayout from "../layout/MainLayout";
import { Navigate, RouteObject } from "react-router-dom";
import { RequireAuth } from "../layout/RequireAuth";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice/authSlice";
import React from "react";

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ "../pages/dashboard/Home/Home"));

//===================

const AddCase = React.lazy(() => import(/* webpackChunkName: "AddCase" */ "../pages/dashboard/Case/AddCase"));
const EditCase = React.lazy(() => import(/* webpackChunkName: "EditCase" */ "../pages/dashboard/Case/EditCase"));
const AllCases = React.lazy(() => import(/* webpackChunkName: "AllCases" */ "../pages/dashboard/Case/AllCases"));
const CaseInfo = React.lazy(() => import(/* webpackChunkName: "CaseInfo" */ "../pages/dashboard/Case/Info"));
const CaseCards = React.lazy(() => import(/* webpackChunkName: "CaseCards" */ "../pages/dashboard/Case/Cards"));

//=========================================
const AddUser = React.lazy(() => import(/* webpackChunkName: "AddUser" */ "../pages/dashboard/User/AddUser"));
const EditUser = React.lazy(() => import(/* webpackChunkName: "EditUser" */ "../pages/dashboard/User/Edit"));
const AllUser = React.lazy(() => import(/* webpackChunkName: "AllUsers" */ "../pages/dashboard/User/AllUsers"));
const UserInfo = React.lazy(() => import(/* webpackChunkName: "Userinfo" */ "../pages/dashboard/User/Info"));

//================
const AddCategory = React.lazy(() => import(/* webpackChunkName: "AddCategory" */ "../pages/dashboard/Category/Add"));
const EditCategory = React.lazy(() => import(/* webpackChunkName: "EditCategory" */ "../pages/dashboard/Category/Edit"));
const AllCategories = React.lazy(() => import(/* webpackChunkName: "AllCategories" */ "../pages/dashboard/Category/All"));

//====

const AddDonation = React.lazy(() => import(/* webpackChunkName: "AddDonation" */ "../pages/dashboard/Fund/Add"));
const AddDonationList = React.lazy(() => import(/* webpackChunkName: "AddDonationList" */ "../pages/dashboard/Fund/AddList"));
const EditDonation = React.lazy(() => import(/* webpackChunkName: "EditDonation" */ "../pages/dashboard/Fund/Edit"));
const AllDonations = React.lazy(() => import(/* webpackChunkName: "AllDonation" */ "../pages/dashboard/Fund/All"));
const DonationInfo = React.lazy(() => import(/* webpackChunkName: "DonationInfo" */ "../pages/dashboard/Fund/Info"));

//======
const PageNotFound = React.lazy(() => import(/* webpackChunkName: "PageNotFound" */ "../pages/errors/404"));

//=========

const Login = React.lazy(() => import(/* webpackChunkName: "Login" */ "../pages/auth/Login"));



export  const AppRouters: RouteObject[] = [
    {
        path: "*",
        Component(){
            return (
                <Navigate to="/error/404"/>
            )
        }
    },
    {
        path: "/",
        element: <RequireAuth><MainLayout/></RequireAuth>,
        children: [
            {
                index: true,
                element: <LoadeComponent Component={Home}  /> // Home Page
            },
            {
                path: "case",
                // : redirect("/error/404"), //Retrive NotFound Page
                children:[
                    {
                        index: true,
                        path: "add",
                        element: <LoadeComponent Component={AddCase} />,
                    },
                    {
                        path: "all",
                        element: <LoadeComponent Component={AllCases}/>
                    },
                    {
                        path: "edit/:id",
                        element: <LoadeComponent Component={EditCase} />
                    },
                    {
                        path: "info/:id",
                        element: <LoadeComponent Component={CaseInfo} />
                    },
                    {
                        path: "cards",
                        element: <LoadeComponent Component={CaseCards} />
                    }
                ],
                
            },
            {
                path: "/user",
                children: [
                    {
                        path: "add",
                        element: <LoadeComponent Component={AddUser} />,
                    },
                    {
                        path: "all",
                        element: <LoadeComponent Component={AllUser}/>,
                    },
                    {
                        path: "edit/:id",
                        element: <LoadeComponent Component={EditUser}/>,
                    },
                    {
                        path: "info/:id",
                        element: <LoadeComponent Component={UserInfo} />,
                    }
                ]
            },
            {
                path: "/category",
                children: [
                    {
                        path: "add",
                        element: <LoadeComponent  Component={AddCategory} />,
                    },
                    {
                        path: "all",
                        element: <LoadeComponent  Component={AllCategories} />,
                    },
                    {
                        path: "edit/:id",
                        element: <LoadeComponent  Component={EditCategory} />,
                    }
                ]
            },
            {
                path: "/donation",
                children: [
                    {
                        path: "add/:id",
                        element: <LoadeComponent  Component={AddDonation} />,
                    },
                    {
                        path: "review/:ids",
                        element: <LoadeComponent  Component={AddDonationList} />,
                    },
                    {
                        path: "all",
                        element: <LoadeComponent  Component={AllDonations} />,
                    },
                    {
                        path: "edit/:id",
                        element: <LoadeComponent  Component={EditDonation} />,
                    },
                    {
                        path: "info/:id",
                        element: <LoadeComponent Component={DonationInfo} />,
                    }
                ]
            }
        ]
    },
    {
        path: "error",
        children:[
            {
                path: "404",
                element: <LoadeComponent Component={PageNotFound}/>
            }
        ]
    },
    {
        path:"/auth",
        element: <AuthLayout/>,
        children:[
            {
                path: "login",
                index: true, 
                element: <LoadeComponent Component={Login}  /> // Home Page
            },
            {
                path: "logout",
                Component(){
                    const dispatch = useDispatch();
                    // const user = useSelector(isAuthSelector);
                    dispatch(logOut());
                    //to refresh page and remove cookie
                    window.location.href = "/auth/login";
                    return (
                        <>
                        </>
                    )
                }
            }
        ]
    }
]


export default AppRouters;