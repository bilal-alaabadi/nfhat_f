import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Product", "ProductList"],
  endpoints: (builder) => ({
    // جلب جميع المنتجات مع إمكانية التصفية والترتيب
    fetchAllProducts: builder.query({
      query: ({
        category,
        gender,
        minPrice,
        maxPrice,
        search,
        size,               // ✅ دعم الحجم في الفلترة
        sort = "createdAt:desc",
        page = 1,
        limit = 10,
      }) => {
        const params = {
          page: page.toString(),
          limit: limit.toString(),
          sort,
        };

        if (category && category !== "الكل") params.category = category;
        if (size) params.size = size;                  // ✅ إضافة الحجم
        if (gender) params.gender = gender;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (search) params.search = search;

        const queryParams = new URLSearchParams(params).toString();
        return `/?${queryParams}`;
      },
      transformResponse: (response) => ({
        products: response.products,
        totalPages: response.totalPages,
        totalProducts: response.totalProducts,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({ type: "Product", id: _id })),
              "ProductList",
            ]
          : ["ProductList"],
    }),

    // جلب منتج واحد
    fetchProductById: builder.query({
      query: (id) => `/product/${id}`,
      transformResponse: (response) => {
        if (!response?.product) {
          throw new Error('المنتج غير موجود');
        }
        const p = response.product;
        // ✅ أعده بصيغة { product: {...} } لتتوافق مع الكمبوننت
        return {
          product: {
            _id: p._id,
            name: p.name,
            category: p.category,
            size: p.size || '',
            price: p.price,
            oldPrice: p.oldPrice ?? '',
            description: p.description,
            image: Array.isArray(p.image) ? p.image : (p.image ? [p.image] : []),
            author: p.author,
          },
          reviews: response.reviews ?? [],
        };
      },
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // جلب المنتجات المرتبطة
    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
      providesTags: (result, error, id) => [
        { type: "Product", id },
        "ProductList",
      ],
    }),

    // إضافة منتج جديد
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["ProductList"],
    }),

    // تحديث المنتج
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        "ProductList",
      ],
    }),

    // حذف المنتج
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        "ProductList",
      ],
    }),

    // بحث عن المنتجات
    searchProducts: builder.query({
      query: (searchTerm) => `/search?q=${searchTerm}`,
      transformResponse: (response) => {
        return response.map(product => ({
          ...product,
          price: product.category === 'حناء بودر'
            ? product.price
            : product.regularPrice,
          images: Array.isArray(product.image) ? product.image : [product.image],
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product", id: _id })),
              "ProductList",
            ]
          : ["ProductList"],
    }),

    // الأكثر مبيعاً
    fetchBestSellingProducts: builder.query({
      query: (limit = 4) => `/best-selling?limit=${limit}`,
      providesTags: ["ProductList"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useLazyFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useLazyFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useFetchBestSellingProductsQuery,
} = productsApi;

export default productsApi;
