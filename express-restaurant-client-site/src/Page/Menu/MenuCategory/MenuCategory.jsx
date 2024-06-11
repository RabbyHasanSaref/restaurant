import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import ItmeMenu from "../../Shared/ItmeMenu/ItmeMenu";


const MenuCategory = ({ itmes, coverImage, title, description }) => {
    return (
        <div>
            {title &&
                <Cover
                    imag={coverImage}
                    title={title}
                    subTitle={description}
                ></Cover>
            }
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 my-5">
                {
                    itmes.map(populerItme => <ItmeMenu key={populerItme._id} populerItme={populerItme}></ItmeMenu>)
                }
            </div>
            <div className='text-center'>
                <Link to={`/order/${title}`}>
                    <button className='btn btn-outline border-0 border-b-4 my-2'>ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;