import FooterMenu from "./FooterMenu";
import FooterOffer from "./FooterOffer";
import { imageUrl} from "../utils/Image";
import FooterCustomerService from "./FooterCustomerService";
import React from 'react';
import { format } from 'date-fns';

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-primary">
            <div className="flex w-full flex-col justify-center py-4 text-sm sm:flex-row sm:pt-8 md:items-center">
                <div className="mx-12 flex items-start">
                    <FooterMenu />
                    <FooterOffer />
                </div>
                <div className="mx-5 hidden select-none md:block">&nbsp;</div>
                <FooterCustomerService />
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="relative h-12 w-12 sm:h-24 sm:w-24">
                    <img
                        src={imageUrl('syklykbis.png')}
                        alt="logo"
                    />
                </div>
                <div className="hidden flex-row items-center justify-center pb-5 pr-2 text-lg font-medium uppercase text-black sm:flex">
                    <img
                        src={imageUrl('icons/BiCopyright.png')}
                        width='16px'
                        height='16px'
                        alt='copyright'
                    />
                    <p className="pb-0.5 pl-1">Syk łyk bis</p>
                    <div className='pt-0.5'>
                        <img
                            src={imageUrl('icons/BsDot.png')}
                            width='16px'
                            height='16px'
                            alt='kropka'
                        />
                    </div>
                    <div className="pb-0.5">{format(new Date(), 'yyyy')}</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
