import React, { useContext } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { SingleExpenseItem } from "./../context/SingleExpenseItem";
import { EditContext } from "./../context/EditContext";

function SingleExpense(props) {
    const [, dispatch] = useContext(SingleExpenseItem);
    const [, setEditAllow] = useContext(EditContext);

    function hanldeDeleteItem() {
        dispatch({ type: "DEL", payload: { id: props.id, expense_amount: props.expense_amount } });
    }
    function hanldeEditItem() {
        setEditAllow({
            expense_discription: props.expense_discription,
            expense_amount: props.expense_amount,
            id: props.id,
        });
    }
    return (
        <>
            <div className="w-72 h-28 bg-gray-50 shadow-lg border-2">
                <div className="pl-4 py-2 text-base font-medium border-b-2 flex justify-between">
                    {props.expense_discription}
                    <div className="mr-4">
                        <button onClick={hanldeEditItem} className="mr-2">
                            {<EditIcon />}
                        </button>{" "}
                        <button onClick={hanldeDeleteItem}>{<DeleteIcon />}</button>
                    </div>
                </div>
                <p className="pl-4 py-4 text-base font-medium ">₹ {props.expense_amount}</p>
            </div>
        </>
    );
}

export default SingleExpense;
