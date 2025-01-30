import {
  Event,
  User,
  Profile,
  EventNotification,
  EmailList,
} from '@prisma/client'

export type EventWithRelations = Event & {
  user: User & {
    profile: Profile | null
  }
  notifications: EventNotification[]
  emailLists: EmailList[]
}
