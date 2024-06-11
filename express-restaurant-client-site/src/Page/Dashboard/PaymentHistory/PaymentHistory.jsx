import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/Section/SectionTitle";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxios from "../../../Hooks/useAxios";


const PaymentHistory = () => {
    const {user} = useAuthContext();
    const axiosSecuer = useAxios();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecuer.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle
                subHeading="Payment Now!"
                Heading="Payment History"
            ></SectionTitle>

            <div className="p-5">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold uppercase">Total Payments: {payments.length}</h2>
                    </div>
                </div>

                <div className="overflow-x-auto mt-2">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-orange-500 text-white">
                            <tr className="text-center">
                                <th>Sl</th>
                                <th>Email</th>
                                <th>Transaction</th>
                                <th>Total Price</th>
                                <th>Payment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                         {
                            payments.map((payment, index) =>    <tr key={payment._id} className="text-center">
                            <td>{index +1}</td>
                            <td>{payment.email}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.price}</td>
                            <td>{payment.date}</td>
                            <td>{payment.status}</td>
                            </tr>)
                         }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;