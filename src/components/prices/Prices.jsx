import PricesSideButtons from "./PricesSideButtons";
import {getProductsByCategoryFetched} from "../../data/allProducts";
import {imageUrl} from "../utils/Image";
import {ClassNames} from "../utils/UtilFunctions";
import {gql, useQuery} from "@apollo/client";
import {useAuth0} from "@auth0/auth0-react";

export function Prices({title, color, category, classes}) {
    const {user} = useAuth0();
    const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProducts {
    product(category: "${category}") {
      id
      vat
      number
      name
      bottle
      category
      price
      netPrice
    }
  }
`;
    const {data} = useQuery(GET_PRODUCTS_BY_CATEGORY);

    return (
        <div>
            <PricesSideButtons/>
            <section id={category}>
                <h2 className="pt-16 text-center text-3xl font-medium uppercase">
                    {title}
                </h2>
                <div
                    className={ClassNames(
                        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-8',
                        classes,
                        'gap-4'
                    )}
                >
                    {data && getProductsByCategoryFetched(data.product, `${category}`).map((item) => {
                        return (
                            <div
                                className={ClassNames(
                                    'overflow-hidden relative hover:scale-105 ease-in-out duration-300 from-transparent',
                                    'to-transparent',
                                    color,
                                    'duration-300 hover:bg-gradient-to-t flex h-auto w-auto flex-col items-center rounded border border-gray-400 pt-10 text-center'
                                )}
                                key={item.id}
                            >
                                <div className="absolute top-2 right-2 h-auto w-auto font-medium">
                                    <div className="flex select-none items-center">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary text-center shadow-lg">
                                            <p className="pb-0.5 pl-0.5 pt-0.5">{item.vat}%</p>
                                        </div>
                                        <p className="pl-2 pt-0.5">VAT</p>
                                    </div>
                                </div>
                                <img
                                    src={imageUrl(`bottles/${item.bottle}.png`)}
                                    className="h-auto w-20"
                                    alt="butelka"
                                />
                                <p className="w-full border-b border-gray-400 pt-3 pb-6 uppercase lg:h-16 xl:h-auto">
                                    {item.name}
                                </p>
                                {user ? (
                                    <div
                                        className="flex w-full flex-col items-center justify-center bg-gray-100 pb-4 pt-2">
                                        <div className="flex w-full justify-center pt-2">
                                            <p>Cena brutto:</p>
                                            <p className="pl-2 font-bold text-primary">
                                                {item.price.toFixed(2)} zł
                                            </p>
                                        </div>

                                        <div className="flex w-full justify-center pt-1">
                                            <p>Cena netto:</p>
                                            <p className="pl-2 font-bold text-primary">
                                                {item.netPrice.toFixed(2)} zł
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="w-full select-none bg-gray-100 py-4 font-bold text-primary blur-sm">
                                        ?.?? zł
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
