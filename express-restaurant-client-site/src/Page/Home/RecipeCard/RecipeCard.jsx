import SectionTitle from "../../../Components/Section/SectionTitle";
import cardImag from "../../../assets/menu/salad-bg.jpg"

const RecipeCard = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"---Should Try---"}
                Heading={"CHEF RECOMMENDS"}
            ></SectionTitle>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                <div className=" w-96 bg-[#f3f3f3]">
                    <figure className="px-10 pt-10">
                        <img src={cardImag} alt="" className="" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <button className="btn btn-outline border-0 border-b-4">add to cart</button>
                        </div>
                    </div>
                </div>

                <div className=" w-96 bg-[#f3f3f3] ">
                    <figure className="px-10 pt-10">
                        <img src={cardImag} alt="" className="" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <button className="btn btn-outline border-0 border-b-4">add to cart</button>
                        </div>
                    </div>
                </div>

                <div className=" w-96 bg-[#f3f3f3] ">
                    <figure className="px-10 pt-10">
                        <img src={cardImag} alt="" className="" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <button className="btn btn-outline border-0 border-b-4">add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecipeCard;