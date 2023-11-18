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
import {gql, useQuery} from "@apollo/client";
import {decodeToken, isExpired} from "react-jwt";
import {useNavigate} from "react-router-dom";
import {BlockedModal} from "../components/modals/BlockedModal";

function emptyArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(0);
    }
    return arr;
}

const Order = () => {
    const [selectedProductsAmount, setSelectedProductsAmount] = useState(emptyArray(38));
    const [refresh, serRefresh] = useState(false);
    const [showBasket, setShowBasket] = useState(false);
    const [showModal, setShowModal] = useState(-1);
    const [showConfirmModal, setShowConfirmModal] = useState(-1);
    const [showThanksModal, setShowThanksModal] = useState(-1);

    const navigate = useNavigate();
    const isExp = isExpired(localStorage.getItem('token'))
    const userRole = !isExp && decodeToken(localStorage.getItem('token')).role;
    const goToLogin = () => {
        navigate("/zaloguj");
    };

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
                    src={imageUrl('icons/GiWaterSplash.webp')}
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
                    src={imageUrl('icons/RiBubbleChartLine.webp')}
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
                    src={imageUrl('icons/GiManualJuicer.webp')}
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
                    src={imageUrl('icons/FaCarrot.webp')}
                    width='16px'
                    height='16px'
                    alt='Boguś'
                />
            </div>
        },
        '[HERBATA]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/FaTeapot.webp')}
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
                    src={imageUrl('icons/MdWaterDrop.webp')}
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
            finalPrice += amount * (productData.price);
        }
        return finalPrice;
    }

    function discount() {
        let discount = 0;
        let allNonCarbDrinks = 0;
        let nonCarbDrinksDiscount = 0;
        let allCarbDrinks = 0;
        let carbDrinksDiscount = 0;
        let allTea = 0;
        let teaDiscount = 0;
        let allJuices = 0;
        let juicesDiscount = 0;
        let allBogus = 0;
        let bogusDiscount = 0;
        let allWater = 0;
        let waterDiscount = 0;
        for (let i = 0; i < data.product.length; i++) {
            const productData = data.product[i];
            const amount = selectedProductsAmount[i];
            if (productData.category === "non_carb_drink") {
                let times = 0;
                allNonCarbDrinks += amount;
                times = Math.floor(allNonCarbDrinks / 24)
                nonCarbDrinksDiscount = times * 8
            }
            if (productData.category === "carb_drink") {
                let times = 0;
                allCarbDrinks += amount;
                times = Math.floor(allCarbDrinks / 24)
                carbDrinksDiscount = times * 4
            }
            if (productData.category === "tea") {
                let times = 0;
                allTea += amount;
                times = Math.floor(allTea / 24)
                teaDiscount = times * 8
            }
            if (productData.category === "juices") {
                let times = 0;
                allJuices += amount;
                times = Math.floor(allJuices / 24)
                juicesDiscount = -1 * (times * 8)
            }
            if (productData.category === "bogus") {
                let times = 0;
                allBogus += amount;
                times = Math.floor(allBogus / 24)
                bogusDiscount = -1 * (times * 8)
            }
            if (productData.category === "water") {
                let times = 0;
                allWater += amount;
                times = Math.floor(allWater / 24)
                waterDiscount = -1 * (times * 4)
            }
        }
        discount = nonCarbDrinksDiscount + carbDrinksDiscount + teaDiscount + juicesDiscount + bogusDiscount + waterDiscount;
        console.log('disc ', discount)
        return discount;
    }

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
                                <div className='mx-3 mr-8 sm:mr-3 flex border-b border-black' key={item.id}>
                                    <div className='min-w-full sm:min-w-fit'>
                                        <div
                                            className='flex items-center overflow-x-auto whitespace-nowrap uppercase scrollbar-thin scrollbar-thumb-gray-400 sm:w-full'>
                                            <div className='pl-1 pb-0.5'>
                                                {iconRemap[item.hint]?.icon}
                                            </div>
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
                    finalPrice={() => finalPrice()}
                    onClick={() => {
                        setShowBasket(false);
                    }}
                    confirmOrder={() => {
                        confirmOrder();
                    }}
                    discount={() => discount()}
                />
            )}

            {isExp && showModal === -1 && (
                <NotLoggedModal
                    onClickClose={() => {
                        setShowModal(1);
                    }}
                    onClickLogin={goToLogin}
                    message='Aby móc złożyć zamówienie, musisz się zalogować'
                />
            )}

            {!isExp && userRole === "blocked" && showModal === -1 && (
                <BlockedModal
                    onClickClose={() => {
                        setShowModal(1);
                    }}
                    onClickLogin={goToLogin}
                    message='Wykryliśmy problem z Twoim kontem'
                />
            )}

            {data && showConfirmModal === 1 && (
                <ConfirmModal
                    onClickClose={() => {
                        setShowBasket(false);
                        setShowConfirmModal(-1);
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

                    orderedProducts={data.product.filter((pd) => {
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
                        })}
                    totalPrice={((finalPrice() - discount()) / 100).toFixed(2)}
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
                    sum={((finalPrice() - discount()) / 100)}
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
                        title='woda źródlana'
                        category='water'
                        alt='butelka woda'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/MdWaterDrop.webp')}
                                width='17px'
                                height='17px'
                                alt='wody źródlane'
                            />
                        </div>}
                    />

                    {/* KOSZYK uruchamiany przy XL */}
                    <BasketXL
                        bottleAmount={() => bottleAmount()}
                        selectedProductsAmount={selectedProductsAmount}
                        finalPrice={() => finalPrice()}
                        confirmOrder={() => confirmOrder()}
                        discount={() => discount()}
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
                                src={imageUrl('icons/RiBubbleChartLine.webp')}
                                width='17px'
                                height='17px'
                                alt='napoje gazowane'
                            />
                        </div>}
                    />
                    <div/>
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
                                src={imageUrl('icons/GiWaterSplash.webp')}
                                width='17px'
                                height='17px'
                                alt='napoje niegazowane'
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
                                src={imageUrl('icons/GiManualJuicer.webp')}
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
                                src={imageUrl('icons/FaCarrot.webp')}
                                width='19px'
                                height='19px'
                                alt='Bogusie'
                            />
                        </div>}
                    />
                    <div/>

                    <OrderCategoryLayout
                        title='herbata'
                        category='tea'
                        alt='butelka herbata'
                        appendProductAmount={appendProductAmount}
                        selectedProductsAmount={selectedProductsAmount}
                        classes='lg:grid-cols-3'
                        icon={<div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/FaTeapot.webp')}
                                width='19px'
                                height='19px'
                                alt='Bogusie'
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
