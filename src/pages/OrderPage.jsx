import {useAuth0} from "@auth0/auth0-react";
import React, {useState} from 'react';

import {BasketModal} from "../components/modals/BasketModal";
import {ConfirmModal} from "../components/modals/ConfirmModal";
import {NotLoggedModal} from "../components/modals/NotLoggedModal";
import {ThanksModal} from "../components/modals/ThanksModal";
import BasketXL from "../components/order/BasketXL";
import LittleBasket from "../components/order/LittleBasket";
import {OrderCategoryLayout} from "../components/order/OrderCategoryLayout";
import OrderMap from "../components/order/OrderMap";
import {imageUrl} from "../components/utils/Image";
import {format} from 'date-fns';
import {gql, useMutation, useQuery} from "@apollo/client";

function emptyArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(0);
    }
    return arr;
}

const Order = () => {
    const [selectedProductsAmount, setSelectedProductsAmount] = useState(emptyArray(33));
    const [refresh, serRefresh] = useState(false);
    const [showBasket, setShowBasket] = useState(false);
    const [showModal, setShowModal] = useState(-1);
    const [showConfirmModal, setShowConfirmModal] = useState(-1);
    const {loginWithRedirect} = useAuth0();
    const [showThanksModal, setShowThanksModal] = useState(-1);

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

    const MAKE_ORDER = gql`
    mutation makeOrder($orderedProducts: [OrderedProductsInputType!], $placementDate: String!, $totalPrice: String!, $email: String!) {
        makeOrder(orderedProducts: $orderedProducts, placementDate: $placementDate, totalPrice: $totalPrice, email: $email) {
            orderedProducts {
                amount
                hint
                name
                productId
            }
        placementDate
        totalPrice
        email
        }
    }`

    const {data} = useQuery(GET_ALL_PRODUCTS);
    const [makeOrder, {error}] = useMutation(MAKE_ORDER)
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

    const appendProductAmount = (index, amount) => {
        const current = selectedProductsAmount[index];
        let am = current + amount;
        if (am < 0) {
            am = 0;
        }
        selectedProductsAmount[index] = am;
        setSelectedProductsAmount(selectedProductsAmount);
        serRefresh(!refresh);
    };

    function bottleAmount() {
        return selectedProductsAmount.reduce((partialSum, a) => partialSum + a, 0);
    }

    function finalPrice() {
        let finalPrice = 0;
        for (let i = 0; i < data.product.length; i++) {
            const productData = data.product[i];
            const amount = selectedProductsAmount[i];
            finalPrice += amount * productData.price;
        }
        return finalPrice;
    }

    const saveOrderToDb = async () => {

        const orderedProducts = data.product
            .filter((pd) => {
                // odfiltrowanie niezamowionych produktow
                return selectedProductsAmount[pd.number];
            })
            .map((pd) => {
                const {name, hint, number} = pd;
                return {
                    "amount": selectedProductsAmount[number],
                    "hint": hint,
                    "name": name,
                    "productId": number
                };
            });

        makeOrder({
            variables: {
                "orderedProducts": orderedProducts,
                "placementDate": format(new Date(), 'dd/MM/yyyy'),
                "totalPrice": finalPrice().toFixed(2),
                "email": user.email,
            }
        })
    };

    const confirmOrder = () => {
        setShowConfirmModal(1);
        setShowBasket(false);
    };

    return (
        <div>
            {data && showBasket && (
                <BasketModal
                    data={[
                        data.product.map((item, index) => {
                            const amount = selectedProductsAmount[index];

                            if (!amount) {
                                return <React.Fragment key={item.id}/>;
                            }

                            return (
                                <div className='mx-3 flex border-b border-black' key={item.id}>
                                    <div>
                                        <div
                                            className='flex items-center overflow-x-auto whitespace-nowrap whitespace-nowrap uppercase scrollbar-thin scrollbar-thumb-gray-400 sm:w-full'>
                                            <p className='pl-1 pb-0.5'>
                                                {iconRemap[item.hint]?.icon}
                                            </p>
                                            <p className='px-2'>{item.name}</p>
                                        </div>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='flex w-full justify-end pl-2 font-semibold'>
                                            {amount}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ]}
                    bottleAmount={bottleAmount()}
                    finalPrice={finalPrice()}
                    onClick={() => {
                        setShowBasket(false);
                    }}
                    confirmOrder={() => {
                        confirmOrder();
                    }}
                />
            )}

            {!user && showModal === -1 && (
                <NotLoggedModal
                    onClickClose={() => {
                        setShowModal(1);
                    }}
                    onClickLogin={loginWithRedirect}
                    message='Aby móc złożyć zamówienie, musisz się zalogować'
                />
            )}

            {data && showConfirmModal === 1 && (
                <ConfirmModal
                    onClickClose={() => {
                        setShowBasket(false);
                        setShowConfirmModal(-1);
                    }}
                    onClickOrder={() => {
                        saveOrderToDb();
                    }}
                    products={data.product.map((item, index) => {
                        const amount = selectedProductsAmount[index];

                        if (!amount) {
                            return <React.Fragment key={item.id}/>;
                        }

                        return (
                            <div className='flex border-b border-black' key={item.id}>
                                <div className='flex whitespace-nowrap uppercase'>
                                    <div className='pr-2 pt-0.5'>
                                        {iconRemap[item.hint]?.icon}
                                    </div>
                                    <p> {item.name}</p>
                                </div>
                                <p className='flex w-full justify-end px-2 font-semibold'>
                                    {amount}
                                </p>
                            </div>
                        );
                    })}
                    productsToSave={data.product
                        .filter((pd) => {
                            return selectedProductsAmount[pd.number];
                        })
                        .map((pd) => {
                            const {number, name, hint} = pd;
                            return {
                                amount: selectedProductsAmount[number],
                                hint,
                                name
                            };
                        })}
                    sum={finalPrice()}
                    showThanks={() => {
                        setShowThanksModal(1);
                    }}
                />
            )}

            {showThanksModal === 1 && <ThanksModal/>}

            {/* KOSZYK WIDOCZNY PRZY ROZDZIELCZOSCI MNIEJSZEJ NIŻ XL */}
            <LittleBasket setShowBasket={() => setShowBasket(true)}/>

            {data && <div className='flex select-none justify-center'>
                <div className='grid gap-6 px-10 pt-8 pb-16 2xl:grid-cols-[70%_minmax(30%,1fr)]'>
                    <OrderMap/>
                    <OrderCategoryLayout
                        title='Napoje niegazowane'
                        category='non_carb_drink'
                        alt='butelka niegazowana'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/GiWaterSplash.png')}
                                width='17px'
                                height='17px'
                                alt='napoje niegazowane'
                            />
                        </div>}
                    />

                    {/* KOSZYK uruchamiany przy XL */}
                    <BasketXL
                        bottleAmount={() => bottleAmount()}
                        selectedProductsAmount={selectedProductsAmount}
                        finalPrice={() => finalPrice()}
                        confirmOrder={() => confirmOrder()}
                    />
                    <div/>

                    <OrderCategoryLayout
                        title='Napoje gazowane'
                        category='carb_drink'
                        alt='butelka gazowana'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/RiBubbleChartLine.png')}
                                width='17px'
                                height='17px'
                                alt='napoje gazowane'
                            />
                        </div>}
                    />
                    <div/>

                    <OrderCategoryLayout
                        title='soki i nektary'
                        category='juices'
                        alt='butelka sok'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/GiManualJuicer.png')}
                                width='17px'
                                height='17px'
                                alt='soki i nektary'
                            />
                        </div>}
                    />
                    <div/>

                    <OrderCategoryLayout
                        title='boguś'
                        category='bogus'
                        alt='butelka bogus'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/FaCarrot.png')}
                                width='19px'
                                height='19px'
                                alt='Bogusie'
                            />
                        </div>}
                    />
                    <div/>

                    <OrderCategoryLayout
                        title='woda źródlana'
                        category='water'
                        alt='butelka woda'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/MdWaterDrop.png')}
                                width='17px'
                                height='17px'
                                alt='wody źródlane'
                            />
                        </div>}
                    />
                    <div/>
                </div>
            </div>
            }
            <div/>
        </div>
    );
};

export default Order;
