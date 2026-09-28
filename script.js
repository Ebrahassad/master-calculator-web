// ============================================================
// موسوعة الحاسبات الشاملة — Master Calculator Hub (Landing Site)
// ============================================================

// ---------- 1) الترجمة (عربي / إنجليزي) ----------
const STRINGS = {
  nav_features: { ar: 'المزايا', en: 'Features' },
  nav_demo: { ar: 'جرّبها الآن', en: 'Live Demo' },
  nav_tools: { ar: 'الأدوات', en: 'Tools' },
  tools_title: { ar: 'كل الحاسبات في مكان واحد', en: 'All calculators in one place' },
  tools_sub: { ar: 'الصحة، المال، الحسابات العامة، تحويل الوحدات والملاحظات — تعمل مباشرة هنا', en: 'Health, finance, general calculations, unit conversion and notes — working right here' },
  nav_download: { ar: 'تحميل', en: 'Download' },
  hero_title: { ar: 'موسوعة الحاسبات الشاملة', en: 'Master Calculator Hub' },
  hero_sub: {
    ar: 'حاسبة علمية، تحويلات فورية للعملات والوحدات، حاسبات مالية وصحية — كل ما تحتاجه في مكان واحد، بدون إنترنت (باستثناء أسعار العملات اللحظية).',
    en: 'Scientific calculator, instant currency & unit conversions, finance and health calculators — everything you need in one place, works offline (except live currency rates).'
  },
  hero_cta_download: { ar: 'حمّل التطبيق', en: 'Download the App' },
  hero_cta_demo: { ar: 'جرّب في المتصفح', en: 'Try in Browser' },
  badge_free: { ar: '✅ مجاني بالكامل', en: '✅ 100% Free' },
  badge_offline: { ar: '📶 يعمل بدون إنترنت', en: '📶 Works Offline' },
  badge_bilingual: { ar: '🌍 عربي / إنجليزي', en: '🌍 Arabic / English' },
  features_title: { ar: 'كل الحاسبات التي تحتاجها', en: 'Every calculator you need' },
  features_sub: { ar: 'خمس فئات متكاملة في تطبيق واحد أنيق وسريع', en: 'Five complete categories in one fast, elegant app' },
  f_scientific_t: { ar: 'الحاسبة العلمية', en: 'Scientific Calculator' },
  f_scientific_d: { ar: 'دوال مثلثية، لوغاريتمات، أسس وجذور، مع وضع درجات/راديان وسجل عمليات.', en: 'Trigonometry, logarithms, powers & roots, with degree/radian mode and history.' },
  f_convert_t: { ar: 'التحويلات', en: 'Conversions' },
  f_convert_d: { ar: '13 فئة وحدات + أكثر من 80 عملة عالمية وعربية بأسعار صرف لحظية.', en: '13 unit categories + 80+ world & Arab currencies with live exchange rates.' },
  f_health_t: { ar: 'الصحة', en: 'Health' },
  f_health_d: { ar: 'مؤشر كتلة الجسم، السعرات اليومية، الوزن المثالي، نسبة الدهون وغيرها.', en: 'BMI, daily calories, ideal weight, body fat percentage and more.' },
  f_calc_t: { ar: 'الحسابات العامة', en: 'General Calculations' },
  f_calc_d: { ar: 'الخصم، الإكرامية، العمر التفصيلي، فرق التواريخ، والمعدل التراكمي.', en: 'Discounts, tips, detailed age, date differences, and GPA.' },
  f_finance_t: { ar: 'إدارة المال', en: 'Finance' },
  f_finance_d: { ar: 'القروض، الفائدة المركبة، هامش الربح، نقطة التعادل، وهدف الادخار.', en: 'Loans, compound interest, profit margin, break-even, and savings goals.' },
  f_notes_t: { ar: 'ملاحظات محفوظة', en: 'Saved Notes' },
  f_notes_d: { ar: 'دوّن ملاحظات حساباتك واحفظها بشكل دائم على جهازك، وشاركها متى شئت.', en: 'Write notes about your calculations, saved permanently on your device, shareable anytime.' },
  demo_title: { ar: 'جرّبها الآن مباشرة', en: 'Try it right now' },
  demo_sub: { ar: 'نموذج مصغّر يعمل مباشرة في متصفحك — بدون تحميل', en: 'A working mini demo, right in your browser — no download needed' },
  demo_calc_title: { ar: 'حاسبة علمية', en: 'Scientific Calculator' },
  demo_conv_title: { ar: 'محوّل العملات اللحظي', en: 'Live Currency Converter' },
  conv_fetching: { ar: 'جاري جلب الأسعار اللحظية...', en: 'Fetching live rates...' },
  conv_updated: { ar: 'أسعار محدّثة لحظيًا', en: 'Live rates updated' },
  conv_offline: { ar: 'تعذر الاتصال بمصدر الأسعار حاليًا', en: 'Could not reach the live rate source right now' },
  download_title: { ar: 'حمّل التطبيق الآن', en: 'Download the app now' },
  download_sub: { ar: 'متوفر لأجهزة أندرويد — مجانًا بالكامل', en: 'Available for Android — completely free' },
  ad_placeholder: { ar: 'مساحة إعلانية', en: 'Advertisement space' },
  footer_rights: { ar: '© 2026 جميع الحقوق محفوظة', en: '© 2026 All Rights Reserved' },
  footer_dev: { ar: 'تطوير: HASSADI', en: 'Developed by: HASSADI' },
};

