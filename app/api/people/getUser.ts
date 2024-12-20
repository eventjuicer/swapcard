"use server"

export async function getUser(token: string) {


    const request = await fetch(`https://api.eventjuicer.com/v1/extapi/participants/${token}`, {
        method: "GET",
        headers: {
            "x-token": `${process.env.EVENTJUICER_API_KEY}`
        }
    })

    const data = await request.json()

    return data?.data
}