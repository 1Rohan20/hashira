const fs = require('fs');


const input = JSON.parse(fs.readFileSync('imput2.json', 'utf-8'));

function toDecimal(base, value) {
  return parseInt(value, base);
}

const n = input.keys.n;
const k = input.keys.k;

let roots = [];
Object.keys(input).forEach((key) => {
  if (key !== "keys") {
    const base = parseInt(input[key].base, 10);
    const val = input[key].value;
    roots.push(toDecimal(base, val));
  }
});

// Just to be safe, sort them
roots.sort((a, b) => a - b);

console.log("Decoded roots:", roots);

// ---- Take first k roots to build polynomial ----
const selectedRoots = roots.slice(0, k);
console.log("Using roots (first k):", selectedRoots);

// ---- Build polynomial coefficients ----
// For roots r1, r2, ..., rm
// Polynomial = (x - r1)(x - r2)... = x^m + a_{m-1}x^(m-1) + ... + a0
function buildPolynomial(roots) {
  let coeffs = [1]; // start with "1"

  for (let r of roots) {
    let newCoeffs = new Array(coeffs.length + 1).fill(0);
    for (let i = 0; i < coeffs.length; i++) {
      newCoeffs[i] += -r * coeffs[i]; // multiply by (-r)
      newCoeffs[i + 1] += coeffs[i];  // multiply by x
    }
    coeffs = newCoeffs;
  }
  return coeffs;
}

const coeffs = buildPolynomial(selectedRoots);

// ---- Output ----
console.log("Polynomial coefficients (low → high degree):");
console.log(coeffs); 
// Example: [c0, c1, c2, ...] means c0 + c1*x + c2*x^2 + ...
