import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../Hooks/useCart";
import useAxios from "../../../Hooks/useAxios";
import useAuthContext from "../../../Hooks/useAuthContext";
import Swal from "sweetalert2";


const Checkout = () => {
    const [transction, setTransction] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [Error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuthContext();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecuer = useAxios();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecuer.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecuer, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log(['[error]', error]);
            setError(error.message)
        }
        else {
            console.log(['[PaymentMethod]', paymentMethod]);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Not Data',
                    name: user?.displayName || 'Not Data'
                }
            }
        })

        if (confirmError) {
            console.log('confirm payment error', confirmError);
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                console.log('your transction id:', paymentIntent.id);
                setTransction(paymentIntent.id);

                // payment data save database 
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: transction.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'panding'
                }

                const res = await axiosSecuer.post('/payments', payment)
                console.log(res.data)
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Thanks Your Payment Done",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn bg-orange-500" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500">{Error}</p>
                {
                    transction && <p className="text-green-500">your transction id: {transction}</p>
                }
            </form>
        </div>
    );
};

export default Checkout;