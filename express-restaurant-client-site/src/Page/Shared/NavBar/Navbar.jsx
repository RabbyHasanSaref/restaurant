import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../Providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin/useAdmin";

const Navbar = () => {
    const { user, logoutUser } = useContext(authContext);
    const [isAdmin] = useAdmin();
    const [carts] = useCart();


    const logout = () => {
        logoutUser()
            .then(() => { })
            .catch((error) => {
                console.error(error)
            })
    }

    const navOption = <>
        <li className="mr-5"><Link to="/">Home</Link></li>
        <li className="mr-5"><Link to="/menu">Our Menu</Link></li>
        <li className="mr-5"><Link to="/order/salad">Order Food</Link></li>
        {
            user && isAdmin && <li className="mr-5"><Link to="/dashboard/adminhome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li className="mr-5"><Link to="/dashboard/userhome">Dashboard</Link></li>
        }
    </>
    return (
        <div>
            <div className="navbar fixed z-50 max-w-screen-xl bg-opacity-20 bg-gray-500">
                <div className="navbar-start">
                    <div className="dropdown text-white">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black bg-base-100 rounded-box w-52">
                            {navOption}
                        </ul>
                    </div>
                    <a className="text-xl text-white font-semibold cursor-pointer">Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex text-white">
                    <ul className="menu menu-horizontal px-1">
                        {navOption}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/dashboard/cart">
                        <button className="btn mr-5">
                            <FaShoppingCart className="text-2xl"></FaShoppingCart>
                            <div className="badge">{carts.length}</div>
                        </button>
                    </Link>
                    {
                        user ? <buttom className="btn" onClick={logout}><Link>Log Out</Link></buttom> : <button className="btn"><Link to="/login">Login</Link></button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;