import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import log from "../assets/ChatGPT Image Aug 4, 2025, 04_59_50 PM.png";
import { setCountry } from '../redux/features/cart/cartSlice';

const Navbar = () => {
    const products = useSelector((state) => state.cart.products);
    const { country } = useSelector((state) => state.cart);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutUser] = useLogoutUserMutation();

    const handleCartToggle = () => setIsCartOpen(!isCartOpen);
    const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);
    const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleCountryChange = (e) => {
        dispatch(setCountry(e.target.value));
    };

    const adminMenus = [
        { label: "لوحة التحكم", path: "/dashboard/admin" },
        { label: "إدارة العناصر", path: "/dashboard/manage-products" },
        { label: "جميع الطلبات", path: "/dashboard/manage-orders" },
        { label: "إضافة منتج", path: "/dashboard/add-product" },
    ];

    const userMenus = [
        { label: "لوحة التحكم", path: "/dashboard" },
        { label: "الملف الشخصي", path: "/dashboard/profile" },
        { label: "المدفوعات", path: "/dashboard/payments" },
        { label: "الطلبات", path: "/dashboard/orders" },
    ];

    const dropdownMenus = user?.role === 'admin' ? adminMenus : userMenus;

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const currency = country === 'الإمارات' ? 'د.إ' : 'ر.ع.';

    return (
        <header className="w-full bg-white shadow-sm relative z-50 pt-10 ">
            <div className="mx-auto px-4">
                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center justify-between h-16 mb-2 pb-12 pt-4">
                    <button 
                        onClick={handleMobileMenuToggle}
                        className="text-gray-800 text-2xl"
                    >
                        <i className="ri-menu-line"></i>
                    </button>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link to="/">
                            <img 
                                src={log} 
                                alt="شعار المتجر" 
                                className="h-24 object-contain"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <img
                                    onClick={handleDropDownToggle}
                                    src={user?.profileImage || avatarImg}
                                    alt="صورة المستخدم"
                                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200"
                                />
                            </div>
                        ) : (
                            <Link to="/login" className="text-[#4E5A3F] text-2xl">
                                <i className="ri-user-line"></i>
                            </Link>
                        )}

                        <button 
                            onClick={handleCartToggle}
                            className="relative text-[#4E5A3F] text-2xl"
                        >
                            <i className="ri-shopping-bag-line"></i>
                            {products.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#d3ae27] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {products.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-between h-20 pb-7">
                    <div className="flex items-center gap-8">
                        {/* <select
                            value={country}
                            onChange={handleCountryChange}
                            className="p-2 border rounded-md text-[#4E5A3F] bg-white"
                        >
                            <option value="عمان">عمان (ر.ع.)</option>
                            <option value="الإمارات">الإمارات (د.إ)</option>
                        </select> */}
                       
                        <button 
                            onClick={handleCartToggle}
                            className="relative text-[#4E5A3F] hover:text-[#9B2D1F] text-3xl"
                        >
                            <i className="ri-shopping-bag-line"></i>
                            {products.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#d3ae27] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                                    {products.length}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="flex-grow flex justify-center">
                        <Link to="/">
                            <img 
                                src={log} 
                                alt="شعار المتجر" 
                                className="h-28 object-contain hover:scale-105 transition-transform"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <img
                                    onClick={handleDropDownToggle}
                                    src={user?.profileImage || avatarImg}
                                    alt="صورة المستخدم"
                                    className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-200 hover:text-[#9B2D1F] transition-colors"
                                />
                                {isDropDownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <ul className="py-2">
                                            {dropdownMenus.map((menu, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={menu.path}
                                                        onClick={() => setIsDropDownOpen(false)}
                                                        className="block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                                    >
                                                        {menu.label}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-right px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    تسجيل الخروج
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                className="text-[#4E5A3F] hover:text-[#9B2D1F] text-3xl transition-colors"
                            >
                                <i className="ri-user-line"></i>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex justify-center border-t border-gray-200 py-4 mt-2">
                    <div className="flex gap-10">
                        <Link to="/shop" className="text-[#4E5A3F] hover:text-[#9B2D1F] font-bold text-xl transition-colors">
                            المنتجات
                        </Link>
                        <Link to="/" className="text-[#4E5A3F] hover:text-[#9B2D1F] font-bold text-xl transition-colors">
                            الصفحة الرئيسية
                        </Link>
                        <Link to="/about" className="text-[#4E5A3F] hover:text-[#9B2D1F] font-bold text-xl transition-colors">
                                                         Beauty 24 قصة
 
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="px-6 py-6 flex flex-col items-center gap-4">
                        <button 
                            onClick={handleMobileMenuToggle}
                            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                        
                        {/* <select
                            value={country}
                            onChange={handleCountryChange}
                            className="w-full p-2 border rounded-md text-[#4E5A3F] bg-white"
                        >
                            <option value="عمان">عمان (ر.ع.)</option>
                            <option value="الإمارات">الإمارات (د.إ)</option>
                        </select> */}
                        
                        <Link 
                            to="/shop" 
                            onClick={handleMobileMenuToggle}
                            className="w-full text-center py-4 px-6 font-medium text-xl text-[#4E5A3F] hover:text-[#9B2D1F] rounded-lg transition-all duration-300"
                        >
                            المنتجات
                        </Link>
                        <Link 
                            to="/" 
                            onClick={handleMobileMenuToggle}
                            className="w-full text-center py-4 px-6 font-medium text-xl text-[#4E5A3F] hover:text-[#9B2D1F] rounded-lg transition-all duration-300"
                        >
                            الصفحة الرئيسية
                        </Link>
                        <Link 
                            to="/about" 
                            onClick={handleMobileMenuToggle}
                            className="w-full text-center py-4 px-6 font-medium text-xl text-[#4E5A3F] hover:text-[#9B2D1F] rounded-lg transition-all duration-300"
                        >
                             Beauty 24 قصة
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cart Modal */}
            {isCartOpen && (
                <CartModal 
                    products={products} 
                    isOpen={isCartOpen} 
                    onClose={handleCartToggle} 
                />
            )}
        </header>
    );
};

export default Navbar;