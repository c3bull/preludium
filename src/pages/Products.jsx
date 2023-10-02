import ProductCategoriesLayout from "../components/products/ProductCategoriesLayout";
const Products = () => {

    return (
        <div>
            <div className="flex h-auto min-h-[60vh] items-center justify-center pt-32 pb-12 md:px-10 lg:pt-32 lg:pb-16 xl:pt-48 xl:pb-32">
                <div className="h-auto gap-10 md:grid md:grid-cols-5 xl:gap-6">
                    <ProductCategoriesLayout
                        href="napoje-niegazowane"
                        color="via-orange-100"
                        image="products_niegazowane"
                        alt="niegazowane"
                        name="Napoje Niegazowane"
                    />

                    <ProductCategoriesLayout
                        href="napoje-gazowane"
                        color="via-yellow-100"
                        image="products_gazowane"
                        alt="gazowane"
                        name="Napoje gazowane"
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
                        href="woda-zrodlana"
                        color="via-cyan-100"
                        image="products_wody"
                        alt="woda źródlana"
                        name="woda źródlana"
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
