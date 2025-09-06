import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';

// خريطة المنتجات -> الأحجام المتاحة
const productSizesMap = {
  "فازلين زيت الزيتون": ["100 مل", "50 مل"],
  "بودرة مزيل رائحة العرق": ["110 مل", "50 مل"],
  "كريم مزيل رائحة العرق": ["100 مل", "50 مل"],
  "سدر عماني": ["560 مل"],
  "حنا عماني": ["560 مل"],
  "مقشر دم الغزال": ["300 مل"],
  "مقشر النيلة": ["300 مل"],
  "مقشر الصندل": ["300 مل"],
  "كريم الشعر بالزيوت الطبيعية": ["200 مل"],
  "تجميعات": [],
};

// خيارات القائمة المنسدلة للمنتجات
const categories = [
  { label: 'أختر منتج', value: '' },
  ...Object.keys(productSizesMap).map(name => ({ label: name, value: name })),
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    size: '',           // ✅ حقل الحجم
    price: '',
    oldPrice: '',       // ✅ السعر القديم (اختياري)
    description: ''
  });

  const [image, setImage] = useState([]); // مصفوفة لحفظ روابط الصور
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // عند تغيير الصنف، صفّر الحجم واجعل الاسم = الصنف
    if (name === 'category') {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
        size: '',                 // ✅ تصفير الحجم عند تغيير المنتج
        name: value || prev.name, // جعل اسم المنتج = اسم الصنف مباشرة
      }));
      return;
    }

    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من الحقول
    const sizesForCategory = productSizesMap[product.category] || [];
    const sizeIsRequired = sizesForCategory.length > 0;

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.description ||
      image.length === 0 ||
      (sizeIsRequired && !product.size)
    ) {
      alert('أملأ كل الحقول المطلوبة (بما فيها الحجم عند توفره)');
      return;
    }

    // تحويل الأسعار لأرقام والتأكد من صلاحيتها
    const priceNum = Number(product.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      alert('قيمة السعر غير صالحة');
      return;
    }

    let oldPriceNum;
    if (product.oldPrice !== '') {
      oldPriceNum = Number(product.oldPrice);
      if (Number.isNaN(oldPriceNum) || oldPriceNum < 0) {
        alert('قيمة السعر القديم غير صالحة');
        return;
      }
    }

    try {
      await addProduct({
        ...product,
        price: priceNum,
        oldPrice: product.oldPrice !== '' ? oldPriceNum : undefined, // ✅ لا نرسلها إذا كانت فاضية
        image,
        author: user?._id,
      }).unwrap();

      alert('تمت إضافة المنتج بنجاح');

      // تصفير النموذج
      setProduct({
        name: '',
        category: '',
        size: '',
        price: '',
        oldPrice: '',
        description: ''
      });
      setImage([]);
      navigate('/shop');
    } catch (error) {
      console.log('Failed to submit product', error);
      alert('حدث خطأ أثناء الإضافة');
    }
  };

  // قائمة الأحجام بناءً على الصنف المختار
  const sizeOptions = (productSizesMap[product.category] || []).map((s) => ({
    label: s,
    value: s,
  }));

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">إضافة منتج جديد</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* اسم المنتج */}
        <TextInput
          label="اسم المنتج"
          name="name"
          placeholder="أكتب اسم المنتج"
          value={product.name}
          onChange={handleChange}
        />

        {/* الصنف/المنتج */}
        <SelectInput
          label="المنتج"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {/* الحجم (يظهر عندما يوجد أحجام لهذا المنتج) */}
        {sizeOptions.length > 0 && (
          <SelectInput
            label="الحجم"
            name="size"
            value={product.size}
            onChange={handleChange}
            options={[{ label: 'اختر الحجم', value: '' }, ...sizeOptions]}
          />
        )}

        {/* السعر الحالي */}
        <TextInput
          label="السعر"
          name="price"
          type="number"
          placeholder="مثال: 3.000"
          value={product.price}
          onChange={handleChange}
        />

        {/* السعر القديم (اختياري) */}
        <TextInput
          label="السعر القديم (اختياري)"
          name="oldPrice"
          type="number"
          placeholder="مثال: 3.500"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <UploadImage
          name="image"
          id="image"
          setImage={setImage}
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">وصف المنتج</label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="اكتب وصفًا موجزًا للمنتج"
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit" className="add-product-btn" disabled={isLoading}>
            {isLoading ? 'جاري الإضافة...' : 'أضف منتج'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
