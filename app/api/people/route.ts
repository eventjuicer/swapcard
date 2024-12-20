import { gql } from '@apollo/client';
import createApolloClient from '@/apollo-client'
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  
  
  // Define the GraphQL mutation
  const IMPORT_EVENT_PEOPLE = gql`
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

  const client = createApolloClient();
 

  



  try {
    // Run the mutation
    const { data } = await client.mutate({
      mutation: IMPORT_EVENT_PEOPLE,
      variables: {

        
          "eventId": "RXZlbnRfMjQ0NTIxNg==",
           "data": [
            {
              "clientId": "987654321",
              "update": {
                "isUser": true,
                "email": "test@test.com",
                "firstName": "John",
                "lastName": "Doe",
                "jobTitle": "CEO",
                "organization": "Tesla",
                "biography": "Lorem ipsum dolor sit amet, odio prima pri te, id sanctus recteque deterruisset vel. Dico tractatos eam eu, dolor inciderint in est.",
                "websiteUrl": "https://www.tesla.com",
                "photoUrl": "https://fakeimg.pl/300/picture.jpg",
                "mobilePhone": "+1-541-754-3010",

                "socialNetworks": [
                  {
                    "type": "LINKEDIN",
                    "profile": "updatejohndoe"
                  }
                ],
                // "customFields": [
                //   {
                //     "groupId": "RXZlbnRQZW9wZEdyb3VwXzExMA==",
                //     "action": "SET_VALUE",
                //     "value": "Research & Development 1"
                // }],
            }, 

            "actions": {
            "updateGroups": {
            "action": "ADD",
            "groupIds": [
              "RXZlbnRHcm91cF81OTA2NjM="
            ]
            }}
      
      }]

      },
    });

    if("errors" in data.importEventPeople && Array.isArray(data.importEventPeople.errors) && data.importEventPeople.errors.length > 0) {
      console.error('Error importing people:', data.importEventPeople.errors);
      // Return an error response
      return NextResponse.json({ error: 'Failed to import people', details: data.importEventPeople.errors });

    }

    // Return the result back to the client
    return NextResponse.json( data.importEventPeople );
  } catch (error) {
    console.error('Error importing people:', error);
    // Return an error response
    return NextResponse.json({ error: 'Failed to import people', details: error });
  }
}
