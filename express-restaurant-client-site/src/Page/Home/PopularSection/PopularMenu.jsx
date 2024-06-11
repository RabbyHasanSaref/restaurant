// import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/Section/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import ItmeMenu from "../../Shared/ItmeMenu/ItmeMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(popular => popular.category === "popular");

    // const [popularItems, setPopularItem] = useState([]);
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popular = data.filter(itme => itme.category === "popular")
    //             setPopularItem(popular)
    //         })
    // }, [])
    return (
        <section className="my-10">
            <SectionTitle
                subHeading={"---Check it out---"}
                Heading={"FROM OUR MENU"}
            ></SectionTitle>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                {
                    popularItems.map(populerItme => <ItmeMenu key={populerItme._id} populerItme={populerItme}></ItmeMenu>)
                }
            </div>
            <div className="w-[200px] mx-auto mt-5">
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;