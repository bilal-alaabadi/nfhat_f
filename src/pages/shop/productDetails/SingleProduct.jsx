import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  // ✅ خذ المنتج من data.product بدل data مباشرة
  const singleProduct = data?.product;
  const productReviews = data?.reviews || [];

  const { country } = useSelector((state) => state.cart);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // العملة وسعر التحويل (OMR -> AED)
  const currency = country === 'الإمارات' ? 'د.إ' : 'ر.ع.';
  const exchangeRate = country === 'الإمارات' ? 9.5 : 1;

  useEffect(() => {
    setImageScale(1.05);
    const timer = setTimeout(() => setImageScale(1), 300);
    return () => clearTimeout(timer);
  }, []);

  // إذا تغيّرت الصور، تأكد الفهرس ضمن النطاق
  useEffect(() => {
    if (singleProduct?.image?.length) {
      setCurrentImageIndex((idx) => {
        if (idx >= singleProduct.image.length) return 0;
        return idx;
      });
    } else {
      setCurrentImageIndex(0);
    }
  }, [singleProduct?.image]);

  const handleAddToCart = (product) => {
    setIsAddingToCart(true);

    const productToAdd = {
      _id: product._id,
      name: product.name,
      // ✅ استخدم price من الـ backend
      price: product.price || 0,
      oldPrice: product.oldPrice || undefined,
      image: Array.isArray(product.image) ? product.image : (product.image ? [product.image] : []),
      category: product.category,
      size: product.size || undefined,
      quantity: 1,
    };

    dispatch(addToCart(productToAdd));

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const nextImage = () => {
    if (!singleProduct?.image?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === singleProduct.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!singleProduct?.image?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? singleProduct.image.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل تفاصيل المنتج.</p>;
  if (!singleProduct) return <p>لم يتم العثور على المنتج.</p>;

  // ✅ حساب الأسعار
  const price = (singleProduct.price || 0) * exchangeRate;
  const oldPrice = singleProduct.oldPrice ? singleProduct.oldPrice * exchangeRate : null;
  const discountPercentage = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const images = Array.isArray(singleProduct.image) ? singleProduct.image : (singleProduct.image ? [singleProduct.image] : []);

  return (
    <>
      <section className='section__container bg-[#e2e5e5]'>
        <h2 className='section__header capitalize'>صفحة المنتج الفردي</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-[#4E5A3F]'><Link to="/">الرئيسية</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className='hover:text-[#4E5A3F]'><Link to="/shop">المتجر</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className='hover:text-[#4E5A3F]'>{singleProduct.name}</span>
        </div>
      </section>

      <section className='section__container mt-8' dir='rtl'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
          {/* Product Image */}
          <div className='md:w-1/2 w-full relative'>
            {oldPrice && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                خصم {discountPercentage}%
              </div>
            )}

            {images.length > 0 ? (
              <>
                <div className="overflow-hidden rounded-md">
                  <img
                    src={images[currentImageIndex]}
                    alt={singleProduct.name}
                    className={`w-full h-auto transition-transform duration-300`}
                    style={{ transform: `scale(${imageScale})` }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/500";
                      e.target.alt = "Image not found";
                    }}
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <button
                      onClick={nextImage}
                      className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </>
                )}
              </>
            ) : (
              <p className="text-red-600">لا توجد صور متاحة لهذا المنتج.</p>
            )}
          </div>

          {/* Product Info */}
          <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>{singleProduct.name}</h3>

            {/* Price */}
            <div className='text-xl text-[#3D4B2E] mb-4 space-x-1'>
              {price.toFixed(2)} {currency}
              {oldPrice && (
                <s className="text-gray-500 text-sm ml-2">{oldPrice.toFixed(2)} {currency}</s>
              )}
            </div>

            <div className='flex flex-col space-y-2'>
              <p className="text-gray-500 mb-2 text-lg font-medium leading-relaxed">
                <span className="text-gray-800 font-bold block">الفئة:</span>
                <span className="text-gray-600">{singleProduct.category}</span>
              </p>

              {singleProduct.size && (
                <p className="text-gray-500 mb-2 text-lg font-medium leading-relaxed">
                  <span className="text-gray-800 font-bold block">الحجم:</span>
                  <span className="text-gray-600">{singleProduct.size}</span>
                </p>
              )}
            </div>

            <p className="text-gray-500 mb-4 text-lg font-medium leading-relaxed">
              <span className="text-gray-800 font-bold block">الوصف:</span>
              <span className="text-gray-600">{singleProduct.description}</span>
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className={`mt-6 px-6 py-3 bg-[#d3ae27] text-white rounded-md transition-all duration-200 relative overflow-hidden ${
                isAddingToCart ? 'bg-green-600' : ''
              }`}
            >
              {isAddingToCart ? (
                <>
                  <span className="animate-bounce">تمت الإضافة!</span>
                  <span className="absolute inset-0 bg-green-600 opacity-0 animate-fade"></span>
                </>
              ) : (
                'إضافة إلى السلة'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className='section__container mt-8' dir='rtl'>
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
