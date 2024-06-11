import SectionTitle from "../../../Components/Section/SectionTitle";
import featured from "../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <section className="featured bg-fixed my-10 text-white py-16 px-8">
            <SectionTitle
                subHeading={"---Check it out---"}
                Heading={"FROM OUR MENU"}
            ></SectionTitle>

            <div className="flex lg:flex-row flex-col justify-center items-center py-20 lg:px-20 bg-gray-500 bg-opacity-30">
                <img className="lg:w-[600px] w-[300px]" src={featured} alt="" />
                <div className="space-y-2 ml-5">
                    <p className="text-xl">March 20, 2023</p>
                    <p className="text-2xl">WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>

                    <button className="btn btn-outline border-0 border-b-4 text-white">Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;