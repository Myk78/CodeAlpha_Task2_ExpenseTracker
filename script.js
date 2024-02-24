const balance = document.getElementById(
    "balance"
);
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const text = document.getElementById("Text");
const form = document.getElementById('form');
const amount = document.getElementById('amount');

// const dummyTransactions =[
//     {id:1, text:"Flower", amount:-20},
//     {id:2, text:"Salary", amount:10000},
//     {id:3, text:"Book", amount:-2000},
//     {id:4, text:"Toy", amount:-200},
//     {id:5, text:"Mobile", amount:-20000},
//     {id:6, text:"Laptop", amount:-30000},
// ];

// let transactions = dummyTransactions;

let transactions = [];


// list clear
function clearUl() {
    var ul = document.getElementById("list");
    let lis = ul.getElementsByTagName("li")
    while(lis.length > 10) {
        ul.removeChild(lis[0]);
    }
}

//Generete Id 
function generateID() {
    return Math.floor(Math.random()*1000000 );
    
}

//Add Transactions
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === "" ||
         amount.value.trim() === ""
    ) {
        alert("please enter Text the value")
    } else{
        const transaction ={
            id:generateID(),
            text:text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValue();
        text.value ="";
        amount.value ="";
    }

}



// list update
function addTransactionDOM(transaction){

    clearUl()
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );
    item.innerHTML = 
    `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}
    </span>
    <button class="delete-btn" onclick=" removeTransaction(${transaction.id})">X</button
    `;

    list.appendChild(item)
}

// Remove Transaction 
function removeTransaction(id) {
    transactions = transactions.filter((transactions) => transactions.id !== id
    );
    Init();
    
}


// Update Value
function updateValue(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item ),0).toFixed(2);
    const expense =(
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item),0)*-1
    ).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText= `$${expense}`;
}

// Init app
function Init() {
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValue();
    
}

Init();
form.addEventListener("submit", addTransaction)

// addTransactionDOM(transactions)


