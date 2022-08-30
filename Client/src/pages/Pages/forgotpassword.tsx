import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../../styles/pages/forgotpassword.css";
import { useForgotpasswordMutation } from "../../generated/graphql";
interface ChangePasswordProps {}

export const ForgotPassword: React.FC<ChangePasswordProps> = () => {
    const [email, setemail] = useState<string>("");
    const [, forgotpassword] = useForgotpasswordMutation();

    const sendToken = async () => {
        await forgotpassword({ email: email });

        //response.data?.forgotPassword
    };

    return (
        <div className="forgotpassword">
            <div className="forgotpassword-form">
                <div className="forgotpassword-input">
                    <div className="forgotpassword-input-field-text">
                        {" "}
                        <p>Enter your email address in the section below</p>
                    </div>
                    <div className="forgotpassword-input-field">
                        <div className="forgotpassword-input-icons">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <input
                            type="text"
                            placeholder="email address"
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div className="forgotpassword-input-button-text">
                        <h3>
                            Didn't recieve the link,click to resend it{" "}
                            <Link to="/" className="forgotpassword-input-link">
                                Home
                            </Link>
                            .
                        </h3>
                        <button
                            onClick={sendToken}
                            className="forgotpassword-input-field-submit"
                        >
                            <p> Submit</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
