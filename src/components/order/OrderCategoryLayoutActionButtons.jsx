import { useAuth0 } from "@auth0/auth0-react";

import {ClassNames} from "../utils/UtilFunctions";
import {imageUrl} from "../utils/Image";
import React from 'react';


export default function OrderCategoryLayoutActionButtons(props) {
    const {appendProductAmount, selectedProductsAmount, item} = props;
    const {user} = useAuth0();
    return (
        <div className={ClassNames(!user ? 'blur-sm' : '')}>
            <div className='flex flex w-full items-center justify-center'>
                <div className='flex mt-2 mb-1'>
                    <div
                        className={`text-neutral-700 hover:text-neutral-600 duration-300 ${
                            user ? 'cursor-pointer' : 'cursor-not-allowed'
                        }`}
                    >
                        <div
                            className={`text-white mr-1 rounded w-8 h-8 bg-neutral-700 hover:bg-neutral-600 duration-300 ${
                                user ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => user && appendProductAmount(item.number, -1)}>
                            <div className='w-full h-full flex items-center justify-center'>
                                <img
                                    src={imageUrl('icons/AiFillMinusSquare.png')}
                                    width='16px'
                                    height='16px'
                                    alt='odejmij butelkę'
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={ClassNames(
                            'text-xl text-center border h-8 flex items-center justify-center px-2 border-gray-400 rounded-sm min-w-[35px]'
                        )}
                    >
                        {selectedProductsAmount && selectedProductsAmount[item.number]}
                    </div>
                    <div
                        className={`text-neutral-700 hover:text-neutral-600 duration-300 ${
                            user ? 'cursor-pointer' : 'cursor-not-allowed'
                        }`}
                    >
                        <div
                            className={`text-white ml-1 rounded w-8 h-8 bg-neutral-700 hover:bg-neutral-600 duration-300 ${
                                user ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => user && appendProductAmount(item.number, 1)}>
                            <div className='w-full h-full flex items-center justify-center'>
                                <img
                                    src={imageUrl('icons/AiFillPlusSquare.png')}
                                    width='16px'
                                    height='16px'
                                    alt='dodaj butelkę'
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-row items-center'>
                <div className='flex flex w-full items-center justify-center'>
                    <div className={user ? 'cursor-pointer' : 'cursor-not-allowed'}>
                        <p
                            className='flex w-10 items-center justify-center whitespace-nowrap rounded border border-neutral-700 bg-neutral-700 p-2 text-sm font-semibold uppercase text-white duration-300 hover:bg-neutral-600'
                            onClick={() => {
                                user && appendProductAmount(item.number, -24);
                            }}
                        >
                            -24
                        </p>
                    </div>
                </div>
                <div
                    className='flex items-center m-0.5'>
                    <img
                        src={imageUrl('icons/GoInbox.png')}
                        width='52px'
                        height='52px'
                        alt='skrzynka'
                    />
                </div>
                <div className='flex flex w-full items-center justify-center'>
                    <div className={user ? 'cursor-pointer' : 'cursor-not-allowed'}>
                        <p
                            className='flex w-10 items-center justify-center whitespace-nowrap rounded border border-neutral-700 bg-neutral-700 p-2 text-sm font-semibold uppercase text-white duration-200 hover:bg-neutral-600'
                            onClick={() => {
                                user && appendProductAmount(item.number, 24);
                            }}
                        >
                            +24
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
