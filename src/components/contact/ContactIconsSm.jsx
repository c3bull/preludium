export default function ContactIconsSm({title, href, icon, target}) {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <p className="pb-2 font-semibold uppercase">{title}</p>
            <a
                className="w-fit rounded-full border border-black bg-primary p-5 text-white text-white hover:border"
                href={href}
                target={target}
                rel="noreferrer"
            >
                {icon}
            </a>
        </div>
    );
}
