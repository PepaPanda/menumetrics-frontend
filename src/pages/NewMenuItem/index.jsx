//Components
import Wrapper from '../../components/Wrapper'
import VerticalGap from '../../components/VerticalGap'
import SelectBox from '../../components/SelectBox'
import TextInput from '../../components/TextInput'
import Checkbox from '../../components/Checkbox'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

//Hooks
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useHandleFormSubmit } from '../../hooks/useHandleFormSubmit'
import useRestaurantsApi from '../../hooks/useRestaurantsApi'
import useForm from '../../hooks/useForm'

//Helpers
import calculateCalories from '../../helpers/calculateCalories'

const NewMenuItem = () => {
  const [searchParams] = useSearchParams()
  const restaurantIdParam = searchParams.get('restaurantid')

  const handleSubmit = useHandleFormSubmit()
  const navigate = useNavigate()
  const [formData, setFormData] = useForm('menuitem')

  //Get all restaurants
  const { getRestaurants } = useRestaurantsApi()
  const [restaurantList, setRestaurantList] = useState([])
  useEffect(() => {
    ;(async () => {
      const restaurants = await getRestaurants()
      if (!restaurants) return
      setRestaurantList(restaurants)
      if (restaurantIdParam) setFormData({ restaurantId: restaurantIdParam }, false)
    })()
  }, [])

  return (
    <>
      <VerticalGap height="10px" />
      <Wrapper style={{ width: '100%' }} colFrom="500px">
        <Logo />
        <h1>{'New menu item'}</h1>
      </Wrapper>
      <VerticalGap />
      <form
        onSubmit={(e) => {
          handleSubmit(e, 'menuitem', formData, (menuitem) => {
            if (menuitem?._id) navigate(`/menuitem/${menuitem._id}`)
          })
        }}
      >
        <Wrapper colFrom="500px">
          <>
            <SelectBox
              onChange={(e) => {
                setFormData(e)
              }}
              value={formData.restaurantId}
              name="restaurantId"
            >
              {restaurantList.map((restaurant) => (
                <SelectBox.Option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </SelectBox.Option>
              ))}
            </SelectBox>
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
          <Button data-action="POST" type="submit">
            Create new menu item
          </Button>
        </Wrapper>
      </form>
      <VerticalGap />
    </>
  )
}

export default NewMenuItem
