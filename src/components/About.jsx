import React from 'react';
import { Link } from 'react-router-dom';
import perfumeImg from '../assets/Untitled-1-2.png';

const About = () => {
  return (
    <div dir="rtl" className="bg-white text-[#4E5A3F]">
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10" dir='rtl'>

          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-[#d3ae27] mb-6">Beauty 24</h2>
            <p className="text-gray-700 text-lg leading-loose mb-6">
              في <span className="font-semibold">Beauty 24</span> نوفّر لكِ ما يُكمّل جمالكِ بأفضل جودة وبأقل الأسعار ✨
            </p>
            
            <p className="text-gray-700 leading-loose mb-4">
              نسعى لأن نكون وجهتكِ الأولى في عالم الجمال والعناية الشخصية،
              حيث نقدم مجموعة مختارة من المنتجات الموثوقة بعناية فائقة.
            </p>
            
            <p className="text-gray-700 leading-loose mb-4">
              مقرّنا في <span className="font-semibold">عُمان / نزوى – مركز حواء التجاري</span>،
              ونوفّر خدمة التوصيل السريع لجميع المحافظات 🚚.
            </p>
            
            <p className="text-gray-700 leading-loose mb-6">
              نحرص على أن تصلكِ منتجاتنا بحب وعناية، لتكوني دائمًا بأجمل إطلالة.
            </p>
            
            <p className="text-gray-700 font-medium">
              Beauty 24 – جمالكِ يبدأ من هنا 💖
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-[#d3ae27] font-semibold">
            أكثر من مجرد متجر... إنها تجربة جمال متكاملة
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
