import React, { useState } from "react";
import { useParams } from "react-router";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Link, useHistory } from "react-router-dom";
import "../../styles/pages/changepassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = () => {
    const history = useHistory();
    const { tokenId } = useParams<{ tokenId: string }>();
    const [password, setPassword] = useState("");
    const [error, setError] = useState<Record<string, string>>();
    const [, changepassword] = useChangePasswordMutation();

    const newpassword = async () => {
        const response = await changepassword({
            password: password,
            token: tokenId,
        });
        if (response.data?.changePassword.user) {
            console.log(response.data?.changePassword.user);
            history.push("/");
        } else if (response.data?.changePassword.errors) {
            const errormessage: Record<string, string> = toErrorMap(
                response.data?.changePassword.errors
            );
            console.log(errormessage);
            setError(errormessage);
        }
    };

    return (
        <div className="changepassword">
            <div className="changepassword-form">
                <div className="changepassword-input">
                    <div className="changepassword-input-field-text">
                        {" "}
                        <p>Enter your new password in the section below</p>
                    </div>
                    <div className="changepassword-input-field">
                        <div className="changepassword-input-icons">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <input
                            type="text"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="changepassword-input-button-text">
                        {error ? (
                            <>
                                <div className="changepassword-input-field-error">
                                    <p>{error}</p>
                                </div>
                            </>
                        ) : null}
                        <h3>
                            Click the link to go to home page{" "}
                            <Link to="/" className="changepassword-input-link">
                                Home
                            </Link>
                            .
                        </h3>
                        <button
                            className="changepassword-input-field-submit"
                            onClick={newpassword}
                        >
                            <p> Submit</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
