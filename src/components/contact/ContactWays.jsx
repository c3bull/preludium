export default function ContactWays({href, name, title, icon, name2, target}) {
    return (
        <article
            className="flex items-center rounded-full border-y border-r border-primary bg-white from-primary via-orange-100
               to-primary text-center shadow-xl  duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r"
        >
            <a
                className="rounded-full border border-black bg-primary p-5 text-white text-white hover:border hover:border-white"
                href={href}
                target={target}
                rel="noreferrer"
            >
                {icon}
            </a>
            <div className="flex w-4/5 flex-col">
                <h4 className="px-2 font-semibold uppercase">{title}</h4>
                <h5 className="px-2 font-medium">{name}</h5>
                <h5 className="px-2 font-medium">{name2}</h5>
            </div>
        </article>
    );
}
