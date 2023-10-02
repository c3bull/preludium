import React from 'react';
import {imageUrl} from "../utils/Image";
import {useAuth0} from "@auth0/auth0-react";
import {gql, useQuery} from "@apollo/client";


export default function BasketXL({
                                     bottleAmount,
                                     selectedProductsAmount,
                                     confirmOrder,
                                     finalPrice,
                                 }) {
    const {user} = useAuth0();
    const GET_ALL_PRODUCTS = gql`
  query GetProducts {
    product {
      id
        bottle
        name
        category
        price
        netPrice
        vat
        hint
        number
    }
  }
`;
    const {data} = useQuery(GET_ALL_PRODUCTS);

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
                    alt='boguś'
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
        <div
            className="fixed right-28 top-[15%] hidden w-96 flex-col items-center justify-center rounded-lg border border-gray-400 bg-white px-5 pb-5 drop-shadow-2xl 2xl:flex">
            <div className="mt-4 flex w-full flex-col justify-center rounded-md border border-gray-400 p-2">
                {user && (
                    <div>
                        <div
                            className='w-full flex items-center text-center justify-center'>
                            <img
                                src={imageUrl('icons/ImInfo.png')}
                                width='16px'
                                height='16px'
                                alt='informacje'
                            />
                        </div>
                        <p className="text-center text-xs">
                            W przypadku zniszczenia opakowania, <br/>
                            zobowiązuje się Pan/Pani zapłacić za szkody.
                            <br/>
                            Zniszczenie skrzynki - 25.00 zł
                            <br/>
                            Zniszczenie butelki - 0.70 zł
                        </p>
                    </div>
                )}
                <div
                    className='mt-2 w-full flex items-center text-center justify-center'>
                    <img
                        src={imageUrl('icons/RiShoppingBasket2Line.png')}
                        width='30px'
                        height='30px'
                        alt='koszyk'
                    />
                </div>
                {/* <p className='text-xs text-center uppercase pb-2 w-full'>W jednej skrzynce<br />mieszczą się 24 butelki</p> */}
                <p className="w-full pb-2 text-center text-xs uppercase">
                    OPAKOWANIE: <br/>
                    butelki szklane 0,33l, pakowane po 24 szt. (opakowanie zwrotne)
                </p>
            </div>

            <div className="mb-4 w-full border-b border-gray-400 pt-6 pb-4">
                <p className="w-full text-center uppercase">
                    ilość butelek: {bottleAmount()}
                </p>
                <p className="w-full text-center uppercase">
                    ilość skrzynek: {Math.ceil(bottleAmount() / 24)}
                </p>
            </div>

            <div
                className="flex h-full max-h-[20vh] w-full flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-primary">
                {data && data.product.map((item, index) => {
                    const amount = selectedProductsAmount[index];

                    if (!amount) {
                        return <React.Fragment key={item.id}/>;
                    }

                    return (
                        <div className="mx-3 flex border-b border-black" key={item.id}>
                            <div
                                className="mr-1 flex w-[85%] items-center overflow-x-auto whitespace-nowrap pb-1 uppercase transition duration-300 scrollbar-thin hover:scrollbar-thumb-gray-400">
                                {/* @ts-ignore */}
                                <div className="pb-0.5">{iconRemap[item.hint]?.icon}</div>
                                <p className="pl-2">{item.name}</p>
                            </div>
                            <p className="flex w-full w-[15%] items-center justify-center border-l border-black pb-1 font-semibold">
                                {amount}
                            </p>
                        </div>
                    );
                })}
            </div>
            {bottleAmount() > 0 && (
                <div className="flex flex w-full pt-5">
                    <div className="flex w-1/2 items-center justify-center text-xl">
                        <div className="mr-2">Suma:</div>
                        <p className="font-semibold">{finalPrice().toFixed(2)} zł</p>
                    </div>
                    <button
                        type="button"
                        className="my-7 w-1/2 rounded-2xl bg-neutral-700 px-10 py-3 font-bold text-white duration-300 hover:bg-primary sm:my-0 xl:py-3 "
                        onClick={() => {
                            confirmOrder();
                        }}
                    >
                        Zamów
                    </button>
                </div>
            )}
        </div>
    );
}
