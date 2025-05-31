//This entire component should be decomposed. I'm totally aware, but I have to prioritize making this project in time.

//Env variables
const baseUrl = import.meta.env.VITE_API_BASE

//Components
import Wrapper from '../../components/Wrapper'
import VerticalGap from '../../components/VerticalGap'
import SelectBox from '../../components/SelectBox'
import TextInput from '../../components/TextInput'
import Checkbox from '../../components/Checkbox'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

//Hooks
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

//Helpers
import trimString from '../../helpers/trimString'
import calculateCalories from '../../helpers/calculateCalories'

const MenuItem = () => {
  const [error, setError] = useState(null)
  const [submitResponse, setSubmitResponse] = useState(null)
  const [allRestaurants, setAllRestaurants] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    restaurantId: '',
    rating: false,
    carbohydrates: '',
    sugars: '',
    fats: '',
    proteins: '',
    salts: '',
    fiber: '',
  })

  const [initialMenuItemName, setInitialMenuItemName] = useState('')
  const [initialRestaurantId, setInitialRestaurantId] = useState('')

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      const fetchRestaurants = async () => {
        try {
          const res = await fetch(`${baseUrl}/restaurants`)
          const json = await res.json()
          if (!res.ok) throw new Error(json.error || 'Fetch failed')
          setAllRestaurants(json)
          setFormData({
            id: null,
            name: '',
            restaurantId: json[0]._id,
            rating: false,
            carbohydrates: '',
            sugars: '',
            fats: '',
            proteins: '',
            salts: '',
            fiber: '',
          })
        } catch (e) {
          setError(e.message)
        }
      }
      fetchRestaurants()
    }

    if (id) {
      const fetchMenuItem = async () => {
        try {
          const menuItemRes = await fetch(`${baseUrl}/menuitems/${id}`)
          const menuItemJson = await menuItemRes.json()
          if (!menuItemRes.ok) throw new Error(menuItemJson.error || 'Fetch failed')

          const restaurantRes = await fetch(`${baseUrl}/restaurants/${menuItemJson.restaurantId}`)
          const restaurantJson = await restaurantRes.json()
          if (!restaurantRes.ok) throw new Error(restaurantJson.error || 'Fetch failed')
          setFormData({
            id: menuItemJson._id,
            name: menuItemJson.name,
            restaurantId: menuItemJson.restaurantId,
            rating: menuItemJson.rating ?? false,
            restaurantName: restaurantJson.name,
            carbohydrates: menuItemJson.carbohydrates ?? '',
            sugars: menuItemJson.sugars ?? '',
            fats: menuItemJson.fats ?? '',
            proteins: menuItemJson.proteins ?? '',
            salts: menuItemJson.salts ?? '',
            fiber: menuItemJson.fiber ?? '',
          })
          setInitialMenuItemName(menuItemJson.name)
          setInitialRestaurantId(menuItemJson.restaurantId)
        } catch (e) {
          setError(e.message)
        }
      }
      fetchMenuItem()
    }
  }, [])

  const handleFormChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    if (name === 'rating') {
      setFormData({
        ...formData,
        rating: e.target.checked,
      })
      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })

    console.log(formData)
  }

  const parseFormDataToSend = () => {
    //TODO validate mandatory fields

    const dataToSend = {
      name: formData.name,
      restaurantId: formData.restaurantId,
      rating: formData.rating,
      carbohydrates: parseInt(formData.carbohydrates) ?? null,
      sugars: parseInt(formData.sugars) ?? null,
      fats: parseInt(formData.fats) ?? null,
      proteins: parseInt(formData.proteins) ?? null,
      salts: parseInt(formData.salts) ?? null,
      fiber: parseInt(formData.fiber) ?? null,
    }

    return dataToSend
  }

  return (
    <>
      {error && error}
      <VerticalGap height="10px" />
      <Wrapper style={{ width: '100%' }} colFrom="500px">
        <Logo />
        <h1>{trimString(initialMenuItemName, 20) || 'New menu item'}</h1>
      </Wrapper>
      <VerticalGap />
      <Wrapper colFrom="500px">
        {/* This error handling is not good. It would be better to have an error component */}
        <>
          {id ? (
            <>
              <SelectBox readonly={true}>
                <SelectBox.Option>{formData?.restaurantName}</SelectBox.Option>
              </SelectBox>
              <Link
                to={`/restaurant/${initialRestaurantId}`}
                style={{ textDecoration: 'underline' }}
              >
                Go to restaurant
              </Link>
            </>
          ) : (
            <SelectBox
              onChange={(e) => {
                handleFormChange(e)
              }}
              value={formData.restaurantId}
              name="restaurantId"
            >
              {allRestaurants.map((restaurant) => (
                <SelectBox.Option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </SelectBox.Option>
              ))}
            </SelectBox>
          )}
        </>
      </Wrapper>
      <VerticalGap />
      <Wrapper>
        <label>
          Name
          <TextInput
            placeholder="Menu item name"
            value={formData.name}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="name"
          />
        </label>
      </Wrapper>
      <VerticalGap height={'10px'} />
      <Wrapper>
        <Checkbox
          checked={formData.rating}
          onChange={(e) => {
            handleFormChange(e)
          }}
          name="rating"
        >
          Like this item?
        </Checkbox>
      </Wrapper>
      <VerticalGap height={'30px'} />
      <Wrapper>
        <h2>{`Total calories: ${calculateCalories(formData)}`}</h2>
      </Wrapper>
      <VerticalGap height={'30px'} />
      <Wrapper>
        <label>
          Carbs
          <TextInput
            placeholder="Carbs"
            value={formData.carbohydrates}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="carbohydrates"
            type="number"
            caption="g"
          />
        </label>
      </Wrapper>
      <VerticalGap height={'10px'} />
      <Wrapper>
        <label>
          Sugars
          <TextInput
            placeholder="Sugars"
            value={formData.sugars}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="sugars"
            type="number"
            caption="g"
          />
        </label>
      </Wrapper>
      <VerticalGap height={'10px'} />
      <Wrapper>
        <label>
          Fats
          <TextInput
            placeholder="Fats"
            value={formData.fats}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="fats"
            type="number"
            caption="g"
          />
        </label>
      </Wrapper>
      <VerticalGap height={'10px'} />
      <Wrapper>
        <label>
          Proteins
          <TextInput
            placeholder="Proteins"
            value={formData.proteins}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="proteins"
            type="number"
            caption="g"
          />
        </label>
      </Wrapper>
      <VerticalGap height={'10px'} />
      <Wrapper>
        <label>
          Salts
          <TextInput
            placeholder="Salts"
            value={formData.salts}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="salts"
            type="number"
            caption="g"
          />
        </label>
      </Wrapper>
      <VerticalGap height={'10px'} />
      <Wrapper>
        <label>
          Fiber
          <TextInput
            placeholder="Fiber"
            value={formData.fiber}
            onChange={(e) => {
              handleFormChange(e)
            }}
            name="fiber"
            type="number"
            caption="g"
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
                  const res = await fetch(`${baseUrl}/menuitems/${formData.id}`, {
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
                    navigate(`/menuitem/${json._id}/?submitresponse=item succesfully updated`)
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
              dangerMessage={`are you sure you want to delete ${initialMenuItemName}?`}
              onClick={async () => {
                try {
                  const res = await fetch(`${baseUrl}/menuitems/${formData.id}`, {
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
              Delete item
            </Button>
          </>
        )}

        {!id && (
          <Button
            type="submit"
            onClick={async () => {
              try {
                const res = await fetch(`${baseUrl}/menuitems`, {
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
                  navigate(`/menuitem/${json._id}/?submitresponse=item succesfully created`)
                  window.location.reload() //No need to reload, just load response data
                } else {
                  throw new Error('Unexpected error occured')
                }
              } catch (err) {
                setSubmitResponse(err)
              }
            }}
          >
            Create new menu item
          </Button>
        )}
      </Wrapper>
      <VerticalGap />
      {submitResponse && JSON.stringify(submitResponse)}{' '}
      {/* Make this a pop-up or an upper/lower bar */}
    </>
  )
}

export default MenuItem
