import "antd/dist/reset.css";
import "./css/app.css";
import "./i18n.ts";
import  "./config/axiosDefualt";
import ReactDOM from 'react-dom/client'
import  {Provider} from "react-redux";
import store from "./store/index.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppRouters from "./routes/routes.tsx";
const browserRoute = createBrowserRouter(AppRouters);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <RouterProvider router={browserRoute}/>
  </Provider>
)

// import reportWebVitals from './reportWebVitals';

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
