'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    imageUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement event creation/update logic
  }

  return (
    <AdminLayout>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Events Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Add New Event
          </button>
        </div>

        {showForm && (
          <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <label className='block mb-2'>Title</label>
                  <input
                    type='text'
                    className='w-full border rounded px-3 py-2'
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className='block mb-2'>Location</label>
                  <input
                    type='text'
                    className='w-full border rounded px-3 py-2'
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                {/* Add more form fields */}
              </div>
              <div className='mt-4'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='bg-white shadow rounded-lg p-6'>
          {/* Events list */}
        </div>
      </div>
    </AdminLayout>
  )
}

export default EventsPage
