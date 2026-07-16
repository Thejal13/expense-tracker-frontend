import { useEffect, useState } from "react";
import api from "../services/api";
import AddExpense from "./AddExpense";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load expenses!");
        }
    };

    const deleteExpense = async (id) => {
        try {

            await api.delete(`/expenses/${id}`);

            alert("Expense deleted successfully!");

            fetchExpenses();

        } catch (error) {

            console.error(error);

            alert("Failed to delete expense!");
        }
    };

    const editExpense = (expense) => {
        console.log(expense);
        setEditingExpense(expense);
    };

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Expense Tracker 💸</h2>

            <div className="card shadow p-4">

                <h4>Welcome 👋</h4>

                <hr />

                <AddExpense
                    onExpenseAdded={fetchExpenses}
                    editingExpense={editingExpense}
                    setEditingExpense={setEditingExpense}
                />

                <h5>Your Expenses</h5>

                {expenses.length === 0 ? (
                    <p>No expenses found.</p>
                ) : (
                    <table className="table table-striped mt-3">

                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {expenses.map((expense) => (

                            <tr key={expense.id}>

                                <td>{expense.title}</td>
                                <td>₹ {expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.expenseDate}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editExpense(expense)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteExpense(expense.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>
                )}

            </div>

        </div>
    );
}

export default Dashboard;