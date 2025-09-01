const fs = require("fs")
const input = JSON.parse(fs.readFileSync('input.json', 'utf-8'));

function toDecimal(base, value) {
  return parseInt(value, base);
}

let roots = [];
Object.keys(input).forEach((key) => {
  if (key !== "keys") {
    const base = parseInt(input[key].base, 10);
    roots.push(toDecimal(base, input[key].value));
  }
});

roots.sort((a, b) => a - b);
console.log("Decoded roots:", roots);


const k = input.keys.k;
const selected = roots.slice(0, k);
console.log("Using roots:", selected);


function solveQuadratic(roots) {
  const [x1, x2, x3] = roots;


  const A = [
    [x1*x1, x1, 1],
    [x2*x2, x2, 1],
    [x3*x3, x3, 1]
  ];
  const B = [0, 0, 0];

 
  function det(mat) {
    return (
      mat[0][0]*(mat[1][1]*mat[2][2] - mat[1][2]*mat[2][1]) -
      mat[0][1]*(mat[1][0]*mat[2][2] - mat[1][2]*mat[2][0]) +
      mat[0][2]*(mat[1][0]*mat[2][1] - mat[1][1]*mat[2][0])
    );
  }

  const D = det(A);
  if (D === 0) {
    console.log("No unique quadratic fits these 3 roots.");
    return null;
  }


  let a = 1;
  let b = -(x1 + x2);
  let c = x1*x2;

  let check = a*x3*x3 + b*x3 + c;
  console.log("Check with 3rd root:", check);

  return [c, b, a]; 
}

const coeffs = solveQuadratic(selected);
console.log("Quadratic coefficients [c0, c1, c2]:", coeffs);
