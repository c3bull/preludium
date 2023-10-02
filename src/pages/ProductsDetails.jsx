import ProductsLayout from "../components/products/ProductsLayout";
import {useParams} from "react-router-dom";

function Page() {

    let {category} = useParams();

    const urlRemap = {
        'napoje-niegazowane': {
            link: 'non_carb_drink',
            columns: 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
            color: 'via-orange-100',
        },
        'napoje-gazowane': {
            link: 'carb_drink',
            columns: 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
            color: 'via-yellow-100',
        },
        'soki-i-nektary': {
            link: 'juices',
            columns: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
            color: 'via-red-100',
        },
        bogus: {
            link: 'bogus',
            columns: 'sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3',
            color: 'via-orange-100',
        },
        'woda-zrodlana': {
            link: 'water',
            columns: 'sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3',
            color: 'via-cyan-100',
        },
    };

    const r = urlRemap[category];

    return (
        <div>
            <ProductsLayout
                className={r.columns}
                categoryUrl={r.link}
                color={r.color}
            />
        </div>
    );
}

export default Page;
