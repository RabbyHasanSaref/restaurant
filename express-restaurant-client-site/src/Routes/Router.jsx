import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home/Home";
import Main from "../Layout/Main";
import Eroor from "../Page/Shared/Error/Eroor";
import Menu from "../Page/Menu/Menu/Menu";
import Order from "../Page/Order/Order";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import ProvateRoute from "../Private/ProvateRoute";
import Demo from "../Page/Shared/Demo";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Page/Dashboard/Cart/Cart";
import AllUser from "../Page/Dashboard/AllUser/AllUser";
import AddItem from "../Page/Dashboard/AddItem/AddItem";
import ManageItem from "../Page/Dashboard/MangeItem/ManageItem";
import Update from "../Page/Dashboard/Update/Update";
import Payment from "../Page/Dashboard/Payment/Payment";
import PaymentHistory from "../Page/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Page/Dashboard/UserHome/UserHome";
import AdminHome from "../Page/Dashboard/AdminHome/AdminHome";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Eroor></Eroor>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/protect",
        element: <ProvateRoute>
          <Demo></Demo>
        </ProvateRoute>
      }
    ]
  },
  {
    path: "dashboard",
    element: <ProvateRoute><Dashboard></Dashboard></ProvateRoute>,
    children: [
      // normal user route 
      {
        path: "userhome",
        element: <UserHome></UserHome>
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "pay",
        element: <Payment></Payment>
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>
      },

      // admin user route
      {
        path: "adminhome",
        element: <AdminHome></AdminHome>
      },
      {
        path: "additem",
        element: <AddItem></AddItem>
      },
      {
        path: "manageitem",
        element: <ManageItem></ManageItem>
      },
      {
        path: "update/:id",
        element: <Update></Update>,
        loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: "users",
        element: <AllUser></AllUser>
      }
    ]
  }
]);

export default router;