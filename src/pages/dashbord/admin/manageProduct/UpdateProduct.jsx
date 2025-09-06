// client/src/components/dashboard/manageProduct/UpdateProduct.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';

const categories = [
  { label: 'أختر منتج', value: '' },
  { label: 'حناء بودر', value: 'حناء بودر' },
  { label: 'سدر بودر', value: 'سدر بودر' },
  { label: 'أعشاب تكثيف وتطويل الشعر', value: 'أعشاب تكثيف وتطويل الشعر' },
  { label: 'مشاط', value: 'مشاط' },
  { label: 'خزامى', value: 'خزامى' },
  { label: 'كركديه', value: 'كركديه' },
  { label: 'إكليل الجبل', value: 'إكليل الجبل' }
];

const categoriesRequiringSize = new Set(['حناء بودر']);

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    oldPrice: '',
    size: '',
    description: '',
    image: []
  });

  const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;
      setProduct({
        name: p.name || '',
        category: p.category || '',
        price: p.price ?? '',
        oldPrice: p.oldPrice ?? '',
        size: p.size ?? '',
        description: p.description || '',
        image: Array.isArray(p.image) ? p.image : (p.image ? [p.image] : []),
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      setProduct((prev) => ({
        ...prev,
        category: value,
        size: categoriesRequiringSize.has(value) ? '' : prev.size,
      }));
      return;
    }

    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imagesArray) => {
    setProduct((prev) => ({ ...prev, image: imagesArray || [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sizeIsRequired = categoriesRequiringSize.has(product.category);

    if (
      !product.name ||
      !product.category ||
      product.price === '' ||
      !product.description ||
      (sizeIsRequired && !product.size)
    ) {
      alert('أملأ كل الحقول المطلوبة (بما فيها الحجم إذا كان المنتج يتطلبه)');
      return;
    }

    const priceNum = Number(product.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      alert('قيمة السعر غير صالحة');
      return;
    }

    let oldPriceNum;
    if (product.oldPrice !== '' && product.oldPrice !== null && product.oldPrice !== undefined) {
      oldPriceNum = Number(product.oldPrice);
      if (Number.isNaN(oldPriceNum) || oldPriceNum < 0) {
        alert('قيمة السعر القديم غير صالحة');
        return;
      }
    }

    const body = {
      name: product.name,
      category: product.category,
      price: priceNum,
      oldPrice: product.oldPrice !== '' ? oldPriceNum : undefined,
      description: product.description,
      size: product.size || undefined,
      image: product.image,
      author: user?._id,
    };

    try {
      await updateProduct({ id, body }).unwrap();
      alert('تم تحديث المنتج بنجاح');
      await refetch();
      navigate('/dashboard/manage-products');
    } catch (error) {
      if (error.status === 401) {
        alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
        navigate('/login');
      } else {
        alert('فشل تحديث المنتج: ' + (error.data?.message || error.message));
      }
    }
  };

  if (isProductLoading) return <div>تحميل ...</div>;
  if (fetchError) return <div>حدث خطأ في جلب المنتج</div>;

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-6'>تحديث المنتج</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput
          label="أسم المنتج"
          name="name"
          placeholder="أكتب اسم المنتج"
          value={product.name}
          onChange={handleChange}
        />

        <SelectInput
          label="صنف المنتج"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {categoriesRequiringSize.has(product.category) && (
          <TextInput
            label="الحجم"
            name="size"
            placeholder="مثال: 500 جم / 1 كجم"
            value={product.size}
            onChange={handleChange}
          />
        )}

        <TextInput
          label="السعر"
          name="price"
          type="number"
          placeholder="مثال: 3.000"
          value={product.price}
          onChange={handleChange}
        />

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
          value={product.image}
          placeholder='روابط الصور'
          setImage={handleImageChange}
        />

        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>الوصف</label>
          <textarea
            name="description"
            id="description"
            className='add-product-InputCSS'
            value={product.description}
            placeholder='اكتب وصف المنتج'
            onChange={handleChange}
          />
        </div>

        <div>
          <button type='submit' className='add-product-btn' disabled={isUpdating}>
            {isUpdating ? 'جار التحديث...' : 'تحديث المنتج'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
