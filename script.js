let descriptionInput = document.getElementById("description");
let amountInput = document.getElementById("amount");
let CategoryInput = document.getElementById("Category");
let dateInput = document.getElementById("date");
let expenseList = document.getElementById("expenseList");
let button = document.getElementById("addexpense");
let totalElement = document.getElementById("Total");
let expenses = [];
let Total=840;

button.addEventListener("click",function(event){
    event.preventDefault();

    let description = descriptionInput.value;
    let amount = Number(amountInput.value);
    let Category = CategoryInput.value;
    let date = dateInput.value;

    let expense = {
        description:description,
        amount:amount,
        Category:Category,
        date:date
    };

    expenses.push(expense);
    displayExpenses();

});

function updateTotal(){

    let Total = 0;

    for(let expense of expenses){
        Total=Total+expense.amount;
    }
    totalElement.textContent = Total;
}

function displayExpenses(){
    expenseList.innerHTML = "";

    for(let i = 0; i < expenses.length;i++){
        let expense = expenses[i];
        let newExpense = document.createElement("li");

        newExpense.textContent = expense.description + " | " + expense.Category +  " | ₹"+ expense.amount;
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click",function(){
            expenses.splice(i,1);
            displayExpenses();
        });
        newExpense.appendChild(deleteButton);
        expenseList.appendChild(newExpense);
    }
    updateTotal();
}




