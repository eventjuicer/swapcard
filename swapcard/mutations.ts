
import { gql } from '@apollo/client';


  // Define the GraphQL mutation
  export const IMPORT_EVENT_PEOPLE = gql`
   mutation importEventPeople($eventId: ID!, $data: [ImportEventPersonInput!]!) {
  importEventPeople(eventId: $eventId, validateOnly: false, data: $data) {
    errors {
      inputId
      errorCode
      message
    }
    results {
      inputId
      eventPerson {
        id
        email
      }
    }
    eventPeopleCreated
    eventPeopleUpdated
  }
}
  `;

