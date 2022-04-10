import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SingleExpense from "./SingleExpense";

import { LoginContext } from "./../context/LoginContext";
import { SingleExpenseItem } from "./../context/SingleExpenseItem";
import { EditContext } from "./../context/EditContext";
import { TotalExpenseContext } from "./../context/TotalExpense";

import EditModal from "./EditModal";

function Home() {
    console.log("Home");
    const navi = useNavigate();

    const [is_login, setIsLogin] = useContext(LoginContext);
    const [expense_items, dispatch] = useContext(SingleExpenseItem);
    const [edit_allow, setEditAllow] = useContext(EditContext);
    const [total_expense, setTotalExpense] = useContext(TotalExpenseContext);

    useEffect(() => {
        if (!localStorage.getItem("login")) {
            setIsLogin(false);
            navi("/");
        }
    });

    const [form_data, setFormData] = useState({
        expense_discription: "",
        expense_amount: "",
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
        dispatch({ type: "ADD", payload: { expense_discription: form_data.expense_discription, expense_amount: form_data.expense_amount } });
        setFormData({
            expense_discription: "",
            expense_amount: "",
        });
    }
    return (
        <>
            {edit_allow && <EditModal {...edit_allow} />}
            <div className="flex justify-center">
                <div className="w-3/4 mt-10">
                    <label className="flex justify-between text-grey-darker font-bold mb-4 text-lg " htmlFor="username">
                        Expense Discription <span>Total Expense : ₹{total_expense}</span>
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none"
                        id="username"
                        type="text"
                        placeholder="Enter Expense Discription"
                        name="expense_discription"
                        autoCorrect="off"
                        autoComplete="off"
                        onChange={handleForm}
                        value={form_data.expense_discription}
                    />
                    <label className="block text-grey-darker font-bold mb-4 text-lg mt-10" htmlFor="username">
                        Expense Amount
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none"
                        id="username"
                        type="number"
                        placeholder="Enter Expense Amount"
                        name="expense_amount"
                        autoCorrect="off"
                        autoComplete="off"
                        onChange={handleForm}
                        value={form_data.expense_amount}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mt-10" onClick={handleSubmit}>
                        Submit
                    </button>
                    <div className="mt-10 grid grid-cols-3 gap-2 gap-y-4">
                        {useMemo(() => {
                            return expense_items.map((elem, ind) => {
                                elem.id = ind;
                                return <SingleExpense key={elem.id} {...elem} />;
                            });
                        }, [expense_items])}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
