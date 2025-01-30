import { FC } from 'react'
import { formatDistance } from 'date-fns'
import { Donation } from '@/types/donation'

interface RecentDonationsProps {
  donations: Donation[]
}

export const RecentDonations: FC<RecentDonationsProps> = ({ donations }) => {
  return (
    <div className='rounded-lg border'>
      <div className='p-4 border-b'>
        <h2 className='font-semibold'>Recent Donations</h2>
      </div>
      <div className='divide-y'>
        {donations.map((donation) => (
          <div key={donation.id} className='p-4 flex justify-between'>
            <div>
              <p className='font-medium'>${donation.amount.toFixed(2)}</p>
              <p className='text-sm text-gray-500'>
                {formatDistance(new Date(donation.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  donation.status === 'COMPLETED'
                    ? 'bg-green-100 text-green-800'
                    : donation.status === 'FAILED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {donation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
