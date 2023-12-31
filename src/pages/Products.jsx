import ProductCategoriesLayout from "../components/products/ProductCategoriesLayout";
const Products = () => {

    return (
        <div>
            <div className="flex h-auto min-h-[60vh] items-center justify-center pt-32 pb-12 md:px-10 lg:pt-32 lg:pb-16  ">
                <div className="h-auto gap-10 md:grid md:grid-cols-3 xl:gap-6">
                    <ProductCategoriesLayout
                        href="woda-zrodlana"
                        color="via-cyan-100"
                        image="products_wody"
                        alt="woda źródlana"
                        name="woda źródlana"
                    />

                    <ProductCategoriesLayout
                        href="napoje-gazowane"
                        color="via-yellow-100"
                        image="products_gazowane"
                        alt="gazowane"
                        name="Napoje gazowane"
                    />

                    <ProductCategoriesLayout
                        href="napoje-niegazowane"
                        color="via-orange-100"
                        image="products_niegazowane"
                        alt="niegazowane"
                        name="Napoje Niegazowane"
                    />

                    <ProductCategoriesLayout
                        href="soki-i-nektary"
                        color="via-red-100"
                        image="products_soki_nektary"
                        alt="soki i nektary"
                        name="Soki i nektary"
                    />

                    <ProductCategoriesLayout
                        href="bogus"
                        color="via-orange-100"
                        image="products_bogusie"
                        alt="boguś"
                        name="boguś"
                    />

                    <ProductCategoriesLayout
                        href="herbata"
                        color="via-green-100"
                        image="products_herbaty"
                        alt="herbata"
                        name="herbata"
                    />

                </div>
            </div>
        </div>
    );
};

export default Products;
