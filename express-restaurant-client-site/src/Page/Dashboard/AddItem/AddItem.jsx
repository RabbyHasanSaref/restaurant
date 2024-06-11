import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/Section/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecuer = useAxios();


    const onSubmit = async (data) => {
        console.log(data)
        // image upload 
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        
        if(res.data.success){
            //client site data send server site
            const menuItem = {
                name: data.Recipe,
                recipe: data.Details,
                category: data.category,
                price: parseFloat(data.Price),
                image: res.data.data.display_url
            }

            const menuRes = await axiosSecuer.post('/menu', menuItem);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                // show popup 
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${data.Recipe} is add to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        }
        console.log(res.data);
    }

    return (
        <div>
            <SectionTitle
                subHeading="---What's new?---"
                Heading="ADD AN ITEM"
            ></SectionTitle>

            <div className="lg:w-[800px] w-[300px] mx-auto space-y-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="">Recipe name*</label>
                        <div>
                            <input type="text" {...register('Recipe')} placeholder="Recipe name" id="" className="p-3 w-full border-2" />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="w-2/3">
                            <label htmlFor="">Category*</label>
                            <div>
                                <select defaultValue="default" {...register('category')} className="p-3 w-full border-2">
                                    <option disabled value="default">Select Category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-2/3">
                            <label htmlFor="">Price*</label>
                            <div>
                                <input type="text" {...register('Price')} placeholder="Price*" id="" className="p-3 w-full border-2" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Recipe Details*</label>
                        <div>
                            <input type="text" {...register('Details')} placeholder="Recipe Details" id="" className="p-3 w-full border-2" />
                        </div>
                    </div>

                    <div className="mt-5">
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn bg-orange-500 w-full mt-5">Add Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;