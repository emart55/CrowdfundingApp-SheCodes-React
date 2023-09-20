import { useState } from "react";
import postLogin from "../api/postLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/hooks/use-auth";

function LoginForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [formIsInvalid, setFormIsInvalid] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                setAuth({
                    token: response.token,
                });
                navigate("/");
            });
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="button" onClick={handleSubmit}>
                Login
            </button>
            <p className="error-message">{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}>Please check your credentials are correct.</sub>
            <p>{formIsInvalid}</p>
        </form>
    );
}

export default LoginForm;