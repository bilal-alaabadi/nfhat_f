import React from 'react'

const ShopFiltering = ({ categories, sizes, filtersState, setFiltersState, clearFilters, allLabel }) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
      <h3>الفلاتر</h3>

      {/* الفئات فقط */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>الفئة</h4>
        <hr />
        {categories.map((cat) => (
          <label key={cat} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filtersState.category === cat}
              onChange={(e) =>
                setFiltersState({
                  ...filtersState,
                  category: e.target.value,
                  // صفّر الحجم عند تغيير الفئة، وسيظهر/يختفي حسب وجود أحجام
                  size: '',
                })
              }
              className='mr-2'
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      {/* الحجم — يظهر فقط إذا كانت الفئة المختارة فيها أحجام */}
      {filtersState.category !== allLabel && sizes.length > 0 && (
        <div className='flex flex-col space-y-2'>
          <h4 className='font-medium text-lg'>الحجم</h4>
          <hr />
          {sizes.map((size) => (
            <label key={size} className='capitalize cursor-pointer'>
              <input
                type="radio"
                name="size"
                value={size}
                checked={filtersState.size === size}
                onChange={(e) => setFiltersState({ ...filtersState, size: e.target.value })}
                className='mr-2'
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      )}

      {/* مسح الفلاتر */}
      <button
        onClick={clearFilters}
        className='bg-[#d3ae27] py-1 px-4 text-white rounded'
      >
        مسح كل الفلاتر
      </button>
    </div>
  )
}

export default ShopFiltering
