import React, { useEffect, useState, useReducer } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

// Context
import { LoginContext } from "./context/LoginContext";
import { SingleExpenseItem } from "./context/SingleExpenseItem";
import { EditContext } from "./context/EditContext";
import { TotalExpenseContext } from "./context/TotalExpense";

function App() {
    const [is_login, setIsLogin] = useState(false);
    const [edit_allow, setEditAllow] = useState(null);
    const [total_expense, setTotalExpense] = useState(0);

    const [expense_items, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("items"));
        if (data) for (let elem of data) dispatch({ type: "ADD", payload: { ...elem } });
    }, []);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(expense_items));
    }, [expense_items]);
    function reducer(state, action) {
        if (action.type === "ADD") {
            setTotalExpense((prev) => parseInt(prev) + parseInt(action.payload.expense_amount));
            return [...state, { ...action.payload }];
        }
        if (action.type === "DEL") {
            setTotalExpense((prev) => parseInt(prev) - parseInt(action.payload.expense_amount));
            return state.filter((elem) => elem.id !== action.payload.id);
        }
        if (action.type === "UPD") {
            setTotalExpense((prev) => parseInt(prev) - parseInt(action.payload.old_amount) + parseInt(action.payload.expense_amount));
            return state.map((elem) => {
                if (elem.id === action.payload.id) return action.payload;
                else return elem;
            });
        }

        return state;
    }
    return (
        <>
            <LoginContext.Provider value={[is_login, setIsLogin]}>
                <SingleExpenseItem.Provider value={[expense_items, dispatch]}>
                    <EditContext.Provider value={[edit_allow, setEditAllow]}>
                        <TotalExpenseContext.Provider value={[total_expense, setTotalExpense]}>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Navbar />}>
                                        <Route index element={<Login />} />
                                        <Route path="signup" element={<Signup />} />
                                        <Route path="home" element={<Home />} />
                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </TotalExpenseContext.Provider>
                    </EditContext.Provider>
                </SingleExpenseItem.Provider>
            </LoginContext.Provider>
        </>
    );
}

export default App;
