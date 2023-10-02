import { imageUrl} from "../utils/Image";
import React from 'react';

export default function FooterCustomerService() {

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-1 text-center sm:mx-16 sm:items-start sm:gap-4 sm:text-left">
            <p className="font-bold text-gray-800">DZIAŁ OBSŁUGI KLIENTA</p>
            <div className="flex flex-col gap-3">
                <div className="flex">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/ImLocation.png')}
                            width='16px'
                            height='16px'
                            alt='adres'
                        />
                    </div>
                    ul. Chopina 16, 32-020 Wieliczka
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/ImLocation.png')}
                            width='16px'
                            height='16px'
                            alt='adres2'
                        />
                    </div>
                    ul. Sołtysowska 37A, 31-589 Kraków
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/AiFillPhone.png')}
                            width='15px'
                            height='15px'
                            alt='numer telefonu'
                        />
                    </div>
                    12 352 32 23
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/AiFillPhone.png')}
                            width='15px'
                            height='15px'
                            alt='numer telefonu 2'
                        />
                    </div>
                    500 776 150
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/AiFillPhone.png')}
                            width='15px'
                            height='15px'
                            alt='numer telefonu 3'
                        />
                    </div>
                    500 776 494
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            width='14px'
                            height='14px'
                            alt='email'
                        />
                    </div>
                    syklykbis.biuro@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            width='14px'
                            height='14px'
                            alt='email 2'
                        />
                    </div>
                    syklykbis.krakow@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            width='14px'
                            height='14px'
                            alt='email 3'
                        />
                    </div>
                    preludium.sg@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            width='14px'
                            height='14px'
                            alt='email 4'
                        />
                    </div>
                    elixirium.am@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/MdOutlineAccessTimeFilled.png')}
                            width='14px'
                            height='14px'
                            alt='godziny pracy'
                        />
                    </div>
                    Biuro czynne: pn-pt, 7.00-16.00
                </div>
            </div>
        </div>
    );
}
