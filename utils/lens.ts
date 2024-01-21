import { lensAPIEndpoint } from './config'

export const getHandleFromAddress = async (
  address: string
): Promise<String | null> => {
  try {
    const data = await fetch(lensAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json' // replace with your operation name
      },
      body: JSON.stringify({
        query: `
        query {
            profiles(request: {
                where: {
                    ownedBy: "${address}"
                }
            }) {
                items {
                    handle {
                        fullHandle
                    }
                }
            }
        }
        `
      })
    }).then((res) => res.json())

    if (!data?.data?.profiles?.items[0]?.handle?.fullHandle) return null

    return data.data.profiles.items[0].handle.fullHandle
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getAddressFromHandle = async (
  handle: string
): Promise<String | null> => {
  try {
    const data = await fetch(lensAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json' // replace with your operation name
      },
      body: JSON.stringify({
        query: `
        query {
            profile(request: {
               forHandle: "${handle}"
            }) {
                ownedBy {
                    address
                }
            }
        }
        `
      })
    }).then((res) => res.json())

    if (!data?.data?.profile?.ownedBy?.address) return null

    return data.data.profile.ownedBy.address
  } catch (e) {
    console.log(e)
    return null
  }
}
