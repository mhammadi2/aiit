export const EventSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='md:flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
        <div className='md:w-1/3 bg-gray-200 dark:bg-gray-700 h-48 md:h-full' />
        <div className='p-6 md:w-2/3 space-y-4'>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4' />
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6' />
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3' />
          </div>
        </div>
      </div>
    </div>
  )
}
