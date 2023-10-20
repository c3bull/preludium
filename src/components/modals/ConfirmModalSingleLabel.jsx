export function ConfirmModalSingleLabel({ labelName, icon }) {
    return (
        <div className="flex items-center justify-center border-b-2 border-transparent py-2 pr-2 md:p-2">
            <p className="hidden whitespace-nowrap font-semibold uppercase sm:block">
                {labelName}
            </p>
            <div className="flex w-full justify-end pl-2 py-0.5 sm:py-0">{icon}</div>
        </div>
    );
}
