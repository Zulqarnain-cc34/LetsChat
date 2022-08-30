import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faLock,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "../../../styles/Components/Login/form.css";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {
    useLoginMutation,
    useRegisterMutation,
} from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";
import { Link, useHistory } from "react-router-dom";
import { GET_SESSION } from "../../../context/actionsTypes";
import { useStateValue } from "../../../context/stateProvider";
import { errorMap } from "../../../types";
import { store } from "react-notifications-component";

interface FormProps {
    icons: Array<IconDefinition>;
    registers: Boolean;
}

const Form: React.FC<FormProps> = ({ icons, registers }) => {
    const { dispatch } = useStateValue();
    let history = useHistory();

    const [, register] = useRegisterMutation();
    const [, login] = useLoginMutation();
    const [username, setusername] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [errors, seterrors] = useState<errorMap>();

    //functions to grab email,password,username from form
    const handleusername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setusername(e.target.value);
    };
    const handlepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value);
    };
    const handleemail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemail(e.target.value);
    };

    //function to handle register mutation
    //and the error handling in the register step
    const handleRegister = async (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        await e.preventDefault();
        const response = await register({ password, username, email });
        if (response.data?.register.user) {
            dispatch({
                type: GET_SESSION,
                payload: {
                    user: response.data?.register.user,
                },
            });
            history.push("/");
        } else if (response.data?.register.errors) {
            const error = toErrorMap(response.data?.register.errors);
            seterrors(error);
        }

        store.addNotification(
            {
                title: "Wonderful!",
                message: "Logged in",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true,
                },
            },
            () => {
                console.log("Notification sent");
            }
        );
    };

    console.log(errors?.field);
    console.log(errors?.message);

    //function to handle login mutation
    //and the error handling in the login step
    const handleLogin = async (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        await e.preventDefault();
        const response = await login({
            usernameorEmail: username,
            password: password,
        });
        if (response.data?.login.user) {
            dispatch({
                type: GET_SESSION,
                payload: {
                    user: response.data?.login.user,
                },
            });
            history.push("/");
            console.log(response.data?.login.user);
        } else if (response.data?.login.errors) {
            const error = toErrorMap(response.data?.login.errors);
            seterrors(error);
        }
    };

    return (
        <form className={registers ? "form signUp-form" : "form signIn-form"}>
            <h2 className="form-title">
                {registers === true ? "Sign Up" : "Sign In"}
            </h2>

            <div className="input-group">
                <div
                    className="error-message"
                    style={
                        errors?.field === "username" ? { opacity: "1" } : null
                    }
                >
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        style={{
                            width: "25px",
                            height: "25px",
                            color: "#fbff03",
                            marginRight: "4px",
                        }}
                    />
                    <p>{errors?.message}</p>
                </div>
                <div className="input-field">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                        type="text"
                        name="username"
                        placeholder="name"
                        onChange={handleusername}
                        required
                    />
                </div>
            </div>

            <div className="input-group">
                <div
                    className="error-message"
                    style={
                        errors?.field === "password" ? { opacity: "1" } : null
                    }
                >
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        style={{
                            width: "25px",
                            height: "25px",
                            color: "#fbff03",
                            marginRight: "4px",
                        }}
                    />
                    <p>{errors?.message}</p>
                </div>
                <div className="input-field">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handlepassword}
                        required
                    />
                </div>
            </div>
            {registers === true ? (
                <div className="input-group">
                    <div
                        className="error-message"
                        style={
                            errors?.field === "email" ? { opacity: "1" } : null
                        }
                    >
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            style={{
                                width: "25px",
                                height: "25px",
                                color: "#fbff03",
                                marginRight: "4px",
                            }}
                        />
                        <p>{errors?.message}</p>
                    </div>

                    <div className="input-field">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="input-icon"
                        />
                        <input
                            type="email"
                            name="email"
                            onChange={handleemail}
                            placeholder="Email"
                            required
                        />
                    </div>
                </div>
            ) : null}
            <div className="input-field-forgot-password">
                <Link
                    to="/forgotpassword"
                    className="input-field-forgot-password-link"
                >
                    forgot password
                </Link>
            </div>
            <input
                type="submit"
                value={registers === true ? "Register" : "Login"}
                onClick={registers ? handleRegister : handleLogin}
                className="btn"
            />

            <p className="social-text">Sign In with Other Methods</p>
            <div className="social-media">
                <div className="social-icons">
                    <FontAwesomeIcon icon={icons[0]} className="social-icon" />
                </div>
                <div className="social-icons">
                    <FontAwesomeIcon icon={icons[1]} className="social-icon" />
                </div>
                <div className="social-icons">
                    <FontAwesomeIcon icon={icons[2]} className="social-icon" />
                </div>
                <div className="social-icons">
                    <FontAwesomeIcon icon={icons[3]} className="social-icon" />
                </div>
            </div>
        </form>
    );
};
export default Form;
