import {imageUrl} from "../components/utils/Image";

const About = () => {

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex w-2/3 items-center justify-center">
                    <div className="flex flex-col items-center justify-center pt-32 pb-16 text-center">
                        <div className="xl:w-3/4">
                            <p className="pb-12 text-left text-sm sm:text-lg drop-shadow-[0_3px_5px_rgba(0,0,0,0.3)]">
                                Nasza firma oferuje dostawy pełnego asortymentu produktów firmy <b>Fantic</b> - uznanego
                                producenta - rodzinnej firmy istniejącej od
                                1957 roku. Współpracujmy również z firmą <b>Elixirium</b>, która także zajmuje się
                                dystrybucją napojów Fantic.
                                Obsługujemy zarówno odbiorców hurtowych jak i
                                detalicznych. Zapewniamy dostawy na potrzeby dużych imprez
                                plenerowych jak i okolicznościowych spotkań rodzinnych. Szeroka
                                oferta naszych produktów z pewnością zadowoli nawet najbardziej
                                wymagających odbiorców!
                            </p>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-10'>
                            <img
                                src={imageUrl('Fantic-logo.webp')}
                                alt="fantic logo"
                                className="flex h-auto w-48 md:w-64 self-center"
                            />
                            <img
                                src={imageUrl('elixirium.webp')}
                                alt="fantic"
                                className="flex h-auto w-48 md:w-64 self-center"
                            />
                        </div>
                        <p className="py-10">Jakość i smak naszą dewizą od lat!</p>
                        <div className="flex flex-row items-center justify-center gap-6">
                            <img
                                className="aspect-square h-auto w-28"
                                src={imageUrl('recyclable.webp')}
                                alt="recyclable logo"
                            />
                            <img
                                className="aspect-square h-auto w-28"
                                src={imageUrl('polski_producent.webp')}
                                alt="pl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
