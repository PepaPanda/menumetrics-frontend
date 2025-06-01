//Env variables
const baseUrl = import.meta.env.VITE_API_BASE

//Hooks
import { useError } from "./ErrorContext"

const useMenuItemsApi = () => {
  const {setError} = useError()

  //Function to be exported. Simplifies API interaction in components
    const getMenuItems = async (id) => {
      let res
      try {
        if (id) {
          res = await fetch(`${baseUrl}/menuitems/${id}`)
        } else {
          res = await fetch(`${baseUrl}/menuitems`)
        }
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Fetch failed')
        return json
      } catch (err) {
        setError(err.message)
        return null
      }
    }

  //Function to be exported. Simplifies API interaction in components
  const setMenuItem = async (id, reqType, data) => {
    const allowedMethods = ['POST', 'PATCH', 'DELETE']
    if (!allowedMethods.includes(reqType)) {
      setError(`Method ${reqType} not allowed, allowed methods: ${allowedMethods.join()}`)
      return
    }

    try {
      const res = await fetch(`${baseUrl}/menuitems/${id || ''}`, {
        method: reqType,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok) return json

      if (!res.ok) 
        throw new Error(json.error || 'an unknown error occured')

    } catch (err) {
      setError(err.message)
      return null
    }
  }

  return {getMenuItems, setMenuItem}
}

export default useMenuItemsApi
