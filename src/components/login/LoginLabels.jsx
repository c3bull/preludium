import {imageUrl} from "../utils/Image";
import React from 'react';
import {ConfirmModalSingleLabel} from "../modals/ConfirmModalSingleLabel";

export default function LoginLabels() {
    return (
        <div className='flex flex-col gap-2'>
            <ConfirmModalSingleLabel
                labelName='Email'
                icon={<div
                    className='pt-1 sm:pt-0.5'>
                    <img
                        src={imageUrl('icons/MdOutlineAlternateEmail.png')}
                        width='16px'
                        height='16px'
                        className='max-w-[16px]'
                        alt='adres email'
                    />
                </div>}
            />
            <ConfirmModalSingleLabel
                labelName='Hasło'
                icon={<div
                    className='pt-1 sm:pt-0.5'>
                    <img
                        src={imageUrl('icons/TbPassword.png')}
                        width='16px'
                        height='16px'
                        className='max-w-[16px]'
                        alt='hasło klienta'
                    />
                </div>}
            />
        </div>
    );
}
