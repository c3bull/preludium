import { imageUrl} from "../utils/Image";
import { ClassNames} from "../utils/UtilFunctions";
import {Link} from "react-router-dom";

function ProductCategoriesLayout({ href, color, image, alt, name }) {
    return (
        <Link to={`/produkty/${href}`}>
            <a className="flex cursor-pointer flex-col items-center border-hidden py-5 py-5 text-center">
                <div
                    className={ClassNames(
                        'rounded flex flex-col items-center from-transparent',
                        color,
                        'to-transparent duration-300 hover:bg-gradient-to-t'
                    )}
                >
                    <img
                        src={imageUrl(`products/${image}.png`)}
                        alt={alt}
                        className="h-auto w-32 duration-300 hover:rotate-3 sm:w-52 lg:w-72 lg:px-5 xl:px-8 2xl:px-10"
                    />

                    <h2 className="font-medium uppercase text-black">{name}</h2>
                </div>
            </a>
        </Link>
    );
}

export default ProductCategoriesLayout;
