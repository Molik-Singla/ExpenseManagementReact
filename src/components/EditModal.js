import React, { useState, useContext } from "react";

import { SingleExpenseItem } from "./../context/SingleExpenseItem";
import { EditContext } from "./../context/EditContext";

function EditModal(props) {
    const [expense_items, dispatch] = useContext(SingleExpenseItem);
    const [edit_allow, setEditAllow] = useContext(EditContext);

    const [form_data, setFormData] = useState({
        expense_discription: props.expense_discription,
        expense_amount: props.expense_amount,
    });
    let old_amount = props.expense_amount;
    function handleForm(evt) {
        const { name, value } = evt.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function hanldeSaveEditData() {
        dispatch({ type: "UPD", payload: { ...form_data, id: props.id, old_amount } });
        setEditAllow(null);
    }
    return (
        <>
            <div className="w-screen flex justify-center bg-red-200 ">
                <div
                    className="modal fade fixed top-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto backdrop-brightness-50 flex justify-center"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog relative pointer-events-none w-3/6">
                        <div className="modal-content border-none shadow-lg relative w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current flex justify-center flex-col ">
                            <div className="w-3/4 mt-10 self-center">
                                <label className="block text-grey-darker font-bold mb-4 text-lg" htmlFor="username">
                                    Expense Discription
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
                            </div>
                            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md mt-8">
                                <button
                                    onClick={() => setEditAllow(null)}
                                    type="button"
                                    className="px-6 py-2.5 bg-purple-600 text-white font-medium  text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={hanldeSaveEditData}
                                    type="button"
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditModal;
