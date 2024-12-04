document.getElementById('calculator-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const car = parseFloat(document.getElementById('car').value) || 0;
    const water = parseFloat(document.getElementById('water').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;

    // Carbon emission factors (in kg CO2 per unit)
    const electricityFactor = 0.475; // kg CO2 per kWh
    const carFactor = 0.192; // kg CO2 per km
    const waterFactor = 0.001; // kg CO2 per liter
    const gasFactor = 2.5; // kg CO2 per liter

    // Calculate monthly and annual emissions
    const monthlyEmissions = 
        (electricity * 30 * electricityFactor) +
        (car * 30 * carFactor) +
        (gas * gasFactor);

    const annualEmissions = 
        (electricity * 365 * electricityFactor) +
        (car * 365 * carFactor) +
        (water * 365 * waterFactor) +
        (gas * 12 * gasFactor);

    // Update results
    document.getElementById('monthly-output').querySelector('span').textContent = monthlyEmissions.toFixed(2);
    document.getElementById('annual-output').querySelector('span').textContent = annualEmissions.toFixed(2);

    // Display results
    document.getElementById('results').style.display = 'block';
});
