const express = require("express");
const app = express();
const pool = require("./db");
const PORT = 3000;
app.use(express.json());

app.get("/api/expenses", function(req, res) {
    pool.query("SELECT * FROM expenses", function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(result.rows);
    });
});
app.get("/api/expenses/:id", function(req, res) {
    let id = req.params.id;

    pool.query(
        "SELECT * FROM expenses WHERE id = $1",
        [id],
        function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error" });
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Expense not found" });
            }

            res.json(result.rows[0]);
        }
    );
});
app.post("/api/expenses", function(req, res) {
    let expense = req.body;

    pool.query(
        "INSERT INTO expenses (description, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *",
        [expense.description, expense.amount, expense.category, expense.date],
        function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error" });
            }

            res.status(201).json(result.rows[0]);
        }
    );
});
app.listen(PORT,function(){
    console.log(`server is running on PORT ${PORT}`);
});