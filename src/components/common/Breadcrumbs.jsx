import {Link, useLocation} from "react-router-dom";

export default function Breadcrumbs() {

    const location = useLocation()
    let currentLink = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`

            return (
                <div key={crumb} className='flex'>
                    <p className='hidden md:block md:px-2'>•</p> <Link to={currentLink}>{crumb.split('+').join(' ')}</Link>
                </div>
            )
        })

    return (
        <main className='h-full flex flex-col md:flex-row justify-center items-center text-black font-semibold uppercase'>
            <Link to="/">Home</Link>{crumbs}
        </main>
    )
}