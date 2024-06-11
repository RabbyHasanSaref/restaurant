import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';

import coverImg from "../../../assets/menu/banner3.jpg"
import coverImg2 from "../../../assets/menu/dessert-bg.jpeg"
import coverImg3 from "../../../assets/home/chef-service.jpg"
import useMenu from '../../../Hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';
import SectionTitle from '../../../Components/Section/SectionTitle';


const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(offered => offered.category === "offered");
    const dessert = menu.filter(dessert => dessert.category === "dessert");
    const pizza = menu.filter(pizza => pizza.category === "pizza");
    const salad = menu.filter(salad => salad.category === "salad");
    const soup = menu.filter(soup => soup.category === "soup");
    return (
        <div>
            <Helmet>
                <title>Restaurant || Our Menu</title>
            </Helmet>

            {/* cover section  */}
            <div className='mb-5'>
                <Cover
                    imag={coverImg}
                    title="OUR MENU"
                    subTitle="Would you like to try a dish?"
                ></Cover>
            </div>

            {/* offered section  */}
            <div>
                <SectionTitle
                    subHeading="---Don't miss---"
                    Heading="TODAY'S OFFER"
                ></SectionTitle>
                <MenuCategory
                    itmes={offered}
                ></MenuCategory>
                {/* <div className='text-center'>
                    <button className='btn btn-outline border-0 border-b-4 my-2'>ORDER YOUR FAVOURITE FOOD</button>
                </div> */}
            </div>

            {/* dessert section  */}
            <div>
                <MenuCategory
                    itmes={dessert}
                    title="dessert"
                    description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    coverImage={coverImg3}
                ></MenuCategory>
                {/* <div className='text-center'>
                    <button className='btn btn-outline border-0 border-b-4 my-2'>ORDER YOUR FAVOURITE FOOD</button>
                </div> */}
            </div>


            {/* pizza section  */}
            <div>
                <MenuCategory
                    itmes={pizza}
                    title="pizza"
                    description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    coverImage={coverImg2}
                ></MenuCategory>
                {/* <div className='text-center'>
                    <button className='btn btn-outline border-0 border-b-4 my-2'>ORDER YOUR FAVOURITE FOOD</button>
                </div> */}
            </div>

            {/* salad section  */}
            <div>
                <MenuCategory
                    itmes={salad}
                    title="salad"
                    description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    coverImage={coverImg2}
                ></MenuCategory>
                {/* <div className='text-center'>
                    <button className='btn btn-outline border-0 border-b-4 my-2'>ORDER YOUR FAVOURITE FOOD</button>
                </div> */}
            </div>

            {/* soup section  */}
            <div>
                <MenuCategory
                    itmes={soup}
                    title="soup"
                    description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    coverImage={coverImg2}
                ></MenuCategory>
                {/* <div className='text-center'>
                    <button className='btn btn-outline border-0 border-b-4 my-2'>ORDER YOUR FAVOURITE FOOD</button>
                </div> */}
            </div>
        </div>
    );
};

export default Menu;