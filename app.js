let arabic = false;

function toggleLanguage() {
  arabic = !arabic;

  document.documentElement.lang = arabic ? "ar" : "en";
  document.documentElement.dir = arabic ? "rtl" : "ltr";

  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = arabic ? el.dataset.ar : el.dataset.en;
  });

  document.getElementById("langButton").textContent =
    arabic ? "English" : "العربية";
}

function openCalculator(type) {
  const panel = document.getElementById("calculatorPanel");
  const title = document.getElementById("panelTitle");
  const category = document.getElementById("panelCategory");
  const content = document.getElementById("calculatorContent");

  panel.style.display = "block";

  const names = {
    scientific: arabic ? "الحاسبة العلمية" : "Scientific Calculator",
    finance: arabic ? "الحاسبات المالية" : "Finance Calculator",
    health: arabic ? "الحاسبات الصحية" : "Health Calculator",
    conversion: arabic ? "تحويل الوحدات" : "Unit Converter",
    currency: arabic ? "تحويل العملات" : "Currency Converter",
    general: arabic ? "الحاسبات العامة" : "General Calculator"
  };

  title.textContent = names[type];
  category.textContent = arabic ? "الحاسبات" : "CALCULATOR";

  if (type === "scientific") {
    scientificCalculator(content);
  } else if (type === "health") {
    bmiCalculator(content);
  } else if (type === "finance") {
    financeCalculator(content);
  } else if (type === "conversion") {
    conversionCalculator(content);
  } else if (type === "currency") {
    currencyCalculator(content);
  } else {
    generalCalculator(content);
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeCalculator() {
  document.getElementById("calculatorPanel").style.display = "none";
}

function scientificCalculator(container) {
  container.innerHTML = `
    <div class="calc-box">
      <input class="calc-display" id="display" value="" readonly>
      <div class="calc-buttons">
        <button onclick="clearCalc()">AC</button>
        <button onclick="addCalc('(')">(</button>
        <button onclick="addCalc(')')">)</button>
        <button onclick="addCalc('/')">÷</button>

        <button onclick="addCalc('7')">7</button>
        <button onclick="addCalc('8')">8</button>
        <button onclick="addCalc('9')">9</button>
        <button onclick="addCalc('*')">×</button>

        <button onclick="addCalc('4')">4</button>
        <button onclick="addCalc('5')">5</button>
        <button onclick="addCalc('6')">6</button>
        <button onclick="addCalc('-')">−</button>

        <button onclick="addCalc('1')">1</button>
        <button onclick="addCalc('2')">2</button>
        <button onclick="addCalc('3')">3</button>
        <button onclick="addCalc('+')">+</button>

        <button onclick="addCalc('0')">0</button>
        <button onclick="addCalc('.')">.</button>
        <button onclick="addCalc('%')">%</button>
        <button onclick="calculate()">=</button>
      </div>
    </div>
  `;
}

function addCalc(value) {
  const display = document.getElementById("display");
  if (display) display.value += value;
}

function clearCalc() {
  const display = document.getElementById("display");
  if (display) display.value = "";
}

function calculate() {
  const display = document.getElementById("display");

  if (!display) return;

  try {
    const expression = display.value
      .replace(/%/g, "/100");

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      throw new Error();
    }

    display.value = Function('"use strict";return (' + expression + ')')();
  } catch {
    display.value = "Error";
  }
}

function bmiCalculator(container) {
  container.innerHTML = `
    <div class="tool-form">
      <label>${arabic ? "الوزن بالكيلوغرام" : "Weight (kg)"}</label>
      <input id="bmiWeight" type="number" placeholder="70">

      <label>${arabic ? "الطول بالسنتيمتر" : "Height (cm)"}</label>
      <input id="bmiHeight" type="number" placeholder="175">

      <button class="tool-button" onclick="calculateBMI()">
        ${arabic ? "احسب BMI" : "Calculate BMI"}
      </button>

      <div id="toolResult" class="tool-result">
        ${arabic ? "أدخل البيانات لحساب النتيجة." : "Enter your data to calculate."}
      </div>
    </div>
  `;
}

function calculateBMI() {
  const weight = Number(document.getElementById("bmiWeight").value);
  const height = Number(document.getElementById("bmiHeight").value) / 100;

  if (!weight || !height) return;

  const bmi = weight / (height * height);

  document.getElementById("toolResult").textContent =
    (arabic ? "مؤشر كتلة الجسم: " : "BMI: ") + bmi.toFixed(2);
}

function financeCalculator(container) {
  container.innerHTML = `
    <div class="tool-form">
      <label>${arabic ? "المبلغ الأساسي" : "Principal"}</label>
      <input id="financeAmount" type="number" placeholder="10000">

      <label>${arabic ? "نسبة الفائدة السنوية %" : "Annual interest %"}</label>
      <input id="financeRate" type="number" placeholder="5">

      <label>${arabic ? "المدة بالسنوات" : "Years"}</label>
      <input id="financeYears" type="number" placeholder="5">

      <button class="tool-button" onclick="calculateFinance()">
        ${arabic ? "احسب" : "Calculate"}
      </button>

      <div id="toolResult" class="tool-result"></div>
    </div>
  `;
}

function calculateFinance() {
  const amount = Number(document.getElementById("financeAmount").value);
  const rate = Number(document.getElementById("financeRate").value) / 100;
  const years = Number(document.getElementById("financeYears").value);

  if (!amount || !years) return;

  const interest = amount * rate * years;
  const total = amount + interest;

  document.getElementById("toolResult").textContent =
    (arabic ? "الإجمالي: " : "Total: ") + total.toFixed(2);
}

function conversionCalculator(container) {
  container.innerHTML = `
    <div class="tool-form">
      <label>${arabic ? "القيمة" : "Value"}</label>
      <input id="convertValue" type="number" value="1">

      <label>${arabic ? "التحويل" : "Conversion"}</label>
      <select id="conversionType">
        <option value="kmmi">km → mi</option>
        <option value="mikm">mi → km</option>
        <option value="kglb">kg → lb</option>
        <option value="lbkg">lb → kg</option>
        <option value="cmft">cm → ft</option>
        <option value="ftcm">ft → cm</option>
        <option value="c_f">°C → °F</option>
        <option value="f_c">°F → °C</option>
      </select>

      <button class="tool-button" onclick="convertValue()">
        ${arabic ? "تحويل" : "Convert"}
      </button>

      <div id="toolResult" class="tool-result"></div>
    </div>
  `;
}

function convertValue() {
  const value = Number(document.getElementById("convertValue").value);
  const type = document.getElementById("conversionType").value;

  const formulas = {
    kmmi: value => value * 0.621371,
    mikm: value => value * 1.609344,
    kglb: value => value * 2.20462,
    lbkg: value => value * 0.453592,
    cmft: value => value / 30.48,
    ftcm: value => value * 30.48,
    c_f: value => value * 9 / 5 + 32,
    f_c: value => (value - 32) * 5 / 9
  };

  const result = formulas[type](value);

  document.getElementById("toolResult").textContent =
    (arabic ? "النتيجة: " : "Result: ") + result.toFixed(4);
}

function currencyCalculator(container) {
  container.innerHTML = `
    <div class="tool-form">
      <label>${arabic ? "المبلغ" : "Amount"}</label>
      <input id="currencyAmount" type="number" value="1">

      <label>${arabic ? "من العملة" : "From currency"}</label>
      <select id="currencyFrom">
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
        <option>LYD</option>
      </select>

      <label>${arabic ? "إلى العملة" : "To currency"}</label>
      <select id="currencyTo">
        <option>EUR</option>
        <option>USD</option>
        <option>GBP</option>
        <option>LYD</option>
      </select>

      <button class="tool-button" onclick="convertCurrency()">
        ${arabic ? "تحويل" : "Convert"}
      </button>

      <div id="toolResult" class="tool-result">
        ${arabic ? "أسعار تقريبية للنسخة التجريبية." : "Approximate rates for the demo."}
      </div>
    </div>
  `;
}

function convertCurrency() {
  const amount = Number(document.getElementById("currencyAmount").value);
  const from = document.getElementById("currencyFrom").value;
  const to = document.getElementById("currencyTo").value;

  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    LYD: 6.4
  };

  const result = amount / rates[from] * rates[to];

  document.getElementById("toolResult").textContent =
    (arabic ? "النتيجة: " : "Result: ") + result.toFixed(2) + " " + to;
}

function generalCalculator(container) {
  container.innerHTML = `
    <div class="tool-form">
      <label>${arabic ? "العدد الأول" : "First number"}</label>
      <input id="generalA" type="number">

      <label>${arabic ? "العدد الثاني" : "Second number"}</label>
      <input id="generalB" type="number">

      <select id="generalOp">
        <option value="+">+</option>
        <option value="-">−</option>
        <option value="*">×</option>
        <option value="/">÷</option>
      </select>

      <button class="tool-button" onclick="generalCalculate()">
        ${arabic ? "احسب" : "Calculate"}
      </button>

      <div id="toolResult" class="tool-result"></div>
    </div>
  `;
}

function generalCalculate() {
  const a = Number(document.getElementById("generalA").value);
  const b = Number(document.getElementById("generalB").value);
  const op = document.getElementById("generalOp").value;

  let result = 0;

  if (op === "+") result = a + b;
  if (op === "-") result = a - b;
  if (op === "*") result = a * b;
  if (op === "/") result = b === 0 ? "Error" : a / b;

  document.getElementById("toolResult").textContent =
    (arabic ? "النتيجة: " : "Result: ") + result;
}
