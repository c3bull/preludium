import {Disclosure, Menu, Transition} from '@headlessui/react';
import React, {Fragment} from 'react';

import {imageUrl} from "../utils/Image";
import {Link, useNavigate} from "react-router-dom";
import {isExpired, decodeToken} from "react-jwt";
import {gql, useMutation} from "@apollo/client";

export default function Navbar() {

    const LOGOUT_USER = gql`
    mutation logoutUser($userId: String!) {
        logoutUser(userId: $userId) {
       userId
        }
    }`

    const [logoutUser, {error}] = useMutation(LOGOUT_USER)

    const isExp = isExpired(localStorage.getItem('token'))
    const username = !isExp && decodeToken(localStorage.getItem('token')).name;
    const usersurname = !isExp && decodeToken(localStorage.getItem('token')).surname;
    const userId = !isExp && decodeToken(localStorage.getItem('token')).userId;
    const role = !isExp && decodeToken(localStorage.getItem('token')).role;

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/zaloguj");
    };

    const goToHome = () => {
        navigate("/");
    };

    const links = [
        {
            id: 1,
            link: '/produkty',
            name: 'Produkty',
            current: true
        },
        {
            id: 2,
            link: '/o-nas',
            name: 'O nas',
            current: false
        },
        {
            id: 3,
            link: '/kontakt',
            name: 'Kontakt',
            current: false
        },
        {
            id: 4,
            link: '/cennik',
            name: 'Cennik',
            current: false
        },
        {
            id: 5,
            link: '/zamow',
            name: 'Złóż zamówienie',
            current: false
        }
    ];

    return (
        <Disclosure as='nav' className='fixed top-0 z-30 w-full bg-gray-800'>
            {({open}) => (
                <>
                    <div className='mx-auto max-w-7xl px-2 uppercase sm:px-6 lg:px-8'>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className='inline-flex items-center justify-center rounded-md p-2 ml-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>Open main menu</span>
                                    {open ? (
                                        <div className='flex items-center' aria-hidden='true'>
                                            <img
                                                src={imageUrl('icons/faTimes.webp')}
                                                width='21px'
                                                height='21px'
                                                alt='zamknij nawigację'
                                            />
                                        </div>
                                    ) : (
                                        <div className='flex items-center' aria-hidden='true'>
                                            <img
                                                src={imageUrl('icons/FaBars.webp')}
                                                width='21px'
                                                height='21px'
                                                alt='rozwiń nawigację'
                                            />
                                        </div>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className='flex flex-1 items-center justify-center md:pl-2 sm:text-center'>
                                <div className='flex shrink-0 items-center'>
                                    <Link to={'/'}>
                                        <img
                                            className='block px-2 h-16 w-auto lg:hidden p-2'
                                            src={imageUrl('preludium2.webp')}
                                            alt='Logo'
                                        />
                                    </Link>
                                    <Link to={'/'}>
                                        <img
                                            className='hidden h-16 w-auto lg:block p-1'
                                            src={imageUrl('preludium2.webp')}
                                            alt='Logo'
                                        />
                                    </Link>
                                </div>
                                <div className='hidden md:ml-6 sm:block'>
                                    <div className='flex md:space-x-4'>
                                        {links.map((item) => (
                                            <Link key={item.id} to={item.link}
                                                  className='whitespace-nowrap h-full flex items-center rounded-md border-hidden px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                                  aria-current={item.current ? 'page' : undefined}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                {/* Profile dropdown */}
                                {isExp ? (
                                    <div
                                        className='cursor-pointer flex items-center rounded border-hidden md:px-3 py-1.5 text-white hover:bg-gray-700'
                                        onClick={goToLogin}
                                        // onClick={loginWithRedirect}
                                    >
                                        <div className='flex items-center' aria-hidden='true'>
                                            <img
                                                src={imageUrl('icons/IoLogInOutline.webp')}
                                                className='w-10 h-10 max-w-[40px]'
                                                // width='16px'
                                                // height='16px'
                                                alt='zaloguj'
                                            />
                                        </div>
                                        <p className='pl-1 font-semibold hidden md:block'>Zaloguj</p>
                                    </div>
                                ) : (
                                    <Menu as='div' className='relative ml-3'>
                                        <div>
                                            <Menu.Button
                                                className='flex rounded-full bg-gray-800 text-sm focus:outline-none active:ring-2 active:ring-white active:ring-offset-2 active:ring-offset-gray-800'>
                                                <div
                                                    className='pb-0.5 font-semibold h-12 w-12 rounded-full bg-primary text-white flex justify-center items-center text-2xl'>
                                                    {username[0]}{usersurname[0]}
                                                </div>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items
                                                className='absolute right-0 mt-2 w-48 origin-top-right rounded-md border-hidden bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                <Menu.Item>
                                                    <Link to='/twoje-zamowienia'>
                                                        <div
                                                            className='block cursor-pointer rounded border-hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            <div className='flex items-center'>
                                                                <div className='flex items-center' aria-hidden='true'>
                                                                    <img
                                                                        src={imageUrl('icons/RiShoppingBasket2Line.webp')}
                                                                        width='13px'
                                                                        height='13px'
                                                                        alt='twoje zamówienia'
                                                                    />
                                                                </div>
                                                                <p className='pl-1 font-medium'>
                                                                    Twoje zamówienia
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Menu.Item>
                                                {role === 'admin' && <Menu.Item>
                                                    <Link to='/administrator'>
                                                        <div
                                                            className='block cursor-pointer rounded border-hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            <div className='flex items-center'>
                                                                <div className='flex items-center' aria-hidden='true'>
                                                                    <img
                                                                        src={imageUrl('icons/MdAdminPanelSettings.png')}
                                                                        width='13px'
                                                                        height='13px'
                                                                        alt='twoje zamówienia'
                                                                    />
                                                                </div>
                                                                <p className='pl-1 font-medium'>
                                                                    Panel Admina
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Menu.Item>}
                                                <Menu.Item>
                                                    <div
                                                        className='cursor-pointer block rounded border-hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                                        onClick={() => {
                                                            logoutUser({
                                                                variables: {
                                                                    "userId": userId,
                                                                }
                                                            }).then(() => localStorage.removeItem('token')).then(goToHome)
                                                            // logout({returnTo: window.location.origin});
                                                        }}
                                                    >
                                                        <div className='flex items-center'>
                                                            <div className='flex items-center' aria-hidden='true'>
                                                                <img
                                                                    src={imageUrl('icons/RiLogoutCircleRLine.webp')}
                                                                    width='13px'
                                                                    height='13px'
                                                                    alt='wyloguj'
                                                                />
                                                            </div>
                                                            <div
                                                                className='block border-hidden pl-1 text-sm font-medium text-gray-700'>
                                                                Wyloguj
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='space-y-1 px-2 pt-2 pb-3 uppercase'>
                            {links.map((item) => (
                                <Disclosure.Button
                                    key={item.id}
                                    as='a'
                                    href={item.link}
                                    className='block rounded-md border-hidden px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
