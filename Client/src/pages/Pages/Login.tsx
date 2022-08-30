import React, { useState } from "react";
import Form from "../Components/Login/Form";
import "../../styles/pages/login.css";
import {
    faGoogle,
    faFacebook,
    faTwitter,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Rocket from "../../icons/rocket.svg";
import Table from "../../icons/table.svg";
import { motion } from "framer-motion";
interface LoginProps {}

const SignUpTextVariants = {
    initial: {
        //color: "#bbbbbb",
        opacity: 0,
        x: "-100vw",
    },
    animate: {
        //color: "#0a0a0a",
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            delay: 0.3,
        },
    },
};

const SignUpTitleVariants = {
    initial: {
        opacity: 0,
        y: "-100vh",
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            duration: 1,
        },
    },
};

const SignUpVariants = {
    initial: {
        //color: "#bbbbbb",
        opacity: 0,
        x: "-100vw",
    },
    animate: {
        //color: "#0a0a0a",
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            delay: 0.1,
            duration: 1,
        },
    },
};

const Login: React.FC<LoginProps> = () => {
    const [SignUp, setSignUp] = useState<boolean>(false);

    return (
        <div
            className={SignUp === true ? "container sign-up-mode" : "container"}
        >
            <div className="SignIn-SignUp">
                <Form
                    icons={[faGoogle, faFacebook, faTwitter, faLinkedin]}
                    registers={false}
                />
                <Form
                    icons={[faGoogle, faFacebook, faTwitter, faLinkedin]}
                    registers={true}
                />
            </div>
            <div className="panel-container">
                <div className="panel panel-left">
                    <div className="panel-content">
                        <motion.h2
                            variants={SignUpTitleVariants}
                            initial="initial"
                            animate="animate"
                        >
                            New here ?
                        </motion.h2>
                        <motion.p
                            variants={SignUpTextVariants}
                            initial="initial"
                            animate="animate"
                        >
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Eos laborum et veniam.
                        </motion.p>
                        <motion.button
                            className="btn"
                            onClick={() => {
                                setSignUp(!SignUp);
                            }}
                            variants={SignUpVariants}
                            initial="initial"
                            animate="animate"
                        >
                            Sign Up
                        </motion.button>
                    </div>
                    <img src={Rocket} alt="logo" />
                </div>
                <div className="panel panel-right">
                    <div className="panel-content">
                        <h2>One of Us?</h2>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Eos laborum et veniam.
                        </p>
                        <button
                            onClick={() => {
                                setSignUp(false);
                            }}
                            className="btn"
                        >
                            Sign In
                        </button>
                    </div>
                    <img src={Table} alt="logo" />
                </div>
            </div>
        </div>
    );
};
export default Login;
