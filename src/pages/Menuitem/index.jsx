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
import { useNavigate, useParams } from 'react-router-dom'
import { useHandleFormSubmit } from '../../hooks/useHandleFormSubmit'
import useMenuItemsApi from '../../hooks/useMenuItemsApi'
import useRestaurantsApi from '../../hooks/useRestaurantsApi'
import useForm from '../../hooks/useForm'

//Helpers
import trimString from '../../helpers/trimString'
import calculateCalories from '../../helpers/calculateCalories'

//Data
import { defaultRestaurant } from '../../data/defaults'

const MenuItem = () => {
  const { id } = useParams()
  const handleSubmit = useHandleFormSubmit()
  const navigate = useNavigate()
  const [formData, setFormData] = useForm('menuitem')

  //Get menu item by id and restaurant
  const { getMenuItems } = useMenuItemsApi()
  const [currentMenuItemName, setCurrentMenuItemName] = useState('')
  const { getRestaurants } = useRestaurantsApi()
  const [restaurant, setRestaurant] = useState(defaultRestaurant)
  useEffect(() => {
    ;(async () => {
      const menuItem = await getMenuItems(id)
      if (!menuItem) return
      const restaurant = await getRestaurants(menuItem.restaurantId)
      if (!restaurant) return
      setFormData(menuItem, false)
      setCurrentMenuItemName(menuItem.name)
      setRestaurant(restaurant)
    })()
  }, [])

  return (
    <>
      <VerticalGap height="10px" />
      <Wrapper style={{ width: '100%' }} colFrom="500px">
        <Logo />
        <h1>{trimString(currentMenuItemName, 20)}</h1>
      </Wrapper>
      <VerticalGap />
      <Wrapper colFrom="500px">
        <SelectBox readonly={true}>
          <SelectBox.Option>{restaurant.name}</SelectBox.Option>
        </SelectBox>
        <Link to={`/restaurant/${restaurant._id}`} style={{ textDecoration: 'underline' }}>
          Go to restaurant
        </Link>
      </Wrapper>
      <VerticalGap />
      <form
        onSubmit={(e) => {
          handleSubmit(e, 'menuitem', formData, (menuItem, action) => {
            if (!menuItem) return
            if (action === 'PATCH') {
              setFormData(menuItem, false)
              setCurrentMenuItemName(menuItem.name)
            } else if (action === 'DELETE') {
              navigate(`/restaurant/${menuItem.restaurantId}`)
            }
          })
        }}
      >
        <Wrapper>
          <label>
            Name
            <TextInput
              placeholder="Menu item name"
              value={formData.name}
              onChange={(e) => {
                setFormData(e)
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
              setFormData(e)
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
                setFormData(e)
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
                setFormData(e)
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
                setFormData(e)
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
                setFormData(e)
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
                setFormData(e)
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
                setFormData(e)
              }}
              name="fiber"
              type="number"
              caption="g"
            />
          </label>
        </Wrapper>
        <VerticalGap />
        <Wrapper>
          <Button type="submit" data-action="PATCH">
            Save changes
          </Button>
          <Button
            type="submit"
            theme="danger"
            dangerMessage={`are you sure you want to delete ${currentMenuItemName}?`}
            data-action="DELETE"
          >
            Delete item
          </Button>
        </Wrapper>
      </form>
      <VerticalGap />
    </>
  )
}

export default MenuItem
