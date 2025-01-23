// components/admin/dashboard/overview.tsx
'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface OverviewProps {
  initialData: {
    donations: number[]
    events: number[]
    posts: number[]
    labels: string[]
    totalDonations: number
  }
}

export function Overview({ initialData }: OverviewProps) {
  const [data, setData] = useState(initialData)

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Donations',
        data: data.donations,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Events',
        data: data.events,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
      {
        label: 'Posts',
        data: data.posts,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          Total Donations: {formatCurrency(data.totalDonations)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
