export default function ErrorsHandler({message}){

    return (
        <div className='text-red-500 font-semibold text-sm text-center'>
            {message}
        </div>
    )
}