export function ConfirmModalSingleLabel({ labelName, icon }) {
    return (
        <div className="flex items-center border-b-2 border-transparent p-2">
            <p className="hidden whitespace-nowrap font-semibold uppercase sm:block">
                {labelName}
            </p>
            <div className="flex w-full justify-end">{icon}</div>
        </div>
    );
}