let currentLang = localStorage.getItem('site_lang') || 'ar';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('site_lang', lang);
  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (STRINGS[key]) el.textContent = STRINGS[key][lang];
  });
  const langBtnLabel = document.getElementById('lang-btn-label');
  if (langBtnLabel) langBtnLabel.textContent = lang === 'ar' ? 'EN' : 'AR';
  if (typeof window.refreshConvStatus === 'function') window.refreshConvStatus();
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => applyLang(currentLang === 'ar' ? 'en' : 'ar'));
  }
  buildMathBackground();
  initCalculator();
  initConverter();
});

// ---------- 2) خلفية زخرفية: رموز حسابية شفافة ----------
function buildMathBackground() {
  const holder = document.getElementById('math-bg');
  if (!holder) return;
  const symbols = ['π', '÷', '√', '×', '%', '=', '∑', 'x²', '½', 'log', '+', '−', '∞', '7+5', '9×3', '12÷4', '8-2', '100%', '√9'];
  const count = 30;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = symbols[i % symbols.length];
    el.style.left = `${Math.random() * 96}%`;
    el.style.top = `${Math.random() * 96}%`;
    el.style.fontSize = `${14 + Math.random() * 22}px`;
    el.style.transform = `rotate(${(Math.random() - 0.5) * 40}deg)`;
    holder.appendChild(el);
  }
}

// ---------- 3) الحاسبة العلمية (نفس منطق تطبيق الجوال) ----------
class MathEvalError extends Error {}

function evaluateExpression(src, degreeMode) {
  let pos = 0;
  const s = src
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .trim();

  function skip() { while (pos < s.length && s[pos] === ' ') pos++; }
  function peek() { skip(); return pos < s.length ? s[pos] : null; }
  function match(c) { skip(); if (s[pos] === c) { pos++; return true; } return false; }

  function parseExpression() {
    let v = parseTerm();
    while (true) {
      const c = peek();
      if (c === '+') { pos++; v += parseTerm(); }
      else if (c === '-') { pos++; v -= parseTerm(); }
      else break;
    }
    return v;
  }
  function parseTerm() {
    let v = parseFactor();
    while (true) {
      const c = peek();
      if (c === '*') { pos++; v *= parseFactor(); }
      else if (c === '/') { pos++; const d = parseFactor(); if (d === 0) throw new MathEvalError('div0'); v /= d; }
      else break;
    }
    return v;
  }
  function parseFactor() {
    let v = parseUnary();
    if (match('^')) v = Math.pow(v, parseFactor());
    return v;
  }
  function parseUnary() {
    if (match('-')) return -parseUnary();
    if (match('+')) return parseUnary();
    return parsePostfix();
  }
  function parsePostfix() {
    let v = parsePrimary();
    while (true) {
      const c = peek();
      if (c === '!') { pos++; v = factorial(v); }
      else if (c === '%') { pos++; v = v / 100; }
      else break;
    }
    return v;
  }
  function parsePrimary() {
    skip();
    if (pos >= s.length) throw new MathEvalError('eof');
    if (match('(')) { const v = parseExpression(); if (!match(')')) throw new MathEvalError('paren'); return v; }
    const c = s[pos];
    if (/[0-9.]/.test(c)) return parseNumber();
    if (/[a-zA-Z]/.test(c)) return parseIdentifier();
    throw new MathEvalError('char');
  }
  function parseNumber() {
    const start = pos; let dot = false;
    while (pos < s.length && (/[0-9]/.test(s[pos]) || (s[pos] === '.' && !dot))) { if (s[pos] === '.') dot = true; pos++; }
    return parseFloat(s.slice(start, pos));
  }
  function parseIdentifier() {
    const start = pos;
    while (pos < s.length && /[a-zA-Z]/.test(s[pos])) pos++;
    const name = s.slice(start, pos).toLowerCase();
    if (name === 'pi') return Math.PI;
    if (name === 'e') return Math.E;
    skip();
    if (match('(')) { const arg = parseExpression(); if (!match(')')) throw new MathEvalError('paren'); return applyFn(name, arg); }
    throw new MathEvalError('id');
  }
  function toRad(d) { return degreeMode ? d * Math.PI / 180 : d; }
  function fromRad(r) { return degreeMode ? r * 180 / Math.PI : r; }
  function applyFn(name, arg) {
    switch (name) {
      case 'sin': return Math.sin(toRad(arg));
      case 'cos': return Math.cos(toRad(arg));
      case 'tan': return Math.tan(toRad(arg));
      case 'asin': return fromRad(Math.asin(arg));
      case 'acos': return fromRad(Math.acos(arg));
      case 'atan': return fromRad(Math.atan(arg));
      case 'sqrt': if (arg < 0) throw new MathEvalError('neg'); return Math.sqrt(arg);
      case 'ln': if (arg <= 0) throw new MathEvalError('log'); return Math.log(arg);
      case 'log': if (arg <= 0) throw new MathEvalError('log'); return Math.log(arg) / Math.LN10;
      case 'abs': return Math.abs(arg);
      case 'exp': return Math.exp(arg);
      default: throw new MathEvalError('fn');
    }
  }
  function factorial(n) {
    if (n < 0 || n !== Math.round(n) || n > 170) throw new MathEvalError('fact');
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  }

  const result = parseExpression();
  skip();
  if (pos !== s.length) throw new MathEvalError('trailing');
  if (!isFinite(result)) throw new MathEvalError('inf');
  return result;
}

