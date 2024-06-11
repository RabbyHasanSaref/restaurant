
const ItmeMenu = ({ populerItme }) => {
    const { name, recipe, image, price } = populerItme;
    return (
        <div>
            <div className="flex space-x-4">
                <img className="w-[104px]" style={{ borderRadius: "0 200px 200px 200px" }} src={image} alt="" />
                <div>
                    <h2 className="text-xl uppercase">{name} ------------</h2>
                    <p>{recipe}</p>
                </div>
                <p className="text-orange-500">${price}</p>
            </div>
        </div>
    );
};

export default ItmeMenu;