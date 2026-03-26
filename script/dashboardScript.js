// ================= UNIT MAP =================
/*
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "loginForm.html";
}
  */
const units = {
  length: ["FEET", "INCHES", "YARDS", "CENTIMETERS"],
  weight: ["KILOGRAM", "GRAM", "POUND"],
  volume: ["LITRE", "MILLILITRE", "GALLON"],
  temperature: ["C", "F", "K"],
};

// ================= DOM =================
const typeButtons = document.querySelectorAll(".type");
const actionButtons = document.querySelectorAll(".action");

const unit1 = document.getElementById("unit1");
const unit2 = document.getElementById("unit2");

const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

const operatorBox = document.getElementById("operatorBox");
const value2Box = document.getElementById("value2Box");

const calculateBtn = document.getElementById("calculateBtn");
const resultText = document.getElementById("resultText");

// ================= STATE =================
let currentType = "length";
let currentAction = "compare";

// ================= INIT =================
updateUnits();
updateUI();

// ================= TYPE SWITCH =================
typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".type.active").classList.remove("active");
    btn.classList.add("active");

    currentType = btn.dataset.type;
    updateUnits();

    // 🚫 Disable arithmetic for temperature
    const arithmeticBtn = document.querySelector('[data-action="arithmetic"]');

    if (currentType === "temperature") {
      arithmeticBtn.disabled = true;

      // auto switch if currently arithmetic
      if (currentAction === "arithmetic") {
        document.querySelector('[data-action="convert"]').click();
      }
    } else {
      arithmeticBtn.disabled = false;
    }
  });
});

// ================= ACTION SWITCH =================
actionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".action.active").classList.remove("active");
    btn.classList.add("active");

    currentAction = btn.dataset.action;
    updateUI();
  });
});

// ================= UPDATE UI =================
function updateUI() {
  if (currentAction === "convert") {
    value2Box.style.display = "flex";
    value2.style.display = "none";
    operatorBox.style.display = "none";
  } else if (currentAction === "compare") {
    value2Box.style.display = "flex";
    value2.style.display = "block";
    operatorBox.style.display = "none";
  } else if (currentAction === "arithmetic") {
    value2Box.style.display = "flex";
    value2.style.display = "block";
    operatorBox.style.display = "block";
  }
}

// ================= UPDATE UNITS =================
function updateUnits() {
  const list = units[currentType];

  unit1.innerHTML = "";
  unit2.innerHTML = "";

  list.forEach((u) => {
    unit1.innerHTML += `<option value="${u}">${u}</option>`;
    unit2.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

// ================= CALCULATE =================
calculateBtn.addEventListener("click", () => {
  const v1 = parseFloat(value1.value);
  const v2 = parseFloat(value2.value);

  const u1 = unit1.value;
  const u2 = unit2.value;

  // Validation
  if (isNaN(v1)) {
    alert("Enter Value 1");
    return;
  }

  let result;

  // ================= CONVERT =================
  if (currentAction === "convert") {
    result = convert(v1, u1, u2);
  }

  // ================= COMPARE =================
  else if (currentAction === "compare") {
    if (isNaN(v2)) {
      alert("Enter Value 2");
      return;
    }
    result = compare(v1, u1, v2, u2);
  }

  // ================= ARITHMETIC =================
  else if (currentAction === "arithmetic") {
    if (isNaN(v2)) {
      alert("Enter Value 2");
      return;
    }
    result = arithmetic(v1, u1, v2, u2);
  }

  resultText.innerText = result;
});

// ================= TEMP LOGIC =================
// ⚠ Replace these with backend API later

function convert(v1, u1, u2) {
  return `${v1} ${u1} → ${u2}`;
}

function compare(v1, u1, v2, u2) {
  return v1 === v2 ? "Equal" : v1 > v2 ? "Greater" : "Smaller";
}

function arithmetic(v1, u1, v2, u2) {
  return `${v1 + v2} (${u1})`;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "loginForm.html";
});
