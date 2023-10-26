export default function ContactWays({href, name, title, icon, name2, name3, target, href2, href3}) {
    return (
        <article>
            <div className='flex w-full items-center'>
                <div className='h-[1px] w-full to-gray-800 from-transparent bg-gradient-to-r'/>
                <div
                    className="rounded-full mx-2 bg-gray-800 p-2"
                    rel="noreferrer"
                >
                    {icon}
                </div>
                <div className='h-[1px] w-full to-gray-800 from-transparent bg-gradient-to-l'/>
            </div>
            <div className='text-center flex flex-col justify-center items-center'>
                <h4 className="px-2 font-semibold uppercase text-gray-800">{title}</h4>
                <a href={href} className="hover:underline w-fit font-medium" target={target}>{name}</a>
                <a href={href2} className="hover:underline w-fit font-medium" target={target}>{name2}</a>
                <a href={href3} className="hover:underline w-fit font-medium" target={target}>{name3}</a>
            </div>
        </article>
    );
}
