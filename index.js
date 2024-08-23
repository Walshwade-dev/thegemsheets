

const currentDateEl = document.querySelector('#current-date');
const stockOrigin = document.querySelector('.stock-origin');
const addStockBtn = document.querySelector('.add-stock-btn');
// const stockOriginsName = document.querySelector('.stock-origins-name');
const stockContainerParent = document.querySelector('.stock-container-parent');


function currentDate(){
    const today = new Date();
    const options = {year:'numeric', month:'long', day:'numeric'};
    const formattedDate = today.toLocaleDateString(undefined, options);
    currentDateEl.textContent = formattedDate;
}

currentDate()

document.addEventListener('click', (e) => {
    if(e.target === addStockBtn){
        e.preventDefault();
        addStock();
    }
})

document.addEventListener('change', () => {
    salesMade();
})

// Add stock btn
function addStock() {
    const originValue = stockOrigin.value.trim();

    if (originValue === "") {
        console.warn('Stock origin value is empty. The stock will not be added.');
        return; // Exit the function if the input is empty
    }

    // Define the HTML template
    const currentHtml = `
        <div class="stock-container">
            <h1 class="font-bold text-lg"><span class="stock-origins-name">${originValue}</span> stock</h1>
            <div class="stock-holder grid grid-cols-2 gap-2">
                <div class="opening-stock">
                    <h4>Opening Stock</h4>
                    <div class="grid grid-rows-2 border-2 border-blue-500 px-1 rounded-lg">
                        <div>
                            <h4 class="text-center underline underline-offset-4">Full</h4>
                            <div class="grid grid-cols-2 content-center gap-2">
                                <input class="opening-full-nets border-2 border-indigo-500/50 rounded-md w-[5rem]" type="number" />
                                <span class="h-8 content-center"> nets</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-center underline underline-offset-4">Halves</h4>
                            <div class="grid grid-cols-2 content-center gap-2">
                                <input class="opening-halves border-2 border-indigo-500/50 rounded-md w-[5rem]" type="number" />
                                <span class="h-8 content-center"> Kgs</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="closing-stock">
                    <h4>Closing Stock</h4>
                    <div class="grid grid-rows-2 border-2 border-green-500 px-1 rounded-lg">
                        <div>
                            <h4 class="text-center underline underline-offset-4">Full</h4>
                            <div class="grid grid-cols-2 content-center gap-2">
                                <input class="full-closing-nets border-2 border-indigo-500/50 rounded-md w-[6rem]" type="number" />
                                <span class="h-8 content-center"> nets</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-center underline underline-offset-4">Halves</h4>
                            <div class="grid grid-cols-2 content-center gap-2">
                                <input class="closing-halves border-2 border-indigo-500/50 rounded-md w-[6rem]" type="number" />
                                <span class="h-8 content-center"> Kgs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <h4 class="font-semibold">Units sold:</h4>
                <div>
                    <div>
                        <span class="full-nets-sold"></span> Nets
                    </div>
                    <div>
                        <span class="halves-sold"></span> Kgs
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append the new stock container to the parent container
    stockContainerParent.insertAdjacentHTML('beforeend', currentHtml);

    // Clear the stock origin input field
    stockOrigin.value = "";
}

function salesMade() {
    // Find the latest added stock container
    const latestStockContainer = stockContainerParent.lastElementChild;

    if (!latestStockContainer) return;

    // Get the opening and closing stock values
    const openingFullNets = parseFloat(latestStockContainer.querySelector('.opening-full-nets').value) || 0;
    const openingHalves = parseFloat(latestStockContainer.querySelector('.opening-halves').value) || 0;

    const closingFullNets = parseFloat(latestStockContainer.querySelector('.full-closing-nets').value) || 0;
    const closingHalves = parseFloat(latestStockContainer.querySelector('.closing-halves').value) || 0;

    // Convert all units to kilos
    const openingKilos = (openingFullNets * 20) + openingHalves;
    const closingKilos = (closingFullNets * 20) + closingHalves;

    const differenceBtwnOpeningAndClosing = openingKilos - closingKilos;

    const soldNets = Math.floor(differenceBtwnOpeningAndClosing / 20);
    const soldKilos = Math.floor(differenceBtwnOpeningAndClosing % 20);

    // Update the sold units in the latest stock container
    latestStockContainer.querySelector('.full-nets-sold').textContent = soldNets;
    latestStockContainer.querySelector('.halves-sold').textContent = soldKilos;
}


// Add a credited customer input form
function addCreditedCustomer() {
    const container = document.getElementById('creditedContainer');
    const index = container.children.length + 1;
    const div = document.createElement('div');
    div.innerHTML = `
        <fieldset>
            <legend>Credited Customer ${index}</legend>
            <label for="customerName${index}">Name:</label>
            <input type="text" id="customerName${index}" required>
            <br>
            <label for="productsCredited${index}">Products Credited:</label>
            <input type="number" id="productsCredited${index}" required>
            <br>
            <label for="pricePerProduct${index}">Price per Product:</label>
            <input type="number" id="pricePerProduct${index}" required>
            <br>
            <label for="dateCredited${index}">Date:</label>
            <input type="date" id="dateCredited${index}" required>
        </fieldset>
    `;
    container.appendChild(div);
}

// Add a paid credit input form
function addPaidCredit() {
    const container = document.getElementById('paidCreditsContainer');
    const index = container.children.length + 1;
    const div = document.createElement('div');
    div.innerHTML = `
        <fieldset>
            <legend>Paid Credit ${index}</legend>
            <label for="paidDate${index}">Date:</label>
            <input type="date" id="paidDate${index}" required>
            <br>
            <label for="paidTime${index}">Time:</label>
            <input type="time" id="paidTime${index}" required>
            <br>
            <label for="isPaidFull${index}">Paid Fully:</label>
            <select id="isPaidFull${index}" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </fieldset>
    `;
    container.appendChild(div);
}

// Generate report based on the form inputs
function generateReport() {
    const openingStock = parseFloat(document.getElementById('openingStock').value);
    const closingStock = parseFloat(document.getElementById('closingStock').value);
    const totalStockSold = openingStock - closingStock;

    const creditedContainer = document.getElementById('creditedContainer');
    const creditedCustomers = [];
    for (let i = 0; i < creditedContainer.children.length; i++) {
        const customerName = document.getElementById(`customerName${i + 1}`).value;
        const productsCredited = parseFloat(document.getElementById(`productsCredited${i + 1}`).value);
        const pricePerProduct = parseFloat(document.getElementById(`pricePerProduct${i + 1}`).value);
        const dateCredited = document.getElementById(`dateCredited${i + 1}`).value;
        const totalCreditedAmount = productsCredited * pricePerProduct;
        creditedCustomers.push({ customerName, productsCredited, pricePerProduct, dateCredited, totalCreditedAmount });
    }

    const paidCreditsContainer = document.getElementById('paidCreditsContainer');
    const paidCredits = [];
    for (let i = 0; i < paidCreditsContainer.children.length; i++) {
        const paidDate = document.getElementById(`paidDate${i + 1}`).value;
        const paidTime = document.getElementById(`paidTime${i + 1}`).value;
        const isPaidFull = document.getElementById(`isPaidFull${i + 1}`).value;
        paidCredits.push({ paidDate, paidTime, isPaidFull });
    }

    const ncc = parseFloat(document.getElementById('ncc').value);
    const wc = parseFloat(document.getElementById('wc').value);
    const labour = parseFloat(document.getElementById('labour').value);
    const returnItems = parseFloat(document.getElementById('return').value);
    const empties = parseFloat(document.getElementById('empties').value);
    const others = document.getElementById('others').value;

    // Calculations
    const totalCreditedAmount = creditedCustomers.reduce((sum, customer) => sum + customer.totalCreditedAmount, 0);
    const totalExpenses = ncc + wc + labour + returnItems + empties;
    const totalIncome = totalStockSold - totalCreditedAmount;

    // Report generation
    let reportHTML = `<h2>Report for ${new Date().toLocaleDateString()} (${new Date().toLocaleDateString('en-US', { weekday: 'long' })})</h2>`;
    reportHTML += `<p>Opening Stock: ${openingStock}</p>`;
    reportHTML += `<p>Closing Stock: ${closingStock}</p>`;
    reportHTML += `<p>Remaining Stock: ${closingStock}</p>`;
    reportHTML += `<p>Total Products Sold: ${totalStockSold}</p>`;

    reportHTML += `<h3>Credited Customers</h3>`;
    creditedCustomers.forEach(customer => {
        reportHTML += `<p>${customer.customerName} - Products Credited: ${customer.productsCredited}, Price per Product: ${customer.pricePerProduct}, Total Credited Amount: ${customer.totalCreditedAmount}, Date: ${customer.dateCredited}</p>`;
    });

    reportHTML += `<h3>Paid Credits</h3>`;
    paidCredits.forEach(credit => {
        reportHTML += `<p>Date: ${credit.paidDate}, Time: ${credit.paidTime}, Paid Fully: ${credit.isPaidFull}</p>`;
    });

    reportHTML += `<h3>Expenses</h3>`;
    reportHTML += `<p>NCC: ${ncc}</p>`;
    reportHTML += `<p>W/C: ${wc}</p>`;
    reportHTML += `<p>Labour: ${labour}</p>`;
    reportHTML += `<p>Return: ${returnItems}</p>`;
    reportHTML += `<p>Empties: ${empties}</p>`;
    reportHTML += `<p>Others: ${others}</p>`;

    // Total Income Calculation
    const totalIncomeAfterExpenses = totalIncome - totalExpenses;
    reportHTML += `<h3>Total Income</h3>`;
    reportHTML += `<p>Total Income (after deducting credited items): ${totalIncome}</p>`;
    reportHTML += `<p>Total Expenses: ${totalExpenses}</p>`;
    reportHTML += `<p>Net Income (after expenses): ${totalIncomeAfterExpenses}</p>`;

    // Display the report
    document.getElementById('report').innerHTML = reportHTML;
}