function initCalculator() {
  const display = document.getElementById('calc-display');
  const grid = document.getElementById('calc-grid');
  if (!display || !grid) return;
  let expr = '';
  let degreeMode = true;

  function render() { display.textContent = expr || '0'; }

  grid.querySelectorAll('button[data-key]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      if (key === 'AC') { expr = ''; render(); return; }
      if (key === 'DEL') { expr = expr.slice(0, -1); render(); return; }
      if (key === '=') {
        try {
          const r = evaluateExpression(expr, degreeMode);
          expr = String(Math.round(r * 1e10) / 1e10);
        } catch (e) {
          expr = '';
          display.textContent = currentLang === 'ar' ? 'خطأ' : 'Error';
          return;
        }
        render();
        return;
      }
      expr += key;
      render();
    });
  });
  render();
}

// ---------- 4) محوّل العملات اللحظي ----------
const DEMO_CURRENCIES = ['USD', 'EUR', 'GBP', 'LYD', 'SAR', 'AED', 'EGP', 'KWD', 'QAR', 'TRY', 'CNY', 'JPY'];

async function initConverter() {
  const amountEl = document.getElementById('conv-amount');
  const fromEl = document.getElementById('conv-from');
  const toEl = document.getElementById('conv-to');
  const resultEl = document.getElementById('conv-result');
  const statusEl = document.getElementById('conv-status');
  const swapBtn = document.getElementById('conv-swap');
  if (!amountEl || !fromEl || !toEl || !resultEl) return;

  DEMO_CURRENCIES.forEach((c) => {
    fromEl.appendChild(new Option(c, c));
    toEl.appendChild(new Option(c, c));
  });
  fromEl.value = 'USD';
  toEl.value = 'LYD';

  let rates = null;
  let statusKey = 'conv_fetching';
  const setStatus = (k) => { statusKey = k; statusEl.textContent = STRINGS[k][currentLang]; };
  window.refreshConvStatus = () => setStatus(statusKey);
  setStatus('conv_fetching');

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    if (data.result === 'success') {
      rates = data.rates;
      setStatus('conv_updated');
    } else {
      throw new Error('bad_response');
    }
  } catch (e) {
    setStatus('conv_offline');
    // أسعار احتياطية تقريبية إن تعذر الاتصال
    rates = { USD: 1, EUR: 0.92, GBP: 0.78, LYD: 4.85, SAR: 3.75, AED: 3.67, EGP: 48.5, KWD: 0.31, QAR: 3.64, TRY: 34, CNY: 7.2, JPY: 152 };
  }

  function convert() {
    if (!rates) return;
    const amount = parseFloat(amountEl.value) || 0;
    const from = fromEl.value, to = toEl.value;
    if (!rates[from] || !rates[to]) return;
    const usd = amount / rates[from];
    const out = usd * rates[to];
    resultEl.textContent = `${out.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${to}`;
  }

  [amountEl, fromEl, toEl].forEach((el) => el.addEventListener('input', convert));
  if (swapBtn) swapBtn.addEventListener('click', () => {
    const t = fromEl.value; fromEl.value = toEl.value; toEl.value = t;
    convert();
  });
  convert();
}
