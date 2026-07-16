import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);

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

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Expense Tracker 💸</h2>

            <div className="card shadow p-4">

                <h4>Welcome 👋</h4>

                <hr />

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
                        </tr>
                        </thead>

                        <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.title}</td>
                                <td>₹ {expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.expenseDate}</td>
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