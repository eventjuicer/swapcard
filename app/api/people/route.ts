import { gql } from '@apollo/client';
import createApolloClient from '@/apollo-client'
import { NextResponse, NextRequest } from 'next/server';
import { getUser } from './getUser';




export async function GET(req: NextRequest) {
  
  const token = req.nextUrl.searchParams.get("token")

  const user = await getUser(token)

  if(!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }


  console.log(user)

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
              "clientId": user.id,
              "create": {
                "isUser": true,
                "email": user.email,
                "firstName": user.fields.fname,
                "lastName": user.fields.lname,
                "jobTitle": user.fields.position || "",
                "organization": user.fields.cname || "",
                "biography": user.fields.bio || "",
                "websiteUrl": "https://www.tesla.com",
                "photoUrl": "https://fakeimg.pl/300/picture.jpg",
                "mobilePhone": user.fields.phone || "",

                "socialNetworks": [
                  {
                    "type": "LINKEDIN",
                    "profile": "updatejohndoe"
                  }
                ],
                "customFields": [
                  {
                    "groupId": "RmllbGREZWZpbml0aW9uXzc5Mjc1OA==",
                    "action": "SET_VALUE",
                    "value": "day1-feb19"
                }],
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
