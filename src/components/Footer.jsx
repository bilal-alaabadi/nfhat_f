// ===== Footer.jsx =====
import React from "react";
import log from "../assets/ChatGPT_Image_Aug_4__2025__04_59_50_PM-removebg-preview.png";
import {
  SiVisa,
  SiMastercard,
  SiApplepay,
  SiGooglepay,
} from "react-icons/si";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Thw from "../assets/images__4_-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5]">
      {/* ===== شريط علوي FULL-BLEED ===== */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {/* الخلفية المنحنية */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M28 0 H100 V36 H28 A28 28 0 0 1 28 0 Z" fill="#e9b86b" />
        </svg>

        {/* محتوى الشريط */}
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* الشعار */}
            <div className="shrink-0 self-start">
              <img
                src={log}
                alt="شعار Beauty 24"
                className="w-28 md:w-40 object-contain select-none pointer-events-none"
              />
            </div>

            {/* وسائل الدفع */}
            <div className="text-white w-full md:w-auto md:ml-auto md:self-center">
              <div className="w-full flex justify-end">
                <div className="flex items-center gap-5 md:gap-6 mb-3 md:mb-4">
                  <SiVisa className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiMastercard className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiApplepay className="text-3xl md:text-4xl drop-shadow-sm" />
                  {/* ملاحظة: تم الإبقاء على الأيقونات كما هي بدون إضافة Google Pay */}
                  <img
                    src={Thw}
                    className="w-10 invert brightness-0"
                    alt="Thawani"
                  />
                </div>
              </div>

              <p className="text-right text-lg md:text-2xl font-semibold leading-relaxed">
                وسائل دفع متعددة
                <br />
                اختر وسيلة الدفع المناسبة
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== نهاية الشريط العلوي ===== */}

      {/* الأقسام السفلية */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-[#2e3528] md:text-right text-center">
          {/* Beauty 24 */}
          <div>
            <h4 className="text-xl font-bold mb-3">Beauty 24</h4>
            <p className="text-sm leading-7 text-[#4a4a4a]" dir="ltr">
              في Beauty 24 نوفّر لكِ ما يُكمّل جمالكِ بأفضل جودة وبأقل الأسعار ✨
              نسعى لأن نكون وجهتكِ الأولى في عالم الجمال والعناية الشخصية، حيث نقدم مجموعة مختارة من المنتجات الموثوقة بعناية فائقة.
              مقرّنا في عُمان / نزوى – مركز حواء التجاري، ونوفّر خدمة التوصيل السريع لجميع المحافظات 🚚.
              نحرص على أن تصلكِ منتجاتنا بحب وعناية، لتكوني دائمًا بأجمل إطلالة.
              Beauty 24 – جمالكِ يبدأ من هنا 💖
              أكثر من مجرد متجر... إنها تجربة جمال متكاملة
            </p>
          </div>

          {/* روابط مهمة */}
          <div>
            <h4 className="text-xl font-bold mb-3">روابط مهمة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#d3ae27] transition">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#d3ae27] transition">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="hover:text-[#d3ae27] transition"
                >
                  سياسة الاستبدال والاسترجاع
                </Link>
              </li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div>
            <h4 className="text-xl font-bold mb-3">تواصل معنا</h4>
            <div className="flex justify-center md:justify-start gap-4 mb-4">
              <a
                href="https://www.instagram.com/nafhatalteeb/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d3ae27] transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=96891274222text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d3ae27] transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>

            {/* موقع المحل */}
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-[#2e3528]/20 pt-4 pb-8 text-center text-sm text-[#4a4a4a]">
          جميع الحقوق محفوظة لدى Beauty 24 — {" "}
          <a
            href="https://www.instagram.com/mobadeere/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#2e3528] transition-colors"
          >
            تصميم مبادر
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
