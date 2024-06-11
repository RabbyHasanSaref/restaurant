import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Page/Shared/NavBar/Navbar";
import Footer from "../Page/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    const noHeadingFoorter = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div>
            {
                noHeadingFoorter || <Navbar></Navbar>
            }
            <Outlet></Outlet>
            {
                noHeadingFoorter || <Footer></Footer>
            }
        </div>
    );
};

export default Main;