// Function to show error icon and tooltip
function showErrorIcon(element, message) {
    var errorIcon = element.next('.error-icon');
    errorIcon.css('display', 'flex');
}

// Function to hide error icon and tooltip
function hideErrorIcon(element) {
    var errorIcon = element.next('.error-icon');
    errorIcon.css('display', 'none');
}

// Function to calculate tax
function calculateTax(grossIncome, extraIncome, deductions, age) {
    var totalIncome = grossIncome + extraIncome - deductions;

    var tax = 0;

    if (totalIncome > 800000) {
        if (age === '<40') {
            tax = 0.3 * (totalIncome - 800000);
        } else if (age === '>=40 & <60') {
            tax = 0.4 * (totalIncome - 800000);
        } else if (age === '>=60') {
            tax = 0.1 * (totalIncome - 800000);
        }
    }

    return tax;
}

$(document).ready(function () {
    // check for validity of each input field which is a text type, whether it contains a valid number or not
    $('input[type="text"]').on('input', function () {
        var value = $(this).val();
        if (isNaN(value)) {
            showErrorIcon($(this), 'Please enter a valid number.');
        } else {
            hideErrorIcon($(this));
        }
    });

    // Form submission
    $('#taxForm').submit(function (event) {
        event.preventDefault();

        var grossIncome = parseInt($('#grossIncome').val());
        var extraIncome = parseInt($('#extraIncome').val()) || 0;
        var deductions = parseInt($('#deductions').val()) || 0;
        var age = $('#age').val();

        var isValid = true;

        // Validate gross income
        if (isNaN(grossIncome) || grossIncome < 0) {
            showErrorIcon($('#grossIncome'), 'Please enter a valid gross income.');
            isValid = false;
        } else {
            hideErrorIcon($('#grossIncome'));
        }

        // Validate age
        if (age === '') {
            showErrorIcon($('#age'), 'Please select an age.');
            isValid = false;
        } else {
            hideErrorIcon($('#age'));
        }

        if (isValid) {
            // Calculate tax
            var tax = calculateTax(grossIncome, extraIncome, deductions, age);

            var income = grossIncome + extraIncome - deductions - tax;
            
            $('.modal-income').html(`${income.toFixed(2)}`);
            $('.modal-tax').html(`${tax.toFixed(2)}`);

            // Display modal with tax information
            $('#taxModal').modal('show');
        }
    });
});


$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$('.tdnn').click(function () {
    $("body").toggleClass('light');
    $(".moon").toggleClass('sun');
    $(".tdnn").toggleClass('day');
});