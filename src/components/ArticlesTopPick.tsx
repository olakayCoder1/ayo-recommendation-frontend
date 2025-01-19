import React from 'react'



const Card = () => {
    return (
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    )
}


const ArticlesTopPick:React.FC = () => {
    return (
        <>
            <div className=' py-4'>
                <h3 className='text-xl font-medium pb-2'>
                Top pick for you on articles
                </h3>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </>
    )
}


export default ArticlesTopPick;