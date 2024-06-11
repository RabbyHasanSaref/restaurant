import { useContext, useEffect, useState } from "react";
import loginImg from "../../assets/others/authentication2.png"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { authContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {

    const axiosPublic = useAxiosPublic();

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const { loginUser, googleLogin } = useContext(authContext);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then((result) => {
                console.log(result.user)
                Swal.fire({
                    title: "User Login Succesfull",
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
                navigate(from, { replace: true })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const hanndleGoogleLogin = () =>{
        googleLogin()
        .then((result) => {
            console.log(result.user)
            const userInfo ={
                name: result.user?.displayName,
                email: result.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
            })
            navigate('/')
        })
    }

    const handleCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Restaurant || Login
                </title>
            </Helmet>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm bg-base-100 p-5">
                        <div className="text-2xl font-semibold text-center p-5">
                            <h2>Login</h2>
                        </div>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                {/* <label className="label">
                                <span className="label-text">Captcha</span>
                            </label> */}
                                <LoadCanvasTemplate />
                                <input type="text" onBlur={handleCaptcha} name="captcha" placeholder="Pleace Type Captcha" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} type="submit" className="btn bg-orange-500" name="" id="" value="Login" />
                            </div>
                            <div className="text-center text-base font-medium">
                                <p>New here? <span className="text-blue-500"><Link to="/register">Create a New Account</Link></span></p>
                            </div>
                        </form>
                        <div className="text-center">
                            <button onClick={hanndleGoogleLogin} className="btn bg-orange-500 text-white">Google Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;