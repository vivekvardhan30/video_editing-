// Show selected plan and payment modal
function showPaymentOptions(plan, price) {
    document.getElementById('selected-plan').innerText = `Selected Plan: ${plan} ($${price}/month)`;
    document.getElementById('payment-modal').style.display = 'flex';
    hideAllPaymentForms(); // Hide any previously visible forms
}

// Close modal
function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Hide all payment forms
function hideAllPaymentForms() {
    document.getElementById('card-payment-form').style.display = 'none';
    document.getElementById('net-banking-form').style.display = 'none';
    document.getElementById('upi-payment-form').style.display = 'none';
    document.getElementById('payment-confirmation').style.display = 'none'; // Hide the confirmation
}

// Show card payment form
function showCardForm() {
    hideAllPaymentForms();
    document.getElementById('card-payment-form').style.display = 'block';
}

// Show net banking form
function showNetBankingForm() {
    hideAllPaymentForms();
    document.getElementById('net-banking-form').style.display = 'block';
}

// Show additional details after selecting a bank
function showNetBankingDetails() {
    const bank = document.getElementById('net-banking-bank').value;
    if (bank) {
        document.getElementById('net-banking-details').style.display = 'block';
    } else {
        document.getElementById('net-banking-details').style.display = 'none';
    }
}

// Show UPI payment form
function showUPIForm() {
    hideAllPaymentForms();
    document.getElementById('upi-payment-form').style.display = 'block';
}

function validateExpiryDate(expiryDate) {
    // Remove any spaces or additional characters from the input
    expiryDate = expiryDate.trim();

    // Check if expiryDate is in the correct MM/YY format using regex
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) {
        alert('Please enter a valid expiry date in MM/YY format.');
        return false;
    }

    // Extract month and year from the expiry date
    const [month, year] = expiryDate.split('/');

    // Convert year and month to integers
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10) + 2000; // Add 2000 to the year to make it 20XX format

    // Get current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const currentYear = currentDate.getFullYear();

    // Check if the expiry date is in the past
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        alert('The card has expired. Please use a valid card.');
        return false;
    }

    return true;
}

// Simulate payment processing and validation
function proceedPayment(paymentMethod) {
    if (paymentMethod === 'card') {
        // Simulate card validation
        const cardNumber = document.getElementById('card-number').value;
        const accountHolder = document.getElementById('account-holder').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const selectedBank = document.getElementById('card-bank').value;


        // Check if all card fields are filled
        if (!cardNumber || !accountHolder || !expiryDate || !cvv) {
            alert('Please fill all the card details correctly.');
            return;
        }

        // Inside the card payment validation block
        if (!validateExpiryDate(expiryDate)) {
            return; // Stops further processing if expiry date is invalid
        }


        // Ensure that the user selects a bank
        if (!selectedBank) {
            alert('Please select a bank from the dropdown.');
            return;
        }

        showConfirmation('Card payment processed successfully!', 'card');

    } else if (paymentMethod === 'net-banking') {
        // Simulate net banking validation
        const bank = document.getElementById('net-banking-bank').value;
        const accountNumber = document.getElementById('net-banking-account-number').value;
        const ifscCode = document.getElementById('net-banking-ifsc').value;

        if (bank && accountNumber && ifscCode) {
            showConfirmation('Net banking payment processed successfully!', 'net-banking');
        } else {
            alert('Please fill all the bank details.');
        }

    } else if (paymentMethod === 'upi') {
        // Simulate UPI validation
        const upiId = document.getElementById('upi-id').value;

        if (upiId) {
            showConfirmation('UPI payment processed successfully!', 'upi');
        } else {
            alert('Please enter your UPI ID.');
        }
    }
}

// Show confirmation message after successful payment
function showConfirmation(message, paymentMethod) {
    let selectedPlan = document.getElementById('selected-plan').innerText.split(' ')[2];
    let planPrice = parseFloat(selectedPlan === 'Basic' ? 19.99 : selectedPlan === 'Standard' ? 49.99 : 99.99);

    hideAllPaymentForms();
    document.getElementById('confirmation-message').innerText = message;
    document.getElementById('payment-confirmation').style.display = 'block';

    showReceipt(selectedPlan, planPrice, paymentMethod); // Show receipt modal
}

// Show the payment receipt
function showReceipt(plan, price, paymentMethod) {
    const receiptContent = `
        <h3>Receipt</h3>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Price:</strong> $${price.toFixed(2)}/month</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Transaction ID:</strong> ${generateTransactionId()}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    `;
    document.getElementById('receipt-content').innerHTML = receiptContent;
    document.getElementById('payment-receipt-modal').style.display = 'flex';
}

// Function to generate a random transaction ID
function generateTransactionId() {
    return Math.floor(Math.random() * 1000000000);
}

// Function to close the receipt modal
function closeReceiptModal() {
    document.getElementById('payment-receipt-modal').style.display = 'none';
}

// Function to download the receipt as a PDF
function downloadReceipt() {
    const receipt = document.getElementById('receipt-content').innerHTML;
    const blob = new Blob([receipt], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payment-receipt.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to print the receipt
function printReceipt() {
    const receipt = document.getElementById('receipt-content').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = receipt;
    window.print();
    document.body.innerHTML = originalContent;
}

// Show additional details after selecting a bank
function showNetBankingDetails() {
    const bank = document.getElementById('net-banking-bank').value;
    if (bank) {
        document.getElementById('net-banking-details').style.display = 'block';
    } else {
        document.getElementById('net-banking-details').style.display = 'none';
    }
}
