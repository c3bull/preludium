export default function YourOrdersHeader({title, icon}) {
    return (
        <div className="flex items-center justify-center border border-gray-800 bg-orange-50">
            {icon}
            <p className="pl-1 font-medium uppercase">{title}</p>
        </div>
    );
}
