import {ClassNames} from "../utils/UtilFunctions";

export default function BottleModalTableLabels({bottleData}) {
    return (
        <div className="font-semibold">
            {[
                bottleData.tableLabels.wartoscOdzywcza,
                bottleData.tableLabels.wartoscEnergetyczna,
                bottleData.tableLabels.tluszcz,
                bottleData.tableLabels.wTymKwasyNasycone,
                bottleData.tableLabels.weglowodany,
                bottleData.tableLabels.wTymCukry,
                bottleData.tableLabels.bialko,
                bottleData.tableLabels.sol,
                bottleData.tableLabels.witaminaC,
            ]
                .filter((value) => !!value)
                .map((label, index) => (
                    <p
                        className={ClassNames(
                            'pl-2 w-full',
                            index % 2 ? 'bg-primary' : ''
                        )}
                        key={index}
                    >
                        {label}
                    </p>
                ))}

            {bottleData.tableLabels.kationy && (
                <p className="w-full bg-cyan-300 pl-2">{bottleData.tableLabels.kationy}</p>
            )}
            {bottleData.tableLabels.wapniowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels.wapniowy} Ca<sup>2+</sup>
                </p>
            )}
            {bottleData.tableLabels.magnezowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels.magnezowy} Mg<sup>2+</sup>
                </p>
            )}
            {bottleData.tableLabels.sodowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels.sodowy} Na<sup>+</sup>
                </p>
            )}
            {bottleData.tableLabels.potasowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels.potasowy} K<sup>+</sup>
                </p>
            )}
            {bottleData.tableLabels.aniony && <p className="w-full pl-2">{bottleData.tableLabels.aniony}</p>}
            {bottleData.tableLabels.wodoroweglanowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels.wodoroweglanowy} HCO<sub>3</sub>
                    <sup>-</sup>
                </p>
            )}
            {bottleData.tableLabels.siarczanowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels.siarczanowy} SO<sub>4</sub>
                    <sup>2-</sup>
                </p>
            )}
            {bottleData.tableLabels.chlorkowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels.chlorkowy} Cl<sup>-</sup>
                </p>
            )}
            {bottleData.tableLabels.fluorkowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels.fluorkowy} F<sup>-</sup>
                </p>
            )}
            {bottleData.tableLabels.suma && (
                <p className="w-full bg-cyan-300 pl-2">{bottleData.tableLabels.suma}</p>
            )}
        </div>
    );
}
