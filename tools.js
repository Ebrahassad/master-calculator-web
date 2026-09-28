// ============================================================
// أدوات الويب: الصحة، المال، الحسابات العامة، تحويل الوحدات، الملاحظات
// نفس منطق تطبيق الجوال
// ============================================================
const T = (ar, en) => ({ ar, en });
const num = (v) => parseFloat(String(v).replace(',', '.')) || 0;
const f2 = (x) => (isFinite(x) ? x.toFixed(2) : '—');

const ACTIVITY = [
  ['1.2', T('خامل (بدون رياضة)', 'Sedentary')],
  ['1.375', T('نشاط خفيف', 'Light activity')],
  ['1.55', T('نشاط متوسط', 'Moderate activity')],
  ['1.725', T('نشاط عالٍ', 'Active')],
  ['1.9', T('نشاط عالٍ جدًا', 'Very active')],
];
const GENDER = [['m', T('ذكر', 'Male')], ['f', T('أنثى', 'Female')]];

const bmrOf = (v) => 10 * v.w + 6.25 * v.h - 5 * v.age + (v.g === 'm' ? 5 : -161);
const log10 = (x) => (x > 0 ? Math.log(x) / Math.LN10 : 0);

// كل حاسبة: fields (name, label, default, options?) و run(values, lang) => [[label, value], ...]
const TOOLS = {
  health: [
    { id: 'bmi', title: T('مؤشر كتلة الجسم (BMI)', 'BMI Calculator'),
      fields: [['w', T('الوزن (كجم)', 'Weight (kg)'), 70], ['h', T('الطول (سم)', 'Height (cm)'), 175]],
      run: (v, L) => {
        const m = v.h / 100; const b = m > 0 ? v.w / (m * m) : 0;
        const s = b < 18.5 ? T('وزن منخفض', 'Underweight') : b < 25 ? T('وزن مثالي ورائع', 'Normal - Great!') : b < 30 ? T('زيادة في الوزن', 'Overweight') : T('سمنة مفرطة', 'Obese');
        return [[T('النتيجة', 'Result')[L], b.toFixed(1)], [T('النتيجة الصحية', 'Health Result')[L], s[L]]];
      } },
    { id: 'bmr', title: T('معدل الأيض الأساسي (BMR)', 'BMR (Basal Metabolic Rate)'),
      fields: [['g', T('الجنس', 'Gender'), 'm', GENDER], ['w', T('الوزن (كجم)', 'Weight (kg)'), 70], ['h', T('الطول (سم)', 'Height (cm)'), 175], ['age', T('العمر (سنة)', 'Age (years)'), 25]],
      run: (v, L) => [['BMR', `${bmrOf(v).toFixed(0)} ${T('كالوري/يوم', 'kcal/day')[L]}`]] },
    { id: 'cal', title: T('الاحتياج اليومي من السعرات', 'Daily Calorie Needs'),
      fields: [['g', T('الجنس', 'Gender'), 'm', GENDER], ['w', T('الوزن (كجم)', 'Weight (kg)'), 70], ['h', T('الطول (سم)', 'Height (cm)'), 175], ['age', T('العمر (سنة)', 'Age (years)'), 25], ['act', T('مستوى النشاط', 'Activity Level'), '1.55', ACTIVITY]],
      run: (v, L) => { const m = bmrOf(v) * num(v.act); return [[T('الاحتياج اليومي', 'Daily need')[L], `${m.toFixed(0)} kcal`], [T('فقدان الوزن (عجز 20%)', 'Weight loss (20% deficit)')[L], `${(m * 0.8).toFixed(0)} kcal`], [T('زيادة الوزن (فائض 15%)', 'Weight gain (15% surplus)')[L], `${(m * 1.15).toFixed(0)} kcal`]]; } },
    { id: 'ideal', title: T('الوزن المثالي', 'Ideal Body Weight'),
      fields: [['g', T('الجنس', 'Gender'), 'm', GENDER], ['h', T('الطول (سم)', 'Height (cm)'), 175]],
      run: (v, L) => { const i = (v.g === 'm' ? 50 : 45.5) + 2.3 * (v.h / 2.54 - 60); return [[T('الوزن المثالي', 'Ideal weight')[L], `${Math.max(0, i).toFixed(1)} kg`]]; } },
    { id: 'fat', title: T('نسبة الدهون في الجسم', 'Body Fat Percentage'),
      fields: [['g', T('الجنس', 'Gender'), 'm', GENDER], ['h', T('الطول (سم)', 'Height (cm)'), 175], ['neck', T('محيط الرقبة (سم)', 'Neck (cm)'), 38], ['waist', T('محيط الخصر (سم)', 'Waist (cm)'), 85], ['hip', T('محيط الورك (سم) - للإناث', 'Hip (cm) - females'), 95]],
      run: (v, L) => {
        const bf = v.g === 'm' ? 495 / (1.0324 - 0.19077 * log10(v.waist - v.neck) + 0.15456 * log10(v.h)) - 450
          : 495 / (1.29579 - 0.35004 * log10(v.waist + v.hip - v.neck) + 0.221 * log10(v.h)) - 450;
        return [[T('نسبة الدهون', 'Body fat')[L], isFinite(bf) ? `${bf.toFixed(1)}%` : '—']];
      } },
    { id: 'water', title: T('الاحتياج اليومي من الماء', 'Daily Water Intake'),
      fields: [['w', T('الوزن (كجم)', 'Weight (kg)'), 70]],
      run: (v, L) => [[T('الماء اليومي', 'Daily water')[L], `${(v.w * 0.033).toFixed(2)} ${T('لتر/يوم', 'liters/day')[L]}`]] },
    { id: 'hr', title: T('نبضات القلب المستهدفة', 'Target Heart Rate Zones'),
      fields: [['age', T('العمر (سنة)', 'Age (years)'), 25]],
      run: (v, L) => { const m = 220 - v.age; return [[T('أقصى معدل نبض', 'Maximum Heart Rate')[L], `${m.toFixed(0)} ${T('نبضة/دقيقة', 'bpm')[L]}`], [T('منطقة حرق الدهون (50-65%)', 'Fat Burn Zone (50-65%)')[L], `${(m * 0.5).toFixed(0)} - ${(m * 0.65).toFixed(0)}`], [T('منطقة اللياقة القلبية (65-85%)', 'Cardio Zone (65-85%)')[L], `${(m * 0.65).toFixed(0)} - ${(m * 0.85).toFixed(0)}`]]; } },
    { id: 'hba1c', title: T('متوسط السكر التراكمي (HbA1c)', 'HbA1c Estimated Glucose'),
      fields: [['a', T('نسبة السكر التراكمي (%)', 'HbA1c (%)'), 6]],
      run: (v, L) => [[T('متوسط السكر التقديري', 'Estimated Average Glucose')[L], `${(28.7 * v.a - 46.7).toFixed(0)} mg/dL`]] },
    { id: 'preg', title: T('موعد الولادة المتوقع', 'Pregnancy Due Date'),
      fields: [['d', T('كم يومًا مضى على آخر دورة شهرية', 'Days since last period'), 70]],
      run: (v, L) => { const left = 280 - Math.floor(v.d); return [[T('الأسبوع الحالي تقريبًا', 'Approx. Current Week')[L], `${Math.floor(v.d / 7)} ${T('أسبوع', 'week')[L]}`], [T('الأيام المتبقية تقريبًا', 'Approx. Days Left')[L], left > 0 ? `${left} ${T('يوم', 'days')[L]}` : T('قريبًا جدًا', 'Very soon')[L]]]; } },
  ],
  finance: [
    { id: 'vat', title: T('ضريبة القيمة المضافة (VAT)', 'VAT Calculator'),
      fields: [['a', T('المبلغ الأساسي', 'Principal Amount'), 1000], ['r', T('النسبة (%)', 'Rate (%)'), 15]],
      run: (v, L) => { const t = v.a * v.r / 100; return [[T('قيمة الضريبة', 'Tax amount')[L], f2(t)], [T('الإجمالي الشامل', 'Grand Total')[L], f2(v.a + t)]]; } },
    { id: 'loan', title: T('القروض والقسط الشهري', 'Loan / EMI Calculator'),
      fields: [['a', T('مبلغ القرض', 'Loan amount'), 10000], ['r', T('الفائدة السنوية (%)', 'Annual interest (%)'), 8], ['m', T('المدة (أشهر)', 'Duration (months)'), 12]],
      run: (v, L) => { const m = v.m > 0 ? v.m : 1; const i = v.a * v.r / 100 * m / 12; return [[T('القسط الشهري', 'Monthly Installment')[L], f2((v.a + i) / m)], [T('إجمالي الفوائد', 'Total Interest')[L], f2(i)], [T('الإجمالي الشامل', 'Grand Total')[L], f2(v.a + i)]]; } },
    { id: 'invest', title: T('الاستثمار والأرباح', 'Investment & Profit'),
      fields: [['a', T('المبلغ', 'Amount'), 5000], ['r', T('العائد السنوي (%)', 'Annual return (%)'), 10], ['y', T('المدة (سنوات)', 'Years'), 2]],
      run: (v, L) => { const p = v.a * v.r / 100 * (v.y > 0 ? v.y : 1); return [[T('صافي الربح', 'Net Profit')[L], f2(p)], [T('الإجمالي الشامل', 'Grand Total')[L], f2(v.a + p)]]; } },
    { id: 'compound', title: T('الفائدة المركبة', 'Compound Interest'),
      fields: [['a', T('المبلغ', 'Amount'), 1000], ['r', T('الفائدة (%)', 'Interest (%)'), 5], ['y', T('المدة (سنوات)', 'Years'), 10]],
      run: (v, L) => { const r = v.a * Math.pow(1 + v.r / 100, v.y > 0 ? v.y : 1); return [[T('المبلغ النهائي', 'Final Amount')[L], f2(r)], [T('صافي الربح', 'Net Profit')[L], f2(r - v.a)]]; } },
    { id: 'simple', title: T('الفائدة البسيطة', 'Simple Interest'),
      fields: [['a', T('المبلغ', 'Amount'), 1000], ['r', T('الفائدة (%)', 'Interest (%)'), 5], ['y', T('المدة (سنوات)', 'Years'), 3]],
      run: (v, L) => { const i = v.a * v.r / 100 * (v.y > 0 ? v.y : 1); return [[T('إجمالي الفوائد', 'Total Interest')[L], f2(i)], [T('المبلغ النهائي', 'Final Amount')[L], f2(v.a + i)]]; } },
    { id: 'margin', title: T('هامش الربح', 'Profit Margin'),
      fields: [['p', T('سعر البيع', 'Selling Price'), 150], ['c', T('سعر التكلفة', 'Cost Price'), 100]],
      run: (v, L) => [[T('صافي الربح', 'Net Profit')[L], f2(v.p - v.c)], [T('نسبة هامش الربح', 'Profit Margin %')[L], `${v.p ? ((v.p - v.c) / v.p * 100).toFixed(1) : 0}%`]] },
    { id: 'be', title: T('نقطة التعادل', 'Break-even Point'),
      fields: [['p', T('سعر الوحدة', 'Price per Unit'), 50], ['c', T('تكلفة الوحدة المتغيرة', 'Variable Cost per Unit'), 30], ['f', T('التكاليف الثابتة', 'Fixed Costs'), 10000]],
      run: (v, L) => [[T('عدد الوحدات لتحقيق التعادل', 'Units for break-even')[L], v.p - v.c > 0 ? Math.ceil(v.f / (v.p - v.c)) : '—']] },
    { id: 'save', title: T('هدف الادخار الشهري', 'Monthly Savings Goal'),
      fields: [['g', T('المبلغ المستهدف', 'Target Amount'), 12000], ['m', T('المدة (أشهر)', 'Duration (months)'), 12]],
      run: (v, L) => [[T('الادخار الشهري المطلوب', 'Required Monthly Saving')[L], f2(v.g / (v.m > 0 ? v.m : 1))]] },
    { id: 'zakat', title: T('زكاة المال', 'Zakat Calculator'),
      fields: [['a', T('إجمالي المال المدّخر', 'Total savings'), 10000], ['n', T('قيمة النصاب', 'Nisab value'), 5000]],
      run: (v, L) => [[T('الزكاة الواجبة (2.5%)', 'Zakat due (2.5%)')[L], v.a >= v.n ? f2(v.a * 0.025) : '0.00']] },
  ],
  general: [
    { id: 'discount', title: T('الخصم والنسبة', 'Discount Calculator'),
      fields: [['a', T('السعر الأصلي', 'Original Price'), 100], ['d', T('نسبة الخصم (%)', 'Discount (%)'), 20]],
      run: (v, L) => { const s = v.a * v.d / 100; return [[T('مقدار التوفير', 'Amount Saved')[L], f2(s)], [T('السعر النهائي', 'Final Price')[L], f2(v.a - s)]]; } },
    { id: 'percent', title: T('النسب المئوية', 'Simple Percentage'),
      fields: [['p', T('النسبة (%)', 'Percentage (%)'), 15], ['a', T('القيمة', 'Value'), 200]],
      run: (v, L) => [[`${v.p}% ${T('من', 'of')[L]} ${v.a}`, f2(v.a * v.p / 100)]] },
    { id: 'tip', title: T('الإكرامية وتقسيم الفاتورة', 'Tip & Bill Split'),
      fields: [['b', T('مبلغ الفاتورة', 'Bill Amount'), 100], ['t', T('نسبة الإكرامية (%)', 'Tip (%)'), 10], ['n', T('عدد الأشخاص', 'Number of People'), 2]],
      run: (v, L) => { const tip = v.b * v.t / 100; const tot = v.b + tip; return [[T('مبلغ الإكرامية', 'Tip Amount')[L], f2(tip)], [T('الإجمالي الشامل', 'Grand Total')[L], f2(tot)], [T('نصيب الفرد', 'Per Person')[L], f2(tot / (v.n > 0 ? v.n : 1))]]; } },
    { id: 'age', title: T('حاسبة العمر بالتفصيل', 'Detailed Age Calculator'),
      fields: [['bd', T('تاريخ الميلاد', 'Birth date'), '2000-01-01', null, 'date']],
      run: (v, L, raw) => {
        const b = new Date(raw.bd); const n = new Date();
        if (isNaN(b)) return [[T('النتيجة', 'Result')[L], '—']];
        let y = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth(), d = n.getDate() - b.getDate();
        if (d < 0) { m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
        if (m < 0) { y--; m += 12; }
        return [[T('النتيجة', 'Result')[L], `${y} ${T('سنة', 'years')[L]}, ${m} ${T('شهر', 'months')[L]}, ${d} ${T('يوم', 'days')[L]}`], [T('إجمالي الأيام منذ الميلاد', 'Total days since birth')[L], Math.floor((n - b) / 864e5)]];
      } },
    { id: 'datediff', title: T('الفرق بين تاريخين', 'Date Difference'),
      fields: [['d1', T('من', 'From'), '2026-01-01', null, 'date'], ['d2', T('إلى', 'To'), '2026-12-31', null, 'date']],
      run: (v, L, raw) => {
        const days = Math.abs(Math.round((new Date(raw.d2) - new Date(raw.d1)) / 864e5));
        if (isNaN(days)) return [[T('النتيجة', 'Result')[L], '—']];
        return [[T('النتيجة', 'Result')[L], `${days} ${T('يوم', 'days')[L]}`], [T('بالأسابيع تقريبًا', 'Approx. in weeks')[L], (days / 7).toFixed(1)], [T('بالأشهر تقريبًا', 'Approx. in months')[L], (days / 30.44).toFixed(1)]];
      } },
    { id: 'gpa', title: T('المعدل التراكمي (GPA)', 'GPA Calculator'),
      fields: [['g', T('الدرجات مفصولة بفاصلة (0-4)', 'Grades, comma separated (0-4)'), '4, 3.5, 3', null, 'text'], ['c', T('الساعات المعتمدة بنفس الترتيب', 'Credit hours in same order'), '3, 3, 4', null, 'text']],
      run: (v, L, raw) => {
        const g = raw.g.split(',').map(num), c = raw.c.split(',').map(num);
        let p = 0, h = 0; g.forEach((x, i) => { const cr = c[i] ?? 0; p += x * cr; h += cr; });
        return [[T('المعدل التراكمي (GPA)', 'GPA')[L], h ? (p / h).toFixed(2) : '0.00']];
      } },
  ],
};

// ---------- وحدات التحويل ----------
const UNITS = {
  length: { t: T('الطول والمسافة', 'Length & Distance'), u: [['mm', 'مليمتر', 'Millimeter', 0.001], ['cm', 'سنتيمتر', 'Centimeter', 0.01], ['m', 'متر', 'Meter', 1], ['km', 'كيلومتر', 'Kilometer', 1000], ['in', 'بوصة', 'Inch', 0.0254], ['ft', 'قدم', 'Foot', 0.3048], ['yd', 'ياردة', 'Yard', 0.9144], ['mi', 'ميل', 'Mile', 1609.344], ['nmi', 'ميل بحري', 'Nautical Mile', 1852]] },
  weight: { t: T('الوزن والكتلة', 'Weight & Mass'), u: [['mg', 'مليغرام', 'Milligram', 0.001], ['g', 'غرام', 'Gram', 1], ['kg', 'كيلوغرام', 'Kilogram', 1000], ['ton', 'طن متري', 'Metric Ton', 1e6], ['oz', 'أونصة', 'Ounce', 28.3495], ['lb', 'رطل', 'Pound', 453.592], ['st', 'ستون', 'Stone', 6350.29]] },
  temperature: { t: T('درجة الحرارة', 'Temperature'), temp: true, u: [['c', 'مئوية °C', 'Celsius °C', 1], ['f', 'فهرنهايت °F', 'Fahrenheit °F', 1], ['k', 'كلفن K', 'Kelvin K', 1]] },
  area: { t: T('المساحة', 'Area'), u: [['m2', 'متر مربع', 'Square Meter', 1], ['km2', 'كيلومتر مربع', 'Square Kilometer', 1e6], ['cm2', 'سنتيمتر مربع', 'Square Centimeter', 0.0001], ['ha', 'هكتار', 'Hectare', 1e4], ['acre', 'فدان (أكر)', 'Acre', 4046.86], ['ft2', 'قدم مربع', 'Square Foot', 0.092903], ['mi2', 'ميل مربع', 'Square Mile', 2589988.11]] },
  volume: { t: T('الحجم والسوائل', 'Volume & Liquid'), u: [['ml', 'مليلتر', 'Milliliter', 0.001], ['l', 'لتر', 'Liter', 1], ['m3', 'متر مكعب', 'Cubic Meter', 1000], ['galus', 'غالون أمريكي', 'US Gallon', 3.78541], ['galuk', 'غالون إمبراطوري', 'Imperial Gallon', 4.54609], ['qt', 'كوارت', 'Quart', 0.946353], ['pt', 'باينت', 'Pint', 0.473176], ['cup', 'كوب', 'Cup', 0.24], ['floz', 'أونصة سائلة', 'Fluid Ounce', 0.0295735], ['tbsp', 'ملعقة كبيرة', 'Tablespoon', 0.0147868], ['tsp', 'ملعقة صغيرة', 'Teaspoon', 0.00492892]] },
  speed: { t: T('السرعة', 'Speed'), u: [['mps', 'متر/ثانية', 'Meter/second', 1], ['kmh', 'كيلومتر/ساعة', 'Kilometer/hour', 0.277778], ['mph', 'ميل/ساعة', 'Mile/hour', 0.44704], ['knot', 'عقدة بحرية', 'Knot', 0.514444], ['fps', 'قدم/ثانية', 'Foot/second', 0.3048]] },
  time: { t: T('الزمن', 'Time'), u: [['sec', 'ثانية', 'Second', 1], ['min', 'دقيقة', 'Minute', 60], ['hour', 'ساعة', 'Hour', 3600], ['day', 'يوم', 'Day', 86400], ['week', 'أسبوع', 'Week', 604800], ['month', 'شهر (تقريبي)', 'Month (approx)', 2629800], ['year', 'سنة', 'Year', 31557600]] },
  pressure: { t: T('الضغط', 'Pressure'), u: [['pa', 'باسكال', 'Pascal', 1], ['kpa', 'كيلوباسكال', 'Kilopascal', 1000], ['bar', 'بار', 'Bar', 1e5], ['atm', 'ضغط جوي', 'Atmosphere', 101325], ['psi', 'رطل/بوصة مربعة', 'PSI', 6894.76], ['mmhg', 'مليمتر زئبق', 'mmHg', 133.322]] },
  energy: { t: T('الطاقة', 'Energy'), u: [['j', 'جول', 'Joule', 1], ['kj', 'كيلوجول', 'Kilojoule', 1000], ['cal', 'سعرة صغيرة', 'Calorie', 4.184], ['kcal', 'سعرة كبيرة', 'Kilocalorie', 4184], ['wh', 'واط ساعة', 'Watt-hour', 3600], ['kwh', 'كيلوواط ساعة', 'Kilowatt-hour', 3.6e6], ['btu', 'وحدة حرارية بريطانية', 'BTU', 1055.06]] },
  power: { t: T('القدرة', 'Power'), u: [['w', 'واط', 'Watt', 1], ['kw', 'كيلوواط', 'Kilowatt', 1000], ['mw', 'ميغاواط', 'Megawatt', 1e6], ['hp', 'حصان قوة', 'Horsepower', 745.7]] },
  data: { t: T('حجم البيانات', 'Digital Storage'), u: [['bit', 'بت', 'Bit', 0.125], ['byte', 'بايت', 'Byte', 1], ['kb', 'كيلوبايت', 'Kilobyte', 1024], ['mb', 'ميغابايت', 'Megabyte', 1048576], ['gb', 'غيغابايت', 'Gigabyte', 1073741824], ['tb', 'تيرابايت', 'Terabyte', 1099511627776]] },
  angle: { t: T('الزاوية', 'Angle'), u: [['deg', 'درجة', 'Degree', 1], ['rad', 'راديان', 'Radian', 57.29577951], ['grad', 'غراد', 'Gradian', 0.9], ['rev', 'دورة كاملة', 'Revolution', 360]] },
  fuel: { t: T('استهلاك الوقود', 'Fuel Consumption'), fuel: true, u: [['kml', 'كم/لتر', 'km/L', 1], ['l100', 'لتر/100كم', 'L/100km', 1], ['mpgus', 'ميل/غالون أمريكي', 'MPG (US)', 0.425144], ['mpguk', 'ميل/غالون إمبراطوري', 'MPG (UK)', 0.354006]] },
};

function convertUnit(cat, from, to, val) {
  const c = UNITS[cat];
  if (c.temp) {
    const cel = from === 'f' ? (val - 32) * 5 / 9 : from === 'k' ? val - 273.15 : val;
    return to === 'f' ? cel * 9 / 5 + 32 : to === 'k' ? cel + 273.15 : cel;
  }
  if (c.fuel) {
    if (!val) return 0;
    const kml = from === 'l100' ? 100 / val : val * c.u.find((u) => u[0] === from)[3];
    return to === 'l100' ? (kml ? 100 / kml : 0) : kml / c.u.find((u) => u[0] === to)[3];
  }
  const f = c.u.find((u) => u[0] === from)[3], t = c.u.find((u) => u[0] === to)[3];
  return (val * f) / t;
}

if (typeof module !== 'undefined') module.exports = { TOOLS, UNITS, convertUnit };

// ============================================================
// واجهة المتصفح
// ============================================================
if (typeof document !== 'undefined') {
  const LB = () => (typeof currentLang !== 'undefined' ? currentLang : 'ar');
  const $ = (id) => document.getElementById(id);
  const state = { tab: 'health', idx: { health: 0, finance: 0, general: 0 } };

  const TAB_TITLES = {
    health: T('الصحة', 'Health'), finance: T('إدارة المال', 'Finance'), general: T('الحسابات العامة', 'General'),
    convert: T('تحويل الوحدات', 'Unit Converter'), notes: T('الملاحظات', 'Notes'),
  };
  const UI = {
    pick: T('اختر الحاسبة', 'Choose calculator'), cat: T('الفئة', 'Category'), from: T('من', 'From'), to: T('إلى', 'To'),
    val: T('القيمة', 'Value'), res: T('النتيجة', 'Result'), save: T('حفظ', 'Save'), share: T('مشاركة', 'Share'),
    del: T('حذف', 'Delete'), hint: T('اكتب ملاحظتك هنا...', 'Write your note here...'), none: T('لا توجد ملاحظات محفوظة', 'No saved notes yet'),
    copied: T('تم نسخ الملاحظة', 'Note copied'),
  };

  function renderTabs() {
    $('tools-tabs').innerHTML = Object.keys(TAB_TITLES).map((k) =>
      `<button class="tool-tab${state.tab === k ? ' active' : ''}" data-tab="${k}">${TAB_TITLES[k][LB()]}</button>`).join('');
    $('tools-tabs').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => openTool(b.dataset.tab, false)));
  }

  function optionsHtml(list, sel) { return list.map(([v, t]) => `<option value="${v}"${v === sel ? ' selected' : ''}>${t[LB()]}</option>`).join(''); }

  function renderCalc(tab) {
    const L = LB(); const list = TOOLS[tab]; const tool = list[state.idx[tab]];
    const fields = tool.fields.map(([id, label, def, opts, type]) => {
      const inp = opts ? `<select id="f-${id}">${optionsHtml(opts, def)}</select>`
        : `<input id="f-${id}" type="${type || 'number'}" value="${def}" ${type ? '' : 'step="any" inputmode="decimal"'}>`;
      return `<label class="tool-field"><span>${label[L]}</span>${inp}</label>`;
    }).join('');
    $('tools-body').innerHTML = `
      <label class="tool-field"><span>${UI.pick[L]}</span>
        <select id="tool-select">${list.map((t, i) => `<option value="${i}"${i === state.idx[tab] ? ' selected' : ''}>${t.title[L]}</option>`).join('')}</select></label>
      <div class="tool-fields">${fields}</div>
      <div class="tool-results" id="tool-results"></div>`;
    $('tool-select').addEventListener('change', (e) => { state.idx[tab] = +e.target.value; renderCalc(tab); });
    const update = () => {
      const raw = {}, v = {};
      tool.fields.forEach(([id, , , opts, type]) => { raw[id] = $('f-' + id).value; v[id] = (opts || type === 'date' || type === 'text') ? raw[id] : num(raw[id]); });
      const out = tool.run(v, L, raw);
      $('tool-results').innerHTML = out.map(([l, x]) => `<div class="tool-result"><span>${l}</span><strong>${x}</strong></div>`).join('');
    };
    tool.fields.forEach(([id]) => { $('f-' + id).addEventListener('input', update); $('f-' + id).addEventListener('change', update); });
    update();
  }

  function renderConvert() {
    const L = LB(); const keys = Object.keys(UNITS);
    $('tools-body').innerHTML = `
      <label class="tool-field"><span>${UI.cat[L]}</span><select id="u-cat">${keys.map((k) => `<option value="${k}">${UNITS[k].t[L]}</option>`).join('')}</select></label>
      <label class="tool-field"><span>${UI.val[L]}</span><input id="u-val" type="number" value="1" step="any" inputmode="decimal"></label>
      <div class="conv-row"><select id="u-from"></select><button class="conv-swap" id="u-swap" aria-label="swap">⇄</button><select id="u-to"></select></div>
      <div class="tool-results" id="tool-results"></div>`;
    const fill = () => {
      const c = UNITS[$('u-cat').value];
      const opts = c.u.map(([k, ar, en]) => `<option value="${k}">${L === 'ar' ? ar : en}</option>`).join('');
      $('u-from').innerHTML = opts; $('u-to').innerHTML = opts; $('u-to').selectedIndex = Math.min(1, c.u.length - 1);
      update();
    };
    const update = () => {
      const r = convertUnit($('u-cat').value, $('u-from').value, $('u-to').value, num($('u-val').value));
      $('tool-results').innerHTML = `<div class="tool-result"><span>${UI.res[L]}</span><strong>${Number(r.toPrecision(10))}</strong></div>`;
    };
    $('u-cat').addEventListener('change', fill);
    ['u-val', 'u-from', 'u-to'].forEach((id) => $(id).addEventListener('input', update));
    $('u-swap').addEventListener('click', () => { const t = $('u-from').value; $('u-from').value = $('u-to').value; $('u-to').value = t; update(); });
    fill();
  }

  const NOTES_KEY = 'web_notes_v1';
  const loadNotes = () => { try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || []; } catch (e) { return []; } };
  const saveNotes = (n) => localStorage.setItem(NOTES_KEY, JSON.stringify(n));
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderNotes() {
    const L = LB(); const notes = loadNotes();
    $('tools-body').innerHTML = `
      <textarea id="note-text" class="note-text" rows="4" placeholder="${UI.hint[L]}"></textarea>
      <button class="btn btn-primary note-save" id="note-save">💾 ${UI.save[L]}</button>
      <div class="note-list">${notes.length ? notes.map((n, i) => `
        <div class="note-item"><small>${new Date(n.d).toLocaleString(L === 'ar' ? 'ar' : 'en')}</small><p>${esc(n.t)}</p>
        <div class="note-actions"><button data-share="${i}">📤 ${UI.share[L]}</button><button data-del="${i}">🗑️ ${UI.del[L]}</button></div></div>`).join('') : `<p class="note-empty">${UI.none[L]}</p>`}</div>`;
    $('note-save').addEventListener('click', () => {
      const t = $('note-text').value.trim(); if (!t) return;
      const all = loadNotes(); all.unshift({ t, d: Date.now() }); saveNotes(all); renderNotes();
    });
    $('tools-body').querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => { const all = loadNotes(); all.splice(+b.dataset.del, 1); saveNotes(all); renderNotes(); }));
    $('tools-body').querySelectorAll('[data-share]').forEach((b) => b.addEventListener('click', async () => {
      const text = loadNotes()[+b.dataset.share].t;
      try { if (navigator.share) await navigator.share({ text }); else { await navigator.clipboard.writeText(text); alert(UI.copied[L]); } } catch (e) { /* أُلغيت المشاركة */ }
    }));
  }

  function render() {
    renderTabs();
    if (state.tab === 'convert') renderConvert();
    else if (state.tab === 'notes') renderNotes();
    else renderCalc(state.tab);
  }

  // يفتح الأداة المطلوبة (ويمرّر الصفحة إليها عند النقر من بطاقة المزايا)
  window.openTool = function (tab, scroll = true) {
    state.tab = tab; render();
    if (scroll) $('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.rerenderTools = render;

  document.addEventListener('DOMContentLoaded', () => {
    if (!$('tools')) return;
    render();
    document.querySelectorAll('[data-tool]').forEach((card) => {
      const go = (e) => {
        const t = card.dataset.tool;
        if (t === 'scientific') { e.preventDefault(); $('demo').scrollIntoView({ behavior: 'smooth' }); }
        else if (t === 'currency') { e.preventDefault(); $('demo').scrollIntoView({ behavior: 'smooth' }); }
        else { e.preventDefault(); window.openTool(t); }
      };
      card.addEventListener('click', go);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') go(e); });
    });
    const langBtn = $('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => setTimeout(render, 0));
  });
}
