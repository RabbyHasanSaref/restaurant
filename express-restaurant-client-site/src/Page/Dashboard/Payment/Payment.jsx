import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/Section/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";


const Payment = () => {

    // stripe public key 
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAYE);

    return (
        <section>
            <SectionTitle
            subHeading="Payment Now!"
            Heading="Payment Getwaye"
            ></SectionTitle>

            <Elements stripe={stripePromise}>
                <Checkout></Checkout>
            </Elements>
        </section>
    );
};

export default Payment;