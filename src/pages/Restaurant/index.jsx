//Components
import Wrapper from '../../components/Wrapper'
import VerticalGap from '../../components/VerticalGap'
import TextInput from '../../components/TextInput'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

//Helper components
import MenuItemList from './helpers/MenuItemList'

//Hooks
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHandleFormSubmit } from '../../hooks/useHandleFormSubmit'
import useForm from '../../hooks/useForm'
import useMenuItemsApi from '../../hooks/useMenuItemsApi'
import useRestaurantsApi from '../../hooks/useRestaurantsApi'

//Helpers
import trimString from '../../helpers/trimString'

const Restaurant = () => {
  const handleSubmit = useHandleFormSubmit()
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useForm('restaurant')

  // Get the restaurant by url ID
  const { getRestaurants } = useRestaurantsApi()
  const [currentRestaurantName, setCurrentRestaurantName] = useState('')
  useEffect(() => {
    ;(async () => {
      const restaurantData = await getRestaurants(id)
      if (!restaurantData) return
      setFormData(restaurantData, false)
      setCurrentRestaurantName(restaurantData.name)
    })()
  }, [])

  // Get menuItems for this restaurant
  const { getMenuItems } = useMenuItemsApi()
  const [menuItemList, setMenuItemList] = useState([])
  useEffect(() => {
    ;(async () => {
      const menuItemsData = await getMenuItems()
      if (!menuItemsData) return
      setMenuItemList(menuItemsData)
    })()
  }, [])

  return (
    <>
      <VerticalGap height="10px" />
      <Wrapper style={{ width: '100%' }} colFrom="500px">
        <Logo />
        <h1>{trimString(currentRestaurantName, 20) || 'Unknown restaurant'}</h1>
      </Wrapper>
      <VerticalGap />
      <form
        onSubmit={(e) => {
          handleSubmit(e, 'restaurant', formData, (restaurant, action) => {
            if (!restaurant) return
            if (action === 'PATCH') {
              setFormData(restaurant, false)
              setCurrentRestaurantName(restaurant.name)
            } else if (action === 'DELETE') {
              navigate('/')
            }
          })
        }}
      >
        <Wrapper>
          <label>
            Name
            <TextInput
              placeholder="Restaurant name"
              value={formData.name}
              onChange={(e) => {
                setFormData(e)
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
                setFormData(e)
              }}
              name="address"
              required
            />
          </label>
        </Wrapper>
        <VerticalGap />
        <Wrapper>
          <>
            <Button data-action="PATCH" type="submit">
              Save changes
            </Button>
            <Button
              data-action="DELETE"
              type="submit"
              theme="danger"
              dangerMessage={`are you sure you want to delete ${currentRestaurantName}?`}
            >
              Delete restaurant
            </Button>
          </>
        </Wrapper>
      </form>
      <VerticalGap height="47px" />
      <Wrapper>
        <h2>Menu items in this restaurant</h2>
      </Wrapper>
      <VerticalGap />
      <>
        <MenuItemList menuItems={menuItemList} restaurantId={id} />
      </>
      <Wrapper>
        <Button navigateTo={`/menuitem/?restaurantid=${id}`} style={{ aspectRatio: '1/1' }}>
          <b>+</b>
        </Button>
      </Wrapper>
    </>
  )
}

export default Restaurant
