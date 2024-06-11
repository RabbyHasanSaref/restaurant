import Swal from "sweetalert2";
import useAuthContext from "../../Hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import useCart from "../../Hooks/useCart";


const CardFood = ({ itme }) => {
    const { name, recipe, image, price, _id} = itme;
    const { user } = useAuthContext();

    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecuer = useAxios();
    const [, refetch] = useCart();

    const handelAddCart = food => {
        // console.log(food, user.email)
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                recipe,
                image,
                price
            }
            axiosSecuer.post('/carts', cartItem)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${name} Add To Cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();
                }
            })
        }
        else {
            Swal.fire({
                title: "You are not login?",
                text: "please login to add to cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                   navigate('/login', {state: {from: location}})
                }
            });
        }
    }
    return (
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                <div className=" w-96 bg-[#f3f3f3]">
                    <figure className="px-10 pt-10">
                        <img src={image} alt="" className="" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{name}</h2>
                        <p>{recipe}</p>
                        <div className="card-actions">
                            <button onClick={() => handelAddCart(itme)} className="btn btn-outline border-0 border-b-4">add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardFood;