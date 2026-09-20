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
let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");
searchInput.addEventListener("input",function(){
    displayExpenses();
});
categoryFilter.addEventListener("change", function() {
    displayExpenses();
});

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
        id: Date.now(),
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
    let searchText = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;

    let filteredExpenses = expenses.filter(function(expense) {
    let matchesSearch = expense.description.toLowerCase().includes(searchText);
    let matchesCategory =
        selectedCategory === "all" ||
        expense.Category === selectedCategory;

    return matchesSearch && matchesCategory;
});

   if (filteredExpenses.length === 0) {
        let emptyMessage = document.createElement("p");

        if (expenses.length === 0) {
        emptyMessage.textContent = "no expense yet";
        } else {
        emptyMessage.textContent = "no matching expenses";
        }

        emptyMessage.className = "empty-message";

        expenseList.appendChild(emptyMessage);

        updateTotal();
        return;
    }

    for (let i = 0; i < filteredExpenses.length; i++) {

        let expense = filteredExpenses[i];

        let expenseDate = new Date(expense.date + "T00:00:00");

        let formattedDate = expenseDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        let newExpense = document.createElement("li");
        newExpense.className = "expense-item";

        let expenseInfo = document.createElement("div");
        expenseInfo.className = "expense-info";

        let expenseName = document.createElement("h3");
        expenseName.textContent =expense.description;

        let expenseDetails =document.createElement("p");


        expenseDetails.textContent =

            expense.Category +
            " | ₹" +
            expense.amount +
            " | " +
            formattedDate;

        expenseInfo.appendChild(expenseName);
        expenseInfo.appendChild(expenseDetails);

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
            return item.id !== expense.id;
            });

            displayExpenses();
        });

        newExpense.appendChild(expenseInfo);
        newExpense.appendChild(deleteButton);
        expenseList.appendChild(newExpense);
    }

    updateTotal();
}
displayExpenses();