// emails/event-notification.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'
import { format } from 'date-fns'

interface EventNotificationEmailProps {
  event: {
    title: string
    description: string
    location: string
    startDate: Date
    endDate: Date
    imageUrl?: string
  }
}

export const EventNotificationEmail = ({
  event,
}: EventNotificationEmailProps) => {
  const previewText = `New Event: ${event.title}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {event.imageUrl && (
            <Img
              src={event.imageUrl}
              alt={event.title}
              width='600'
              height='300'
              style={image}
            />
          )}
          <Text style={title}>{event.title}</Text>
          <Text style={description}>{event.description}</Text>
          <Section style={eventDetails}>
            <Text style={detailLabel}>
              When: {format(new Date(event.startDate), 'PPP')} -{' '}
              {format(new Date(event.endDate), 'PPP')}
            </Text>
            <Text style={detailLabel}>Where: {event.location}</Text>
          </Section>
          <Hr style={hr} />
          <Button
            style={button}
            href={`${process.env.NEXT_PUBLIC_APP_URL}/events/${event.id}`}
          >
            View Event Details
          </Button>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
}

const image = {
  borderRadius: '8px',
  marginBottom: '24px',
}

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 15px',
}

const description = {
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 24px',
}

const eventDetails = {
  margin: '0 0 24px',
}

const detailLabel = {
  fontSize: '14px',
  margin: '0 0 4px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const button = {
  backgroundColor: '#000000',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}
