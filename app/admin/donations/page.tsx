'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

const DonationsPage = () => {
  const [donations, setDonations] = useState([])
  const [selectedDonation, setSelectedDonation] = useState(null)

  const handleRefund = async (donationId: string) => {
    // Implement refund logic
  }

  return (
    <AdminLayout>
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Donations Management</h1>

        <div className='bg-white shadow rounded-lg p-6'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-6 py-3 border-b'>ID</th>
                <th className='px-6 py-3 border-b'>User</th>
                <th className='px-6 py-3 border-b'>Amount</th>
                <th className='px-6 py-3 border-b'>Status</th>
                <th className='px-6 py-3 border-b'>Payment Method</th>
                <th className='px-6 py-3 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>{/* Donation rows will go here */}</tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default DonationsPage
