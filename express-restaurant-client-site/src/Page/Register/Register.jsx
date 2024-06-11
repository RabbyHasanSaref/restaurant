import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/others/authentication2.png"
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { useContext } from "react";
import { authContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, userUpdate } = useContext(authContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const naviget = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user)
                userUpdate(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log('user database save');
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "User Register Succesfull",
                                        showClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeInUp
                                            animate__faster
                                          `
                                        },
                                        hideClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeOutDown
                                            animate__faster
                                          `
                                        }
                                    });
                                    naviget('/')
                                }
                            })

                    })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <Helmet>
                <title>
                    Restaurant || Register
                </title>
            </Helmet>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img src={signupImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm  bg-base-100">
                        <div className="text-2xl font-semibold text-center p-5">
                            <h2>Register</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500 text-base">Pleace Enter Your Name Requier*</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" name="name" {...register("photo", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.photo && <span className="text-red-500 text-base">Pleace Enter Your Photo Url Requier*</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500 text-base">Pleace Enter Your Email Requier*</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", { required: true, minLength: 6, maxLength: 10, pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* )/ })} placeholder="Password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-500 text-base">Pleace Enter Your Passwor Requier*</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-500 text-base">Password Must Be 6 Characters*</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-500 text-base">Password Must Be Less then 10 Characters*</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-500 text-base">Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter,*</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" name="" id="" value="Register" className="btn bg-orange-500" />
                            </div>
                            <div className="text-base font-medium text-center">
                                <p>Already registered? <span className="text-blue-500"><Link to="/login">Go to log in</Link></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;