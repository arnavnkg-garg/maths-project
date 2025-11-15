const formulas = [
  // 🧮 Math
  {
    name: "Simple Interest",
    formula: "SI = (P × R × T) / 100",
    inputs: ["P", "R", "T"],
    solve: ({ P, R, T }) => (P * R * T) / 100,
  },
  {
    name: "addition",
    formula: "a + b",
    inputs: ["a", "b"],
    solve: ({a,b}) => a + b
  },
  {
    name: "subtraction",
    formula: "a - b",
    inputs: ["a", "b"],
    solve: ({a,b}) => a - b,
  },
  {
    name: "Multiply",
    formula: "a x b",
    inputs: ["a", "b"],
    solve: ({a,b}) => a * b,
  },
  {
  name: "Identity: (a + b)²",
  formula: "(a + b)² = a² + 2ab + b²",
  inputs: ["a", "b"],
  solve: ({ a, b }) => a * a + 2 * a * b + b * b,
},
{
  name: "Identity: (a - b)²",
  formula: "(a - b)² = a² - 2ab + b²",
  inputs: ["a", "b"],
  solve: ({ a, b }) => a * a - 2 * a * b + b * b,
},
{
  name: "Identity: (a + b)(a - b)",
  formula: "(a + b)(a - b) = a² - b²",
  inputs: ["a", "b"],
  solve: ({ a, b }) => a * a - b * b,
},
{
  name: "Identity: (a + b)³",
  formula: "(a + b)³ = a³ + 3a²b + 3ab² + b³",
  inputs: ["a", "b"],
  solve: ({ a, b }) => a ** 3 + 3 * a * a * b + 3 * a * b * b + b ** 3,
},
{
  name: "Identity: (a - b)³",
  formula: "(a - b)³ = a³ - 3a²b + 3ab² - b³",
  inputs: ["a", "b"],
  solve: ({ a, b }) => a ** 3 - 3 * a * a * b + 3 * a * b * b - b ** 3,
},
  {
    name: "Area of Square",
    formula: "A = side²",
    inputs: ["side"],
    solve: ({ side }) => side * side,
  },
  {
    name: "Area of Rectangle",
    formula: "A = length × width",
    inputs: ["length", "width"],
    solve: ({ length, width }) => length * width,
  },
  {
    name: "Area of Parallelogram",
    formula: "A = base × height",
    inputs: ["base", "height"],
    solve: ({ base, height }) => base * height,
  },
  {
    name: "Area of Rhombus",
    formula: "A = ½ × d₁ × d₂",
    inputs: ["d1", "d2"],
    solve: ({ d1, d2 }) => 0.5 * d1 * d2,
  },
  {
    name: "Area of Trapezium",
    formula: "A = ½(a + b) × h",
    inputs: ["a", "b", "h"],
    solve: ({ a, b, h }) => 0.5 * (a + b) * h,
  },
  {
    name: "Surface Area of Cube",
    formula: "SA = 6a²",
    inputs: ["a"],
    solve: ({ a }) => 6 * a * a,
  },
  {
    name: "Surface Area of Cuboid",
    formula: "SA = 2(lb + bh + hl)",
    inputs: ["l", "b", "h"],
    solve: ({ l, b, h }) => 2 * (l * b + b * h + h * l),
  },
  {
    name: "Volume of Cube",
    formula: "V = a³",
    inputs: ["a"],
    solve: ({ a }) => a * a * a,
  },
  {
    name: "Volume of Cuboid",
    formula: "V = l × b × h",
    inputs: ["l", "b", "h"],
    solve: ({ l, b, h }) => l * b * h,
  },
  {
    name: "Speed",
    formula: "Speed = Distance / Time",
    inputs: ["Distance", "Time"],
    solve: ({ Distance, Time }) => Distance / Time,
  },
  {
    name: "Pressure",
    formula: "P = F / A",
    inputs: ["F", "A"],
    solve: ({ F, A }) => F / A,
  },
  {
    name: "Density",
    formula: "ρ = Mass / Volume",
    inputs: ["Mass", "Volume"],
    solve: ({ Mass, Volume }) => Mass / Volume,
  },
  {
    name: "Quadratic Formula",
    formula: "x = (-b ± √(b² - 4ac)) / 2a",
    inputs: ["a", "b", "c"],
    solve: ({ a, b, c }) => {
      const d = b * b - 4 * a * c;
      if (d < 0) return "No real roots";
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      return `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    },
  },
];

function populateDropdown() {
  const select = document.getElementById("formulaSelect");
  formulas.forEach((f, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${f.name} — ${f.formula}`;
    select.appendChild(option);
  });
}

function renderInputs() {
  const index = document.getElementById("formulaSelect").value;
  const inputBox = document.getElementById("inputFields");
  inputBox.innerHTML = "";

  if (index === "") return;

  const formula = formulas[index];
  formula.inputs.forEach((input, i) => {
    const field = document.createElement("input");
    field.type = "text"; // allows fractions like 3/4
    field.placeholder = input;
    field.id = input;

    // Add Enter key listener to last input
    if (i === formula.inputs.length - 1) {
      field.addEventListener("keydown", (e) => {
        if (e.key === "Enter") solve();
      });
    }

    inputBox.appendChild(field);
  });

  // Focus first input
  if (formula.inputs.length > 0) {
    document.getElementById(formula.inputs[0]).focus();
  }
}
function solve() {
  const index = document.getElementById("formulaSelect").value;
  const resultBox = document.getElementById("resultBox");
  if (index === "") {
    resultBox.textContent = "Please select a formula.";
    return;
  }

  const formula = formulas[index];
  const values = {};
  let valid = true;

  formula.inputs.forEach((input) => {
    const raw = document.getElementById(input).value.trim();
let val;

if (raw.includes("/")) {
  const parts = raw.split("/");
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    val = parseFloat(parts[0]) / parseFloat(parts[1]);
  } else {
    valid = false;
  }
} else {
  val = parseFloat(raw);
  if (isNaN(val)) valid = false;
}

    if (isNaN(val)) valid = false;
    values[input] = val;
  });

  if (!valid) {
    resultBox.textContent = "Please enter all values correctly.";
    return;
  }

  const result = formula.solve(values);
  resultBox.textContent = `Result: ${typeof result === "number" ? result.toFixed(2) : result}`;
}

populateDropdown();
