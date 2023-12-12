let user = null;

const balanceElement = document.getElementById("balance");
const betAmountInput = document.getElementById("bet-amount");
const betChoiceInput = document.getElementById("bet-choice");
const placeBetButton = document.getElementById("place-bet-button");
const historyElement = document.getElementById("bet-history");

function init() {
    // Display login form or welcome message
    if (!user) {
        document.getElementById("content").innerHTML = `
            <h2>Login</h2>
            <form id="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" required>
                <br>
                <label for="password">Password:</label>
                <input type="password" id="password" required>
                <br>
                <button type="submit">Login</button>
            </form>
        `;
        document.getElementById("login-form").addEventListener("submit", login);
    } else {
        document.getElementById("content").innerHTML = `
            <h2>Welcome, ${user.username}!</h2>
            <p>Your current balance: <span class="math-inline">\{user\.balance\}</p\>
<br\>
<h3\>Place your bet\!</h3\>
<p\>Next number will be\:</p\>
<label for\="bet\-amount"\>Bet Amount\:</label\>
<input type\="number" id\="bet\-amount" min\="1" max\="</span>{user.balance}" required>
            <br>
            <label for="bet-choice">Even or Odd:</label>
            <select id="bet-choice">
                <option value="even">Even</option>
                <option value="odd">Odd</option>
            </select>
            <br>
            <button type="button" id="place-bet-button">Place Bet</button>
            <br>
            <h3>Bet History</h3>
            <ul id="bet-history"></ul>
        `;
        balanceElement.innerText = `Balance: ${user.balance}`;
        betAmountInput.value = "";
        betChoiceInput.value = "";
        historyElement.innerHTML = "";
        placeBetButton.addEventListener("click", placeBet);
    }
}

function login(event) {
    event.preventDefault();
    // Implement user login logic
    // On successful login, set user object and update page content
    user = { username: "John Doe", balance: 100 };
    init();
}

function placeBet(event) {
    const betAmount = parseInt(betAmountInput.value);
    const betChoice = betChoiceInput.value;

    // Validate bet
    if (betAmount < 1 || betAmount > user.balance) {
        alert("Invalid bet amount!");
        return;
    }

    // Place bet and update user balance
    const nextNumber = Math.floor(Math.random() * 10) + 1;
    const isEven = nextNumber % 2 === 0;
    const win = (isEven && betChoice === "even") || (!isEven && betChoice === "odd");
    
    if (win) {
        user.balance += betAmount;
        historyElement.innerHTML += `<li>You won ${betAmount} on bet: ${betChoice}</li>`;
    } else {
        user.balance -= betAmount;
        historyElement.innerHTML += `<li>You lost ${betAmount} on bet: ${betChoice}</li>`;
    }

    init();
}

init
