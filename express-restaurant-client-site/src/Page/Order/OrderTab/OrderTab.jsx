import CardFood from "../../../Components/CardFood/CardFood";

const OrderTab = ({ itmes }) => {
    return (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            {
                itmes.map(item => <CardFood key={item._id} itme={item}></CardFood>)
            }
        </div>
    );
};

export default OrderTab;