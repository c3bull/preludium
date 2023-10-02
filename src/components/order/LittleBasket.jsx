import {imageUrl} from "../utils/Image";
import React from 'react';


export default function LittleBasket({setShowBasket}) {
    return (
        <div
            className="fixed top-20 right-3 z-10 flex h-auto cursor-pointer flex-col items-center justify-center rounded-2xl border border-primary bg-primary p-2 shadow-lg 2xl:hidden"
            onClick={() => setShowBasket()}
        >
            <div
                className='h-16 w-16 px-1 pt-1 w-full items-center text-center justify-center'>
                <img
                    src={imageUrl('icons/RiShoppingBasket2LineWhite.png')}
                    width='60px'
                    height='60px'
                    alt='otwórz koszyk'
                />
            </div>
        </div>
    );
}
