//Env variables
const baseUrl = import.meta.env.VITE_API_BASE

//Components
import Wrapper from '../../components/Wrapper'
import VerticalGap from '../../components/VerticalGap'
import TextInput from '../../components/TextInput'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import MenuItemBox from '../../components/MenuItemBox'

//Hooks
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

//Helpers
import trimString from '../../helpers/trimString'
import calculateCalories from '../../helpers/calculateCalories'

const Restaurant = () => {
  const [error, setError] = useState(null)
  const [submitResponse, setSubmitResponse] = useState(null)

  const [menuItemList, setMenuItemList] = useState([])

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    address: '',
  })

  const [initialRestaurantName, setInitialRestaurantName] = useState('')

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const res = await fetch(`${baseUrl}/restaurants/${id}`)
          const json = await res.json()

          if (!res.ok) throw new Error(json.error || 'Fetch failed')

          setFormData({
            id: json._id,
            name: json.name,
            address: json.address || '',
          })
          setInitialRestaurantName(json.name)
        } catch (e) {
          setError(e.message)
        }
      }
      fetchRestaurant()

      const fetchMenuItems = async () => {
        try {
          const res = await fetch(`${baseUrl}/menuitems/`)
          const json = await res.json()

          if (!res.ok) throw new Error(json.error || 'Fetch failed')

          setMenuItemList(json)
        } catch (e) {
          setError(e.message)
        }
      }
      fetchMenuItems()
    }
  }, [])

  const handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData({
      ...formData,
      [name]: value,
    })

    console.log(formData)
  }

  const parseFormDataToSend = () => {
    //TODO validate mandatory fields

    const dataToSend = {
      name: formData.name !== '' ? formData.name : null,
      address: formData.address !== '' ? formData.address : null,
    }

    return dataToSend
  }

  const renderMenuItemList = () => {
    if (menuItemList.length === 0) return 'This restaurant has no menu items. Add some'

    const restaurantsMenuItemList = menuItemList.filter((item) => item.restaurantId === id)
    if (restaurantsMenuItemList.length === 0) return 'This restaurant has no menu items. Add some'

    return restaurantsMenuItemList.map((restaurantsItem) => (
      <MenuItemBox
        key={restaurantsItem._id}
        id={restaurantsItem._id}
        calories={calculateCalories(restaurantsItem)}
      >
        {restaurantsItem.name}
      </MenuItemBox>
    ))
  }

  return (
    <>
      <VerticalGap height="10px" />
      <Wrapper style={{ width: '100%' }} colFrom="500px">
        <Logo />
        <h1>{trimString(initialRestaurantName, 20) || 'New restaurant'}</h1>
      </Wrapper>
      <VerticalGap />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Wrapper>
          <label>
            Name
            <TextInput
              placeholder="Restaurant name"
              value={formData.name}
              onChange={(e) => {
                handleFormChange(e)
              }}
              name="name"
              required
            />
          </label>
        </Wrapper>
        <Wrapper>
          <label>
            Address
            <TextInput
              placeholder="Restaurant address"
              value={formData.address}
              onChange={(e) => {
                handleFormChange(e)
              }}
              name="address"
              required
            />
          </label>
        </Wrapper>
        <VerticalGap />
        <Wrapper>
          {/* remake - transfer logic to formsubmit */}

          {id && (
            <>
              <Button
                type="submit"
                onClick={async () => {
                  try {
                    const res = await fetch(`${baseUrl}/restaurants/${formData.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(parseFormDataToSend()),
                    })
                    const json = await res.json()
                    if (!res.ok) {
                      setSubmitResponse(json.error || 'an unknown error occured')
                    } else if (res.status === 200) {
                      navigate(`/restaurant/${json._id}/?submitresponse=item succesfully updated`)
                      window.location.reload() //No need to reload, just load response data
                    } else {
                      throw new Error('Unexpected error occured')
                    }
                  } catch (err) {
                    setSubmitResponse(err)
                  }
                }}
              >
                Save changes
              </Button>
              <Button
                type="submit"
                theme="danger"
                dangerMessage={`are you sure you want to delete ${initialRestaurantName}?`}
                onClick={async () => {
                  try {
                    const res = await fetch(`${baseUrl}/restaurants/${formData.id}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    })
                    const json = await res.json()
                    if (!res.ok) {
                      setSubmitResponse(json.error || 'an unknown error occured')
                    } else if (res.status === 200) {
                      navigate(`/`)
                    } else {
                      throw new Error('Unexpected error occured')
                    }
                  } catch (err) {
                    setSubmitResponse(err)
                  }
                }}
              >
                Delete restaurant
              </Button>
            </>
          )}

          {!id && (
            <Button
              type="submit"
              onClick={async () => {
                try {
                  const res = await fetch(`${baseUrl}/restaurants`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parseFormDataToSend()),
                  })
                  const json = await res.json()
                  if (!res.ok) {
                    setSubmitResponse(json.error || 'an unknown error occured')
                  } else if (res.status === 201) {
                    navigate(
                      `/restaurant/${json._id}/?submitresponse=restaurant succesfully created`
                    )
                    window.location.reload() //No need to reload, just load response data
                  } else {
                    throw new Error('Unexpected error occured')
                  }
                } catch (err) {
                  setSubmitResponse(err)
                }
              }}
            >
              Create new restaurant
            </Button>
          )}
        </Wrapper>
      </form>
      <VerticalGap height="47px" />
      <Wrapper>
        <h2>Menu items in this restaurant</h2>
      </Wrapper>
      <VerticalGap />
      <Wrapper>
        {renderMenuItemList()}
        {/* Would be nice to forward user to /menuitem/ with pre-selected restaurant */}
      </Wrapper>
    </>
  )
}

export default Restaurant
