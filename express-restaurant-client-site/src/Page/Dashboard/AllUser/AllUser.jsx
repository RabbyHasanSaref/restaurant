import { FaDeleteLeft } from "react-icons/fa6";
import SectionTitle from "../../../Components/Section/SectionTitle";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const AllUser = () => {
    const axiosSecuer = useAxios();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecuer.get('/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data
        }
    })

    const handleMakeAdmin = (id) => {
        axiosSecuer.patch(`/users/admin/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${id.name} is an admin now !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

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

                axiosSecuer.delete(`/users/${id}`)
                    .then(res => {
                        refetch();
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
                subHeading="---How many??---"
                Heading="MANAGE ALL USERS"
            ></SectionTitle>
            <div className="p-5">
                <div className="flex">
                    <div>
                        <h2 className="text-2xl font-semibold uppercase">Total users: {users.length}</h2>
                    </div>
                </div>

                <div className="overflow-x-auto mt-2">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-orange-500 text-white">
                            <tr className="text-center">
                                <th>Sl</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                       
                            {/* row 2 */}
                            {
                                users.map((user, idx) => <tr key={user._id} className="text-center">
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ?
                                                <>
                                                    <button>Admin</button>
                                                </> :
                                                <>
                                                    <button onClick={() => handleMakeAdmin(user._id)}>Role</button>
                                                </>
                                        }
                                    </td>
                                    <th><button onClick={() => handleDelete(user._id)} className="text-3xl text-red-500"><FaDeleteLeft></FaDeleteLeft></button></th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AllUser;