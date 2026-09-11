let descriptionInput = document.getElementById("description");
let amountInput = document.getElementById("amount");
let CategoryInput = document.getElementById("Category");
let dateInput = document.getElementById("date");
let expenseList = document.getElementById("expenseList");
let button = document.getElementById("addexpense");

button.addEventListener("click",function(event){
    event.preventDefault();

    let description = descriptionInput.value;
    let amount = amountInput.value;
    let Category = CategoryInput.value;
    let date = dateInput.value;

    let newExpense = document.createElement("li");
    newExpense.textContent = description +"-"+ amount;

    expenseList.appendChild(newExpense);

});


