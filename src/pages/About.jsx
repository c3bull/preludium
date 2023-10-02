import {imageUrl} from "../components/utils/Image";

const About = () => {

    return (
        <div>
            <div className="flex justify-center">
                <div className="flex w-2/3 items-center justify-center">
                    <div className="flex flex-col items-center justify-center pt-32 pb-16 text-center">
                        <div className="xl:w-3/4">
                            <p className="pb-12 text-left text-sm sm:text-lg">
                                Nasza firma oferuje dostawy pełnego asortymentu produktów firmy
                                Fantic - uznanego producenta - rodzinnej firmy istniejącej od
                                1957 r. Obsługujemy zarówno odbiorców hurtowych jak i
                                detalicznych. Zapewniamy dostawy na potrzeby dużych imprez
                                plenerowych jak i okolicznościowych spotkań rodzinnych. Szeroka
                                oferta naszych produktów z pewnością zadowoli nawet najbardziej
                                wybrednych odbiorców!
                            </p>
                        </div>
                        <img
                            src={imageUrl('Fantic-logo.png')}
                            alt="fantic"
                            className="flex h-auto w-64 self-center"
                        />
                        <p className="py-10">Jakość i smak naszą dewizą od lat!</p>
                        <div className="flex flex-row items-center justify-center gap-6">
                            <img
                                className="aspect-square h-auto w-28"
                                src={imageUrl('recyclable.png')}
                                alt="recyclable"
                            />
                            <img
                                className="aspect-square h-auto w-28"
                                src={imageUrl('polski_producent.png')}
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
