import SectionHeader from "../common/SectionHeader";
import {imageUrl} from "../utils/Image";
import React from 'react';


export default function HomeMakeAndOrder({goToOrder}) {

    return (
        <div className="mt-2 flex flex-col items-center  bg-gray-200 pb-16 shadow-inner">
            <div className="flex justify-center">
                <div className="flex flex-col items-center">
                    <SectionHeader
                        icon={<img
                            src={imageUrl('icons/RiShoppingBasket2Line.png')}
                            width='50px'
                            height='50px'
                            alt='złóż zamówienie'
                        />}>
                        złóż zamówienie
                    </SectionHeader>
                </div>
            </div>
            <div
                className="relative flex flex-row overflow-hidden border border-gray-400 bg-cover p-5 shadow-xl md:w-2/3">
                <div
                    className="hidden h-auto w-96 bg-cover md:block"
                    style={{
                        backgroundImage: `url(${imageUrl('order_bg_img.png')})`,
                    }}
                >
                </div>
                <div className="flex flex-1 flex-col ">
                    <div className="flex flex-1 flex-col gap-2 text-lg uppercase">
                        <div className="flex justify-center p-2 ">
                            <img
                                className="h-auto w-48 bg-cover md:w-56"
                                src={imageUrl('/skrzynka.png')}
                                alt="skrzynka"
                            />
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-black ">
                            <div>
                                {[
                                    'kliknij "zamów"',
                                    'wybierz produkty',
                                    'uzupełnij formularz',
                                    'ciesz się produktami',
                                ].map((line) => {
                                    return (
                                        <div key={line} className="w-auto">
                                            <div className="flex lg:text-md ml-1 text-xs leading-7 xl:text-lg">
                                                <div className="inline-block pr-2 pt-0.5">
                                                    <img
                                                        src={imageUrl('icons/AiOutlineCheckCircle.png')}
                                                        width='16px'
                                                        height='16px'
                                                        alt='check'
                                                    />
                                                </div>
                                                <p className='mb-1'>{line}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <button
                            type="button"
                            className="relative block w-full overflow-hidden border-2 border-primary py-3 font-bold no-underline md:mt-7 md:w-56 lg:mt-4 lg:w-72 xl:w-96"
                            onClick={goToOrder}
                        >
              <span className="relative z-10 text-lg uppercase tracking-widest text-black">
                Zamów
              </span>
                            <div className="liquid"/>
                        </button>
                    </div>
                </div>
                <div
                    className="hidden h-auto w-96 bg-cover md:block"
                    style={{
                        backgroundImage: `url(${imageUrl('order_bg_img.png')})`,
                    }}
                />
            </div>
        </div>
    );
}
