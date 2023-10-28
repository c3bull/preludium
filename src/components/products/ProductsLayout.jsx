import React, {useEffect, useState} from 'react';

import {BottleModal} from "../modals/BottleModal";
import {getProductsByCategory, getProductsByCategoryFetched} from "../../data/allProducts";
import {imageUrl} from "../utils/Image";
import {ClassNames} from "../utils/UtilFunctions";
import {gql, useQuery} from "@apollo/client";


function ProductsLayout({categoryUrl, className, color}) {
    const [bottleIndex, setBottleIndex] = useState(-1);

//     const GET_PRODUCTS_BY_CATEGORY = gql`
//   query GetProducts {
//     product(category: "${categoryUrl}") {
//       id
//       number
//       name
//       bottle
//       category
//       tableLabels {
//         wartoscOdzywcza
//         wartoscEnergetyczna
//         tluszcz
//         wTymKwasyNasycone
//         weglowodany
//         wTymCukry
//         bialko
//         sol
//         witaminaC
//         kationy
//         wapniowy
//         magnezowy
//         sodowy
//         potasowy
//         aniony
//         wodoroweglanowy
//         siarczanowy
//         chlorkowy
//         fluorkowy
//         suma
//       }
//       tableValues {
//       wartoscOdzywcza
//         wartoscEnergetyczna
//         tluszcz
//         wTymKwasyNasycone
//         weglowodany
//         wTymCukry
//         bialko
//         sol
//         witaminaC
//         kationy
//         wapniowy
//         magnezowy
//         sodowy
//         potasowy
//         aniony
//         wodoroweglanowy
//         siarczanowy
//         chlorkowy
//         fluorkowy
//         suma
//       }
//     }
//   }
// `;


    // const {data} = useQuery(GET_PRODUCTS_BY_CATEGORY);
    const [categoryProducts, setCategoryProducts] = useState([])

    useEffect(() => {
        getProductsByCategory(categoryUrl).map((item, index) => (
            setCategoryProducts(prevState => [...prevState, item])
        ))
    }, [])

    function BottleDisplay({bottle, name, index}) {
        return (
            <article>
                <div
                    className='flex cursor-pointer items-center justify-center p-3'
                    onClick={() => {
                        setBottleIndex(index);
                    }}
                >
                    <div
                        className={ClassNames(
                            'rounded from-transparent',
                            color,
                            'to-transparent duration-300 hover:bg-gradient-to-t flex flex-col items-center'
                        )}
                    >
                        <img
                            src={imageUrl(`bottles/${bottle}.webp`)}
                            alt={name}
                            className='h-auto w-32 py-2 px-6 duration-300 hover:rotate-2 sm:w-44'
                        />
                        <p className='text-center font-medium uppercase'>{name}</p>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <div className='flex h-auto items-center justify-center pt-16 pb-24 md:pt-24 lg:pt-36 w-full'>
            {bottleIndex !== -1 && (
                <BottleModal
                    data={categoryProducts[bottleIndex]}
                    onClick={() => {
                        setBottleIndex(-1);
                    }}
                />
            )}
            {/*{data ? */}
            <div
                className={ClassNames('grid grid-cols-1', className, 'gap-1 sm:gap-6')}
            >
                {/*{getProductsByCategoryFetched(data.product, categoryUrl).map(({id, bottle, name}, index) => (*/}
                {/*    <BottleDisplay id={id} bottle={bottle} name={name} key={id} index={index}/>*/}
                {/*))}*/}
                {getProductsByCategory(categoryUrl).map(({id, bottle, name}, index) => (
                    <BottleDisplay id={id} bottle={bottle} name={name} key={id} index={index}/>
                ))}
            </div>
            {/*    :*/}
            {/*    <div className='w-full flex justify-center items-center'>*/}
            {/*        <h1 className='w-fit animate-spin '>*/}
            {/*            <div className='w-14 h-14 flex items-center'>*/}
            {/*                <img*/}
            {/*                    src={imageUrl('icons/CgSpinner.webp')}*/}
            {/*                    width='68px'*/}
            {/*                    height='68px'*/}
            {/*                    alt='loader'*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </h1>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
}

export default ProductsLayout;
