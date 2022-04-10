import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginContext } from "./../context/LoginContext";

function Signup() {
    const navi = useNavigate();

    const [is_login, setIsLogin] = useContext(LoginContext);

    const [form_data, setFormData] = useState({
        name: "",
        create_password: "",
        confirm_password: "",
    });

    function handleForm(evt) {
        const { name, value } = evt.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function handleSubmit() {
        toast.success("Signup Successfull !!", {
            position: "top-center",
            autoClose: 1800,
        });
        localStorage.setItem("login", JSON.stringify({ name: form_data.name, password: form_data.create_password }));
        setIsLogin(true);
        navi("/home");
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="name"
                        onChange={handleForm}
                        value={form_data.name}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Create Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                        id="password"
                        type="password"
                        placeholder="******************"
                        name="create_password"
                        onChange={handleForm}
                        value={form_data.password}
                    />
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                        id="password"
                        type="password"
                        placeholder="******************"
                        name="create_password"
                        onChange={handleForm}
                        value={form_data.password}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={handleSubmit}>
                        Signup
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
