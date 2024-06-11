import { FaCalendar, FaHome, FaWallet, FaShoppingCart, FaStreetView, FaAd, FaVoicemail, FaUser, FaList, FaBook } from "react-icons/fa";
import { FiMenu, FiShoppingBag } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import { Helmet } from "react-helmet-async";
import useAdmin from "../Hooks/useAdmin/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    const [isAdmin] = useAdmin();

    return (
        <>
            <Helmet>
                <title>Restaurant || Dashboard</title>
            </Helmet>
            <div className="flex gap-5">
                <div className="w-64 min-h-screen bg-orange-500">
                    <div className="text-center my-5 p-2">
                        <h2 className="text-xl font-semibold uppercase">Express Restaurant</h2>
                        <p className="text-xs uppercase font-semibold">Restaurant Dashboard</p>
                    </div>
                    <ul className="menu uppercase p-2">
                        {
                            isAdmin ? <>
                                <li className="mb-3">
                                    <NavLink to="/dashboard/adminhome">
                                        <FaUser></FaUser>
                                        dashboard
                                    </NavLink>
                                </li>

                                <li className="mb-3">
                                    <NavLink to="/dashboard/additem">
                                        <FaAd></FaAd>
                                        Add Items
                                    </NavLink>
                                </li>

                                <li className="mb-3">
                                    <NavLink to="/dashboard/manageitem">
                                        <FaList></FaList>
                                        Manage Items
                                    </NavLink>
                                </li>

                                <li className="mb-3">
                                    <NavLink>
                                        <FaBook></FaBook>
                                        Manage Bookings
                                    </NavLink>
                                </li>

                                <li className="mb-3">
                                    <NavLink to="/dashboard/users">
                                        <FaUser></FaUser>
                                        All Users
                                    </NavLink>
                                </li>
                            </>
                                :
                                <>
                                    <li className="mb-3">
                                        <NavLink to="/dashboard/userhome">
                                            <FaUser></FaUser>
                                            dashboard
                                        </NavLink>
                                    </li>

                                    <li className="mb-3">
                                        <NavLink to="/dashboard/pay">
                                            <FaCalendar></FaCalendar>
                                            reservation
                                        </NavLink>
                                    </li>

                                    <li className="mb-3">
                                        <NavLink to="/dashboard/paymenthistory">
                                            <FaWallet></FaWallet>
                                            payment history
                                        </NavLink>
                                    </li>

                                    <li className="mb-3">
                                        <NavLink to="/dashboard/cart">
                                            <FaShoppingCart></FaShoppingCart>
                                            my cart ({cart.length})
                                        </NavLink>
                                    </li>

                                    <li className="mb-3">
                                        <NavLink>
                                            <FaStreetView></FaStreetView>
                                            add review
                                        </NavLink>
                                    </li>
                                    <li className="mb-3">
                                        <NavLink>
                                            <FaAd></FaAd>
                                            my booking
                                        </NavLink>
                                    </li>
                                </> 
                        }
                        {/* shared nav links  */}
                        <div className="divider"></div>
                        <ul className="menu uppercase">
                            <li className="mb-3">
                                <NavLink to="/">
                                    <FaHome></FaHome>
                                    home
                                </NavLink>
                            </li>

                            <li className="mb-3">
                                <NavLink to="/menu">
                                    <FiMenu ></FiMenu>
                                    menu
                                </NavLink>
                            </li>

                            <li className="mb-3">
                                <NavLink to="/order/salad">
                                    <FiShoppingBag ></FiShoppingBag>
                                    shop
                                </NavLink>
                            </li>

                            <li className="mb-3">
                                <NavLink>
                                    <FaVoicemail ></FaVoicemail>
                                    contact
                                </NavLink>
                            </li>
                        </ul>
                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;