# Master Calculator Hub — الموقع الترويجي

موقع ثابت (HTML/CSS/JS بدون أي إطار عمل أو أدوات بناء) للتعريف بتطبيق "موسوعة الحاسبات الشاملة"، مع نموذج تجريبي حقيقي يعمل مباشرة في المتصفح (حاسبة علمية + محوّل عملات لحظي).

## البنية
```
index.html   الصفحة الرئيسية (كل المحتوى + SEO + JSON-LD)
style.css    التصميم الكامل (الوضع الداكن + الخلفية الزخرفية)
script.js    الترجمة + الحاسبة + محوّل العملات
robots.txt   لمحركات البحث
sitemap.xml  خريطة الموقع
assets/      الأيقونات وصورة المطوّر وصورة المشاركة (OG)
```

## النشر على GitHub Pages (خطوة بخطوة)

```bash
# من داخل هذا المجلد
git init
git add -A
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/ebrahassad/master-calculator-site.git
git push -u origin main
```

بعدها من إعدادات المستودع على GitHub:
**Settings → Pages → Source: Deploy from a branch → Branch: main / (root)** ثم احفظ.
بعد دقيقة أو دقيقتين سيكون الموقع مباشرًا على:
`https://ebrahassad.github.io/master-calculator-site/`

## لماذا GitHub Pages؟ (وماذا لو أردت الأسرع لاحقًا)
GitHub Pages مجاني بالكامل، بدون حد للنطاق الترددي الفعلي لموقع بحجمك، ويدعم SSL ونطاقك الخاص لاحقًا مجانًا — خيار ممتاز وجاهز فورًا لأنك تستخدم GitHub أصلًا لمشروع التطبيق. إذا كبر عدد الزوار مستقبلًا أو أردت سرعة تحميل أعلى عالميًا، فإن **Cloudflare Pages** بديل مجاني ممتاز (نفس طريقة الربط بـ Git، بدون أي تعديل على الكود) وله شبكة توصيل أكبر عالميًا وبدون أي سقف استخدام تقريبًا — ننصح بالبقاء على GitHub Pages الآن والانتقال لاحقًا فقط إذا احتجت ذلك.

## تفعيل إعلانات Google AdSense
1. أنشئ حسابًا على https://adsense.google.com وأضف رابط موقعك للمراجعة (تستغرق الموافقة من أيام لأسابيع لموقع جديد).
2. بعد القبول، افتح `index.html` وفعّل السطر المعلّق في `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
   وضع معرّف الناشر الحقيقي الخاص بك بدل `ca-pub-XXXXXXXXXXXXXXXX`.
3. في مكانَي الإعلان داخل `index.html` (ابحث عن `ad-inner`)، فعّل سطر `<ins class="adsbygoogle">` وضع فيه `data-ad-client` و`data-ad-slot` الحقيقيين من لوحة AdSense، واحذف النص البديل "مساحة إعلانية" المجاور له.

**ملاحظة:** Unity Ads (المستخدم داخل تطبيق الجوال) هو SDK خاص بتطبيقات الجوال فقط ولا يعمل على الويب — لذلك استُخدم Google AdSense هنا وهو المعيار القياسي المجاني لإعلانات المواقع.

## تعديل رابط زر "تحميل التطبيق"
حاليًا رابط الزرّين (`#download-btn-hero` و`#download-btn-main`) يشير إلى رابط الموقع نفسه كما طلبت. بمجرد توفر رابط حقيقي (Google Play، أو ملف APK مرفوع على GitHub Releases)، غيّر قيمة `href` في كلا الزرين داخل `index.html` إلى الرابط الفعلي.

## تعديل النصوص لاحقًا
كل النصوص القابلة للترجمة موجودة في كائن `STRINGS` أعلى ملف `script.js` — عدّل هناك بدل البحث داخل HTML.
