import { useState } from "react";
import orderCoverImg from "../../assets/shop/banner2.jpg"
import Cover from "../Shared/Cover/Cover";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Helmet } from "react-helmet-async";
import useMenu from "../../Hooks/useMenu";
// import CardFood from "../../Components/CardFood/CardFood";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
    const categorys = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categorys.indexOf(category)
    const [indexTab, setIndexTab] = useState(initialIndex);
    const [menu] = useMenu();

    const drinks = menu.filter(drinks => drinks.category === "drinks");
    const dessert = menu.filter(dessert => dessert.category === "dessert");
    const pizza = menu.filter(pizza => pizza.category === "pizza");
    const salad = menu.filter(salad => salad.category === "salad");
    const soup = menu.filter(soup => soup.category === "soup");
    return (
        <div>
            <Helmet>
                <title>
                    Restaurant || Order Food
                </title>
            </Helmet>
            <Cover
                imag={orderCoverImg}
                title="OUR SHOP"
                subTitle="Would you like to try a dish?"
            ></Cover>

            <div className="my-5">
                <Tabs defaultIndex={indexTab} onSelect={(index) => setIndexTab(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                            <OrderTab
                                itmes={salad}
                            ></OrderTab>
                    </TabPanel>
                    <TabPanel>
                            <OrderTab
                                itmes={pizza}
                            ></OrderTab>
                    </TabPanel>
                    <TabPanel>
                            <OrderTab
                                itmes={soup}
                            ></OrderTab>
                    </TabPanel>
                    <TabPanel>
                            <OrderTab
                                itmes={dessert}
                            ></OrderTab>
                    </TabPanel>
                    <TabPanel>
                            <OrderTab
                                itmes={drinks}
                            ></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;