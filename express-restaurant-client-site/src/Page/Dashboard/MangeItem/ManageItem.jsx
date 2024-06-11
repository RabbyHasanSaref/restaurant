import SectionTitle from "../../../Components/Section/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const ManageItem = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecuer = useAxios();


    // delete 
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                axiosSecuer.delete(`/menu/${item._id}`)
                    .then(res => {
                        refetch();
                        console.log(res.data)
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
        <div>
            <SectionTitle
                subHeading="---Hurry Up!---"
                Heading="MANAGE ALL ITEMS"
            ></SectionTitle>

            <div className="p-5">
                <div className="flex">
                    <div>
                        <h2 className="text-2xl font-semibold uppercase">Total Items: {menu.length}</h2>
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
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id} className="text-center">
                                    <td>{index + 1}</td>
                                    <td><img src={item.image} alt="" className="w-[100px]" /></td>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/update/${item._id}`}><button className="btn bg-green-500">Update</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn bg-red-500">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;