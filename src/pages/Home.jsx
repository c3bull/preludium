import {useNavigate} from 'react-router-dom';
import HomeSwiper from "../components/home/HomeSwiper";
import OurProductsSwiper from "../components/home/OutProductsSwiper";
import HomeMakeAndOrder from "../components/home/HomeMakeAnOrder";

const Home = () => {

    const navigate = useNavigate();
    const goToProducts = () => {
        navigate("/produkty");
    };

    const goToOrder = () => {
        navigate("/zamow");
    };

    return (
        <>
            <HomeSwiper />
            <OurProductsSwiper goToProducts={goToProducts} />
            <HomeMakeAndOrder goToOrder={goToOrder} />
        </>
    );
}

export default Home
