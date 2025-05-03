'use client'

const Err = ({ error }: any) =>{
    console.error(error);
    return( 
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-4 w-1/2 mb-4 text-sm text-red-800 rounded-lg bg-red-200 text-center dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Failure during fetching or processing!</span>
                <br />
                <b>{String(error)}</b>
            </div>
        </div>
    )
}

export default Err;