import { FC } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <div className='rounded-lg border p-4 flex items-start space-x-4'>
      {icon && <div className='text-primary'>{icon}</div>}
      <div>
        <h3 className='font-medium text-gray-500'>{title}</h3>
        <div className='text-2xl font-bold'>{value}</div>
        {description && <p className='text-sm text-gray-500'>{description}</p>}
      </div>
    </div>
  )
}
