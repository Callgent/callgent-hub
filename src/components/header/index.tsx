import { useTheme } from 'next-themes';
import React, { useState, useRef, useEffect } from 'react';
import navLinks from './menuData';
import { Link } from 'react-router-dom';
import useClickOutside from '@/hooks/useClickOutside/useClickOutside';
import { getUserInfo } from '@/api/user';
import useGlobalStore from '@/store/globalStore';
import { User } from '@/types/global';
import { deleteCookie } from '@/utils/cookie';
import ThemeToggler from './theme';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const { user, setUser } = useGlobalStore();
    const { theme, setTheme } = useTheme();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useClickOutside(menuRef, closeMenu, isOpen);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const init = async () => {
        try {
            const { data }: { data: User } = await getUserInfo();
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const Logout = () => {
        deleteCookie('x-callgent-jwt');
        window.location.reload();
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-2 bg-white dark:bg-[#121212] shadow-[0_1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)]">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/" className="header-logo flex items-center w-full lg:py-2">
                        <img src="/images/logo.svg" alt="logo" className="w-10 dark:invert" />
                        <div className="ml-1 text-xl lg:text-2xl font-medium xl:block">
                            Callgent
                        </div>
                    </Link>
                </div>

                <div
                    ref={menuRef}
                    className={`menu-container
                        md:flex md:space-x-6 md:static md:transform-none md:opacity-100 md:visible
                        fixed top-0 left-0 w-[65%] h-full z-50 
                        transform transition-transform duration-300 ease-in-out
                        bg-white dark:bg-[#121212]
                        ${isOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}
                    `}
                >
                    <div className="p-4 pl-10 md:p-0 md:flex md:space-x-6 md:bg-transparent">
                        <div className="text-2xl font-bold mb-10 mt-6 md:hidden">
                            <Link to="/" className="header-logo flex items-center w-full lg:py-2">
                                <img src="/images/logo.svg" alt="logo" className="w-10 dark:invert" />
                                <div className="ml-1 text-xl lg:text-2xl font-medium xl:block">
                                    Callgent
                                </div>
                            </Link>
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                to={link.href}
                                key={link.name}
                                className="block md:inline hover:text-gray-200 py-2 md:py-0"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <span onClick={toggleTheme} className="md:m-1">
                        <ThemeToggler />
                    </span>
                    {user ? (
                        <div className="ml-4">
                            <div className="group relative items-center">
                                <img
                                    className="rounded-full hidden md:block cursor-pointer bg-white"
                                    src={user?.avatar || '/images/logo.svg'}
                                    width="40"
                                    height="40"
                                />
                                <div className='submenu absolute -translate-x-1/2 rounded-sm top-full py-4 transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:block w-[150px] lg:p-4 lg:opacity-0 lg:group-hover:visible lg:group-hover:top-[40px]'>
                                    <div className='bg-white dark:bg-black py-2 px-4 white lg:shadow-lg border-[1px] dark:border-gray-700 rounded-md my-1'>
                                        <div onClick={Logout} className='flex cursor-pointer'>
                                            <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2931" width="25" height="25"><path d="M85.333333 256a85.333333 85.333333 0 0 1 85.333334-85.333333h384a85.333333 85.333333 0 0 1 85.333333 85.333333v85.333333a42.666667 42.666667 0 1 1-85.333333 0V256H170.666667v512h384v-85.333333a42.666667 42.666667 0 1 1 85.333333 0v85.333333a85.333333 85.333333 0 0 1-85.333333 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V256z m652.501334 97.834667a42.666667 42.666667 0 0 1 60.330666 0l128 128a42.666667 42.666667 0 0 1 0 60.330666l-128 128a42.666667 42.666667 0 0 1-60.330666-60.330666L793.002667 554.666667H384a42.666667 42.666667 0 1 1 0-85.333334h409.002667l-55.168-55.168a42.666667 42.666667 0 0 1 0-60.330666z" p-id="2932"></path></svg>
                                            <div className='ml-2'>Logout</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to={`${import.meta.env.VITE_APP_BASE_COM}/signin`}
                            className="text-sm text-gray-500 hover:text-gray-700 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.2)] rounded-md px-2 py-1"
                        >
                            Sign In
                        </Link>
                    )}
                    <button onClick={toggleMenu} className="md:hidden focus:outline-none text-2xl ml-2">
                        {isOpen ? '✖️' : '☰'}
                    </button>
                </div>

                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                        onClick={closeMenu}
                    ></div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
