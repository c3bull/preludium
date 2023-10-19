import {ConfirmModalSingleLabel} from "./ConfirmModalSingleLabel";
import {imageUrl} from "../utils/Image";
import React from 'react';

export default function ConfirmModalLabels() {
    return (
        <div className='flex flex-col gap-2 sm:w-44'>
            <ConfirmModalSingleLabel
                labelName='Imię i nazwisko'
                icon={<div
                    className='pt-1'>
                    <img
                        src={imageUrl('icons/FaUserAlt.webp')}
                        width='16px'
                        height='16px'
                        alt='imię i nazwisko'
                    />
                </div>}
            />
            <ConfirmModalSingleLabel
                labelName='Numer telefonu'
                icon={<div
                    className='pt-1'>
                    <img
                        src={imageUrl('icons/AiFillPhone.webp')}
                        width='16px'
                        height='16px'
                        alt='numer telefonu'
                    />
                </div>}
            />
            <ConfirmModalSingleLabel
                labelName='Kod pocztowy'
                icon={<div
                    className='pt-1'>
                    <img
                        src={imageUrl('icons/GiPostStamp.webp')}
                        width='16px'
                        height='16px'
                        alt='kod pocztowy'
                    />
                </div>}
            />
            <ConfirmModalSingleLabel
                labelName='Adres'
                icon={<div
                    className='pt-1'>
                    <img
                        src={imageUrl('icons/MdLocationPin.webp')}
                        width='16px'
                        height='16px'
                        alt='adres'
                    />
                </div>}
            />
        </div>
    );
}
