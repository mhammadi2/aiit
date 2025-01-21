'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Heart,
  CreditCard,
  Building2,
  PaypalIcon,
  Calendar,
  AlertCircle,
  PieChart,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Users,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DonatePage() {
  const { data: session } = useSession()
  const [amount, setAmount] = useState<number>(50)
  const [isRecurring, setIsRecurring] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const quickAmounts = [25, 50, 100, 250, 500]

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white'>
        <div className='container mx-auto px-6 py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <h1 className='text-5xl font-bold leading-tight'>
                Support Our
                <span className='block text-emerald-300'>Islamic Mission</span>
              </h1>
              <p className='text-xl text-emerald-100'>
                Your generosity helps us spread Islamic knowledge and build
                stronger communities. All donations are tax-deductible.
              </p>
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full opacity-20 blur-3xl'></div>
                <img
                  src='/images/donate-hero.jpg'
                  alt='Donation Impact'
                  className='relative z-10 rounded-lg shadow-xl'
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Main Donation Form */}
            <div className='lg:col-span-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>
                    Choose your donation type and amount
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-8'>
                  {/* Amount Selection */}
                  <div className='space-y-4'>
                    <Label>Select Amount</Label>
                    <div className='grid grid-cols-5 gap-4'>
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant={
                            amount === quickAmount ? 'default' : 'outline'
                          }
                          className='bg-emerald-500 hover:bg-emerald-600'
                          onClick={() => setAmount(quickAmount)}
                        >
                          ${quickAmount}
                        </Button>
                      ))}
                    </div>
                    <div className='flex items-center space-x-2'>
                      <div className='relative flex-1'>
                        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
                          $
                        </span>
                        <Input
                          type='number'
                          placeholder='Custom amount'
                          value={amount}
                          onChange={handleCustomAmount}
                          className='pl-8'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recurring Option */}
                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='recurring'
                      checked={isRecurring}
                      onCheckedChange={setIsRecurring}
                    />
                    <Label htmlFor='recurring'>
                      Make this a monthly donation
                    </Label>
                  </div>

                  {/* Payment Method */}
                  <Tabs
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className='space-y-4'
                  >
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger value='card'>Credit Card</TabsTrigger>
                      <TabsTrigger value='bank'>Bank Transfer</TabsTrigger>
                      <TabsTrigger value='paypal'>PayPal</TabsTrigger>
                    </TabsList>

                    <TabsContent value='card' className='space-y-4'>
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <Label>Card Number</Label>
                          <Input placeholder='1234 5678 9012 3456' />
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                          <div className='space-y-2'>
                            <Label>Expiry</Label>
                            <Input placeholder='MM/YY' />
                          </div>
                          <div className='space-y-2'>
                            <Label>CVC</Label>
                            <Input placeholder='123' />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value='bank'>
                      <div className='p-4 bg-emerald-50 text-emerald-800 rounded-lg'>
                        Bank transfer details will be provided after submission.
                      </div>
                    </TabsContent>

                    <TabsContent value='paypal'>
                      <div className='p-4 bg-emerald-50 text-emerald-800 rounded-lg'>
                        You will be redirected to PayPal to complete your
                        donation.
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Personal Information */}
                  <div className='space-y-4'>
                    <h3 className='font-semibold'>Personal Information</h3>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label>First Name</Label>
                        <Input placeholder='Enter your first name' />
                      </div>
                      <div className='space-y-2'>
                        <Label>Last Name</Label>
                        <Input placeholder='Enter your last name' />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label>Email</Label>
                      <Input type='email' placeholder='Enter your email' />
                    </div>
                  </div>

                  <Button
                    className='w-full bg-emerald-500 hover:bg-emerald-600'
                    size='lg'
                  >
                    Complete Donation of ${amount}
                    {isRecurring ? ' Monthly' : ''}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Impact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {impactAreas.map((area) => (
                    <div key={area.name} className='space-y-2'>
                      <div className='flex justify-between'>
                        <span>{area.name}</span>
                        <span className='font-medium'>{area.percentage}%</span>
                      </div>
                      <div className='w-full bg-gray-100 rounded-full h-2'>
                        <div
                          className='bg-emerald-500 h-2 rounded-full'
                          style={{ width: `${area.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Common Questions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {faqs.map((faq) => (
                    <details key={faq.question} className='group'>
                      <summary className='cursor-pointer font-medium'>
                        {faq.question}
                      </summary>
                      <p className='mt-2 text-sm text-gray-600'>{faq.answer}</p>
                    </details>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const impactAreas = [
  { name: 'Educational Programs', percentage: 40 },
  { name: 'Scholarships', percentage: 30 },
  { name: 'Community Programs', percentage: 20 },
  { name: 'Operations', percentage: 10 },
]

const faqs = [
  {
    question: 'Is my donation tax-deductible?',
    answer:
      'Yes, all donations are tax-deductible. You will receive a receipt for your tax records immediately after your donation.',
  },
  {
    question: 'How secure is my payment information?',
    answer:
      'We use industry-standard encryption and security measures to protect your payment information. We never store your card details.',
  },
  {
    question: 'Can I cancel my recurring donation?',
    answer:
      'Yes, you can cancel your recurring donation at any time through your account or by contacting our support team.',
  },
]
