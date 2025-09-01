const fs = require('fs');


const input = JSON.parse(fs.readFileSync('input.json', 'utf-8'));

const k = input.keys.k;
const m = k - 1;

const roots = [];
for (let i = 1; i <= k; ++i) {
    const root = input[i.toString()];
    roots.push(BigInt(parseInt(root.value, parseInt(root.base))));
}

function getMonicCoefficients(roots) {
    let n = roots.length;
    let coeffs = [BigInt(1)];
    for (let i = 0; i < n; i++) {
        coeffs.push(BigInt(0));
        for (let j = coeffs.length - 1; j > 0; j--) {
            coeffs[j] = coeffs[j] - roots[i] * coeffs[j-1];
        }
    }
    return coeffs.map(x => x.toString()); 
}

const coefficients = getMonicCoefficients(roots);

console.log("Coefficients from highest to lowest degree:");
console.log(coefficients);
