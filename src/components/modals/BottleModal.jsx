import BottleModalTableLabels from "./BottleModalTableLabels";
import BottleModalTableValues from "./BottleModalTableValues";
import Modal from "./Modal";
import {imageUrl} from "../utils/Image";


export function BottleModal(props) {
    const {data, onClick} = props;
    return (
        <Modal title={data.name} classes="items-center" closeModal={onClick}>
            <div className="flex flex-col items-center justify-center md:flex-row md:py-5">
                <img
                    className="h-auto w-20 md:w-28 xl:w-36"
                    src={imageUrl(`bottles/${data.bottle}.png`)}
                    alt="butelka"
                />
                <div className="ml-4 mr-6 flex flex-col items-center whitespace-nowrap py-2 text-sm">
                    <div className="flex overflow-hidden rounded-md border border-black">
                        <BottleModalTableLabels bottleData={data}/>
                        <BottleModalTableValues bottleData={data}/>
                    </div>
                    {data.tableValues.witaminaC &&
                        <p className='pt-5'>*Referencyjna wartość spożycia dla przeciętnej <br/>
                            osoby dorosłej (8 400 kJ/2 000 kcal)</p>}
                </div>

            </div>
            <div className="flex justify-end">
                <button
                    className="w-full rounded bg-primary px-10 py-4 font-semibold uppercase text-white"
                    onClick={onClick}
                >
                    Zamknij
                </button>
            </div>
        </Modal>
    );
}
