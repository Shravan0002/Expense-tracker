let descriptionInput = document.getElementById("description");
let amountInput = document.getElementById("amount");
let CategoryInput = document.getElementById("Category");

let dateInput = document.getElementById("date");
dateInput.max = new Date().toISOString().split("T")[0];

let expenseList = document.getElementById("expenseList");
let button = document.getElementById("addexpense");
let totalElement = document.getElementById("Total");
let totalSpentElement = document.getElementById("totalSpent");
let budgetLeftElement = document.getElementById("budgetLeft");

let budget = 25000;
let budgetLeft = budget;
let expenses = [];


button.addEventListener("click", function(event) {
    event.preventDefault();

    let description = descriptionInput.value;
    let amount = Number(amountInput.value);
    let Category = CategoryInput.value;
    let date = dateInput.value;

    if (description === "") {
        alert("plz enter a description!");
        return;
    }

    if (amount <= 0) {
        alert("amount must be greater than zero");
        return;
    }

    if (amount > budgetLeft) {
        alert("Expense cannot exceed the remaining budget");
        return;
    }

    if (date === "") {
        alert("Please select a date");
        return;
    }

    let expense = {
        description: description,
        amount: amount,
        Category: Category,
        date: date
    };

    expenses.push(expense);
    displayExpenses();

    descriptionInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
});


function updateTotal() {

    let total = 0;

    for (let expense of expenses) {
        total = total + expense.amount;
    }

    totalElement.textContent = total;
    totalSpentElement.textContent = total;

    budgetLeft = budget - total;

    budgetLeftElement.textContent = budgetLeft;
}


function displayExpenses() {

    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

        let expense = expenses[i];

        let expenseDate = new Date(expense.date + "T00:00:00");

        let formattedDate = expenseDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        let newExpense = document.createElement("li");

        newExpense.textContent =
            expense.description +
            " | " +
            expense.Category +
            " | ₹" +
            expense.amount +
            " | " +
            formattedDate;

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            expenses.splice(i, 1);
            displayExpenses();
        });

        newExpense.appendChild(deleteButton);
        expenseList.appendChild(newExpense);
    }

    updateTotal();
}