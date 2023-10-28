import {ClassNames} from "../utils/UtilFunctions";

export default function BottleModalTableLabels({bottleData}) {
    console.log('bd ', bottleData.tableLabels[0])
    return (
        <div className="font-semibold">
            {[
                bottleData.tableLabels[0].wartoscOdzywcza,
                bottleData.tableLabels[0].wartoscEnergetyczna,
                bottleData.tableLabels[0].tluszcz,
                bottleData.tableLabels[0].wTymKwasyNasycone,
                bottleData.tableLabels[0].weglowodany,
                bottleData.tableLabels[0].wTymCukry,
                bottleData.tableLabels[0].bialko,
                bottleData.tableLabels[0].sol,
                bottleData.tableLabels[0].witaminaC,
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

            {bottleData.tableLabels[0].kationy && (
                <p className="w-full bg-cyan-300 pl-2">{bottleData.tableLabels[0].kationy}</p>
            )}
            {bottleData.tableLabels[0].wapniowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels[0].wapniowy} Ca<sup>2+</sup>
                </p>
            )}
            {bottleData.tableLabels[0].magnezowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels[0].magnezowy} Mg<sup>2+</sup>
                </p>
            )}
            {bottleData.tableLabels[0].sodowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels[0].sodowy} Na<sup>+</sup>
                </p>
            )}
            {bottleData.tableLabels[0].potasowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels[0].potasowy} K<sup>+</sup>
                </p>
            )}
            {bottleData.tableLabels[0].aniony && <p className="w-full pl-2">{bottleData.tableLabels[0].aniony}</p>}
            {bottleData.tableLabels[0].wodoroweglanowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels[0].wodoroweglanowy} HCO<sub>3</sub>
                    <sup>-</sup>
                </p>
            )}
            {bottleData.tableLabels[0].siarczanowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels[0].siarczanowy} SO<sub>4</sub>
                    <sup>2-</sup>
                </p>
            )}
            {bottleData.tableLabels[0].chlorkowy && (
                <p className="w-full bg-cyan-300 pl-2">
                    {bottleData.tableLabels[0].chlorkowy} Cl<sup>-</sup>
                </p>
            )}
            {bottleData.tableLabels[0].fluorkowy && (
                <p className="w-full pl-2">
                    {bottleData.tableLabels[0].fluorkowy} F<sup>-</sup>
                </p>
            )}
            {bottleData.tableLabels[0].suma && (
                <p className="w-full bg-cyan-300 pl-2">{bottleData.tableLabels[0].suma}</p>
            )}
        </div>
    );
}
