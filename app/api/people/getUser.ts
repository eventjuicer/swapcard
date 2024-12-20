"use server"

export async function getUser(id: string) {


    const data = await fetch("https://api.eventjuicer.com/v1/extapi/participants", {
        method: "GET",
        headers: {
            "x-token": `${process.env.EVENTJUICER_API_KEY}`
        }
    })

    return {
        name: "John Doe"
    }
}