import { Helmet } from "react-helmet-async";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularSection/PopularMenu";
import Slider from "../Slider/Slider";
import Testimonial from "../Testimonial/Testimonial";
import "./style.css"
import RecipeCard from "../RecipeCard/RecipeCard";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Restaurant || Home</title>
            </Helmet>

            {/* banner section  */}
            <Slider></Slider>

            {/* category section  */}
            <div className="my-10">
                <Category></Category>
            </div>

            <div className=" bg-image lg:h-[400px] py-32">
                <div className="lg:w-[800px] w-[300px] mx-auto bg-white text-center lg:p-10 p-5">
                    <h2 className="text-2xl mb-5">Bistro Boss</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>

            {/* menu section  */}
            <div>
                <PopularMenu></PopularMenu>
            </div>

            <div className="lg:h-[300px] h-[150px] bg-black">
                <h2 className="lg:text-3xl text-white text-center lg:py-36 py-16">Call Us: +88 0192345678910</h2>
            </div>

            {/* recipe card  */}
            <RecipeCard></RecipeCard>

            {/* featured section  */}
            <div>
                <Featured></Featured>
            </div>

            {/* testimonial section  */}
            <div>
                <Testimonial></Testimonial>
            </div>
        </div>
    );
};

export default Home;