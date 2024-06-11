import { FaDeleteLeft } from "react-icons/fa6";
import SectionTitle from "../../../Components/Section/SectionTitle";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, itme) => total + itme.price, 0);

    const axiosSecuer = useAxios();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecuer.delete(`/carts/${id}`)
                    .then(res => {
                        refetch()
                        // console.log(res)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <section>
            <SectionTitle
                subHeading="---My Cart---"
                Heading="WANNA ADD MORE?"
            ></SectionTitle>

            <div className="p-5">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold uppercase">Total orders: {cart.length}</h2>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold uppercase">total price: ${totalPrice}</h2>
                    </div>
                    <div>
                        {
                            cart.length ? <Link to="/dashboard/pay">
                                <button className="btn bg-orange-500 uppercase text-white">Pay</button>
                                </Link> :
                                <button disabled={!cart.length} className="btn bg-orange-500 uppercase text-white">Pay</button>
                        }
                    </div>
                </div>

                <div className="overflow-x-auto mt-2">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-orange-500 text-white">
                            <tr className="text-center">
                                <th>Sl</th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart.map((itme, idx) => <tr key={itme._id} className="text-center">
                                    <th>
                                        {
                                            idx + 1
                                        }
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={itme.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{itme.name}</td>
                                    <td>${itme.price}</td>
                                    <th><button onClick={() => handleDelete(itme._id)} className="text-3xl text-red-500"><FaDeleteLeft></FaDeleteLeft></button></th>
                                </tr>)
                            }
                            {/* row 2 */}
                            {/* <tr className="text-center">
                                <th>
                                    2
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td> <p> Zemlak, Daniel and Leannon</p></td>
                                <td>$14.5</td>
                                <th><button className="text-3xl text-red-500"><FaDeleteLeft></FaDeleteLeft></button></th>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Cart;