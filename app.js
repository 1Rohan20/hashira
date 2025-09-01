const fs = require('fs');

// Read and parse the input JSON file
const input = JSON.parse(fs.readFileSync('input.json', 'utf-8'));

function toDecimal(base, value) {
  return parseInt(value, base);
}

const n = input.keys.n;
const k = input.keys.k;
const m = k - 1;

// Convert first k roots to decimal (BigInt)
const roots = [];
for (let i = 1; i <= k; ++i) {
    const root = input[i.toString()];
    roots.push(BigInt(parseInt(root.value, parseInt(root.base))));
}

// Vieta’s formulas for a monic polynomial
// Coefficients: [c_m, c_{m-1}, ..., c_0] for x^m + c_{m-1}x^{m-1} + ... + c_0
function getMonicCoefficients(roots) {
    let n = roots.length;
    // Start with [2] (which stands for p(x) = 1)
    let coeffs = [BigInt(1)];
    for (let i = 0; i < n; i++) {
        coeffs.push(BigInt(0));
        for (let j = coeffs.length - 1; j > 0; j--) {
            coeffs[j] = coeffs[j] - roots[i] * coeffs[j-1];
        }
    }
    return coeffs.map(x => x.toString()); // Convert back to string for output
}

const coeffs = buildPolynomial(selectedRoots);

// ---- Output ----
console.log("Polynomial coefficients (low → high degree):");
console.log(coeffs); 
// Example: [c0, c1, c2, ...] means c0 + c1*x + c2*x^2 + ...
