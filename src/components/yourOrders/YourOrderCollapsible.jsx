import Collapsible from 'react-collapsible';
import {ClassNames} from "../utils/UtilFunctions";
import {imageUrl} from "../utils/Image";
import React from 'react';


export default function YourOrderCollapsible({index, item}) {
    const iconRemap = {
        '[NIEGAZ]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/GiWaterSplash.png')}
                    width='16px'
                    height='16px'
                    alt='napój niegazowany'
                />
            </div>
        },
        '[GAZ]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/RiBubbleChartLine.png')}
                    width='16px'
                    height='16px'
                    alt='napój gazowany'
                />
            </div>
        },
        '[SOK]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/GiManualJuicer.png')}
                    width='16px'
                    height='16px'
                    alt='sok / nektar'
                />
            </div>
        },
        '[B]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/FaCarrot.png')}
                    width='16px'
                    height='16px'
                    alt='Boguś'
                />
            </div>
        },
        '[WODA]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/MdWaterDrop.png')}
                    width='16px'
                    height='16px'
                    alt='woda źródlana'
                />
            </div>
        }
    };

    return (
        <div className='flex h-auto w-full lg:block'>
            <div className='flex items-center border border-gray-800 bg-orange-50 p-2 lg:hidden lg:justify-center'>
                <div className='w-4 h-4 flex items-center'>
                    <img
                        src={imageUrl('icons/GiBottleCap.png')}
                        width='16px'
                        height='16px'
                        alt='zamówione produkty'
                    />
                </div>
            </div>
            <div
                className='flex w-full items-center justify-center border-y border-r border-gray-800 p-2 lg:my-0 lg:border-l'>
                <Collapsible
                    trigger='Kliknij, aby rozwinąć'
                    triggerWhenOpen='Kliknij, aby zwinąć'
                    triggerStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                    key={index}
                >
                    <div className='flex w-full justify-center lg:p-0'>
                        <div className='font-medium uppercase'>
                            {item.orderedProducts.map((ordered, index) => {
                                return (
                                    <div
                                        className={`grid grid-cols-[85%_minmax(15%,1fr)] ${
                                            index === 0 && 'border-t'
                                        } border-l border-gray-400`}
                                        key={index}
                                    >
                                        <div
                                            className='flex w-full flex-col overflow-x-auto text-ellipsis whitespace-nowrap border-b border-gray-400 py-1 scrollbar-thin hover:scrollbar-thumb-gray-400 md:min-w-[385px] md:overflow-hidden'
                                            key={index}
                                        >
                                            <div className={ClassNames('hidden', 'lg:flex')}>
                                                <div className='flex'>
                                                    <div
                                                        className='pl-2 pt-0.5'
                                                        title={iconRemap[ordered.hint]?.hoverHint}
                                                    >
                                                        {iconRemap[ordered.hint]?.icon}
                                                    </div>
                                                    <p className='pl-2'>{ordered.name}</p>
                                                </div>
                                            </div>

                                            <div className={ClassNames('lg:hidden')}>
                                                <div className='flex'>
                                                    <div className='pl-2 pt-0.5'>
                                                        {iconRemap[ordered.hint]?.icon}
                                                    </div>
                                                    <p className='px-2'>{ordered.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex w-full items-end'>
                                            <p
                                                className='w-full whitespace-pre-wrap border-x border-b border-gray-400 py-1 text-center'
                                                key={index}
                                            >
                                                {ordered.amount}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}
