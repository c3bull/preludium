import {imageUrl} from "../utils/Image";
import React from 'react';

export default function PricesSideButtons() {
    return (
        <div className='fixed left-[2%] top-[30%]'>
            <div className='flex flex-col gap-5'>
                <div>
                    <a href={'#water'}>
                        <div
                            className='h-12 w-12 rounded-full border-2 border-primary bg-white p-2.5 text-logob duration-200 hover:bg-primary'>
                            <img
                                src={imageUrl('icons/MdWaterDrop.webp')}
                                width='32px'
                                height='32px'
                                alt='przewiń do wody'
                            />
                        </div>
                    </a>
                </div>
                <div>
                    <a href={'#carb_drink'}>
                        <div
                            className='h-12 w-12 rounded-full border-2 border-primary bg-white p-2.5 text-logob duration-200 hover:bg-primary'>
                            <img
                                src={imageUrl('icons/RiBubbleChartLine.webp')}
                                width='32px'
                                height='32px'
                                alt='przewiń do gazowanych'
                            />
                        </div>
                    </a>
                </div>
                <div>
                    <a href={'#non_carb_drink'}>
                        <div
                            className='h-12 w-12 rounded-full border-2 border-primary bg-white p-2.5 text-logob duration-200 hover:bg-primary'>
                            <img
                                src={imageUrl('icons/GiWaterSplash.webp')}
                                width='32px'
                                height='32px'
                                alt='przewiń do niegazowanych'
                            />
                        </div>
                    </a>
                </div>
                <div>
                    <a href={'#juices'}>
                        <div
                            className='h-12 w-12 rounded-full border-2 border-primary bg-white p-2.5 text-logob duration-200 hover:bg-primary'>
                            <img
                                src={imageUrl('icons/GiManualJuicer.webp')}
                                width='32px'
                                height='32px'
                                alt='przewiń do soków'
                            />
                        </div>
                    </a>
                </div>
                <div>
                    <a href={'#bogus'}>
                        <div
                            className='h-12 w-12 rounded-full border-2 border-primary bg-white p-2.5 text-logob duration-200 hover:bg-primary'>
                            <img
                                src={imageUrl('icons/FaCarrot.webp')}
                                width='32px'
                                height='32px'
                                alt='przewiń do Bogusiów'
                            />
                        </div>
                    </a>
                </div>
                <div>
                    <a href={'#tea'}>
                        <div
                            className='h-12 w-12 rounded-full border-2 border-primary bg-white p-2.5 text-logob duration-200 hover:bg-primary'>
                            <img
                                src={imageUrl('icons/FaTeapot.webp')}
                                width='32px'
                                height='32px'
                                alt='przewiń do Bogusiów'
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
