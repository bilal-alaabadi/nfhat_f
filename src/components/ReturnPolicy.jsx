import React from 'react';

const ReturnPolicy = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
        {/* العنوان الرئيسي */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#9B2D1F] mb-6">
          سياسة الاسترجاع والاستبدال – Beauty 24
        </h1>

        {/* مقدمة الصفحة */}
        <div className="mb-8 text-right">
          <p className="text-gray-700 mb-3 text-lg">
            نرحّب بكم في سياسة الاسترجاع الخاصة بـ <span className="font-semibold text-[#9B2D1F]">Beauty 24</span>.
          </p>
          <p className="text-gray-600">
            هدفنا تقديم تجربة تسوّق مريحة وآمنة. في حال وجود أي استفسار، يسعدنا تواصلكم معنا.
          </p>
          <div className="mt-3 text-sm text-gray-500">آخر تحديث: أغسطس 2025</div>
        </div>

        {/* البنود الأساسية */}
        <div className="space-y-6 text-right">
          {/* البند الأول */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">أولاً: الاسترجاع</h3>
            <p className="text-gray-600 leading-relaxed">
              لا يُمكن استرجاع المنتجات بعد إتمام الشراء إلا في حال وجود <span className="font-medium">عيب مصنعي</span> أو
              وصول المنتج تالفًا أو غير مطابق للوصف.
            </p>
          </div>

          {/* البند الثاني */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ثانيًا: الاستبدال</h3>
            <p className="text-gray-600 leading-relaxed mb-2">
              نقبل الاستبدال فقط للمنتجات غير المفتوحة والمختومة داخل عبوتها الأصلية ولَم تُستخدم.
            </p>
            <ul className="list-disc pr-5 text-gray-600 space-y-1">
              <li>لا نقبل استبدال المنتجات المفتوحة أو المجرّبة لأسباب صحية.</li>
              <li>يجب طلب الاستبدال خلال <span className="font-medium">48 ساعة</span> من الاستلام.</li>
            </ul>
          </div>

          {/* البند الثالث */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ثالثًا: المنتجات التالفة أو غير المطابقة</h3>
            <p className="text-gray-600 leading-relaxed mb-2">
              في حال استلام منتج تالف أو غير مطابق، يرجى التواصل خلال <span className="font-medium">48 ساعة</span> من الاستلام
              مع توفير صور واضحة للمنتج والعبوة الخارجية وملصق الشحن.
            </p>
            <ul className="list-disc pr-5 text-gray-600 space-y-1">
              <li>قد نطلب إعادة المنتج للفحص قبل اعتماد الاستبدال/الاسترجاع.</li>
              <li>إذا تم تأكيد المشكلة، سنقوم باستبدال المنتج أو إصدار قسيمة/استرجاع حسب الحالة.</li>
            </ul>
          </div>

          {/* البند الرابع */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">رابعًا: تكاليف الشحن</h3>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-medium">Beauty 24</span> تتحمّل تكاليف الشحن في حال كان الخطأ من جانبنا
              (منتج تالف أو غير مطابق). في الحالات الأخرى (مثل تغيير الرأي)، يتحمّل العميل تكاليف الشحن إن وُجد.
            </p>
          </div>

          {/* البند الخامس */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">خامسًا: المدة المتوقعة للمعالجة</h3>
            <p className="text-gray-600 leading-relaxed">
              يتم معالجة طلبات الاستبدال/الاسترجاع خلال <span className="font-medium">2–5 أيام عمل</span> من استلامنا للمنتج أو المستندات المطلوبة.
            </p>
          </div>

          {/* البند السادس */}
          <div className="pb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">سادسًا: الاستثناءات</h3>
            <p className="text-gray-600 leading-relaxed mb-2">
              لأسباب تتعلق بالصحة والسلامة، لا يمكن إرجاع/استبدال بعض منتجات العناية الشخصية بعد فتحها.
            </p>
            <ul className="list-disc pr-5 text-gray-600 space-y-1">
              <li>أي منتج تم فتحه أو إزالة ختمه الصحي.</li>
              <li>العروض الترويجية النهائية إن وُضّح ذلك صراحةً في صفحة المنتج.</li>
            </ul>
          </div>
        </div>

        {/* معلومات التواصل والموقع */}


        {/* تنبيه ختامي */}
        <p className="text-xs text-gray-500 mt-6 text-right">
          ملاحظة: تحتفظ Beauty 24 بالحق في تحديث هذه السياسة. يُنصح بمراجعتها دوريًا قبل الشراء.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
