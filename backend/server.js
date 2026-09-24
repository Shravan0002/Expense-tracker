const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let expenses=[];
app.get("/api/expenses", function(req, res) {
    res.json(expenses);
});
app.post("/api/expenses", function(req, res) {
    let expense = req.body;

    expenses.push(expense);

    res.status(201).json(expense);
});
app.listen(PORT,function(){
    console.log(`server is running on PORT ${PORT}`);
});