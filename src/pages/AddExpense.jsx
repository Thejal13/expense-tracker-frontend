import { useEffect, useState } from "react";
import api from "../services/api";

function AddExpense({
                        onExpenseAdded,
                        editingExpense,
                        setEditingExpense
                    }) {
    {

        const [title, setTitle] = useState("");
        const [amount, setAmount] = useState("");
        const [category, setCategory] = useState("");
        const [description, setDescription] = useState("");
        const [expenseDate, setExpenseDate] = useState("");

        useEffect(() => {

            console.log("Editing Expense:", editingExpense);

            if (editingExpense) {
                setTitle(editingExpense.title);
                setAmount(editingExpense.amount);
                setCategory(editingExpense.category);
                setDescription(editingExpense.description);
                setExpenseDate(editingExpense.expenseDate);
            }

        }, [editingExpense]);

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {

                if (editingExpense) {

                    await api.put(`/expenses/${editingExpense.id}`, {
                        title,
                        amount: Number(amount),
                        category,
                        description,
                        expenseDate
                    });

                    alert("Expense updated successfully!");

                } else {

                    await api.post("/expenses", {
                        title,
                        amount: Number(amount),
                        category,
                        description,
                        expenseDate,
                        userId: 11
                    });

                    alert("Expense added successfully!");
                }

                setTitle("");
                setAmount("");
                setCategory("");
                setDescription("");
                setExpenseDate("");
                setEditingExpense(null);

                onExpenseAdded();

            } catch (error) {

                console.error(error);

                alert(
                    editingExpense
                        ? "Failed to update expense!"
                        : "Failed to add expense!"
                );
            }
        };

        return (
            <div className="card shadow p-4 mb-4">

                <h4 className="mb-3">
                    {editingExpense ? "Edit Expense" : "Add Expense"}
                </h4>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="date"
                        className="form-control mb-3"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                    />

                    <button className="btn btn-success w-100">
                        {editingExpense ? "Update Expense" : "Add Expense"}
                    </button>

                </form>

            </div>
        );
    }
}

export default AddExpense;