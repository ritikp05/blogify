import CircularProgress from '@mui/material/CircularProgress';

const Loader = ( {error} ) => {
    return (
        <div className='flex justify-center items-center mt-40 z-50'>
            {
                error !==""?<h1>{error?.message}</h1>:
           <CircularProgress className='w-40' />
       }   
        </div>
    )
}

export default Loader