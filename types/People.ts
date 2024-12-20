type EventPerson {
    id: ID!
    userId: ID
    email: String
    firstName: String!
    lastName: String!
    jobTitle: String
    secondJobTitle: String @deprecated
    photoUrl: String
    organization: String
    websiteUrl: String
    biography: String
    address: Address
    phoneNumbers: [PhoneNumber!]!
    socialNetworks: [SocialNetwork!]!
    tags: [String!]! @deprecated
    badges: [BadgeUnion!]! @deprecated
    groups: [EventGroup!]!
    fields: [FieldUnion!]!
    customFields: [CustomFieldUnion!]! @deprecated
    isVisible: Boolean!
    source: EventPersonSource
    createdAt: DateTime!
    updatedAt: DateTime!
    communityProfileUpdatedAt: DateTime!
    type: String
    speakerOnPlannings: [Planning!]!
    attendeeOnPlannings: [Planning!]! @deprecated
    memberOnExhibitors: [Exhibitor!]!
    engagementScore: Float! @deprecated
    clientIds: [ID!]!
    bookmarkedExhibitors: [Exhibitor!]! @deprecated
    bookmarkedProducts: [Product!]! @deprecated
    registration: Registration
    events(
      cursor: CursorPaginationInput
    ): EventsConnection!
    withEvent(
      eventId: ID!
    ): EventPersonWithEvent
  }