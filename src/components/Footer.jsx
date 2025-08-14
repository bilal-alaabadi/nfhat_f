import React from 'react';
import { FaInstagram, FaWhatsapp, FaSnapchatGhost, FaTiktok } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="bg-[#698a52] py-5">
      <div className="mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
    
    {/* قسم ABOUT */}
    <div className='text-white'>
      <h4 className="text-lg font-bold mb-4 text-white">عن المتجر</h4>
      <ul className="space-y-2 text-white">
        <li>
          <a href={"/shop"} className="transition-colors duration-300  hover:text-[#9B2D1F] text-white">المنتجات</a>
        </li>
      </ul>
    </div>
    
    {/* قسم LEGAL */}
    <div className='text-white'>
      <h4 className="text-lg font-bold mb-4 text-white ">الشروط والأحكام</h4>
      <ul className="space-y-2 text-white">
        <li>
          <a href={"/return-policy"} className="transition-colors  hover:text-[#9B2D1F] duration-300 text-white">سياسة الاسترجاع</a>
        </li>
      </ul>
    </div>
    
    {/* قسم SOCIAL */}
    <div className='text-white'>
  <h4 className="text-lg font-bold mb-4 text-white">وسائل التواصل</h4>
  <div className="flex justify-center md:justify-end gap-4 text-white">
    
    {/* إنستقرام */}
    <a
      href="https://www.instagram.com/nafhatalteeb/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#9B2D1F] transition"
    >
      <FaInstagram className="text-xl" />
    </a>

    {/* واتساب */}
    <a
      href="https://api.whatsapp.com/send/?phone=96876704406&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#9B2D1F] transition"
    >
      <FaWhatsapp className="text-xl" />
    </a>

    {/* سناب شات */}
    {/* <a
      href="https://www.snapchat.com/add/henna.burgund"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#9B2D1F] transition"
    >
      <FaSnapchatGhost className="text-xl" />
    </a> */}

    {/* تيك توك */}
    {/* <a
      href="https://www.tiktok.com/@henna.burgund"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#9B2D1F] transition"
    >
      <FaTiktok className="text-xl" />
    </a> */}

  </div>
</div>
  </div>

  {/* حقوق النشر */}
  <div className="border-t mt-10 pt-5 text-center text-sm text-white">
    <p className="leading-relaxed text-white">
      تم التطوير بواسطة  
      <a
        href="https://www.instagram.com/mobadeere/"
        className="hover:text-[#9B2D1F] font-semibold hover:underline mx-1 text-white"
      >
        شركة مُبادر 
      </a>
      بجودة واحترافية
    </p>
  </div>
</div>
    </footer>
  );
};

export default Footer;