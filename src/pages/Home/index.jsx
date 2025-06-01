//Hooks
import { useEffect, useState } from 'react'
import useRestaurantsApi from '../../hooks/useRestaurantsApi'
import useMenuItemsApi from '../../hooks/useMenuItemsApi'

//Components
import Wrapper from '../../components/Wrapper'
import Searchbar from '../../components/Searchbar'
import VerticalGap from '../../components/VerticalGap'
import Button from '../../components/Button'
import GridWrapper from '../../components/GridWrapper'

//Helper components
import RestaurantList from './helpers/RestaurantList'

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [filterWord, setFilterWord] = useState('')

  const { getRestaurants } = useRestaurantsApi()
  const { getMenuItems } = useMenuItemsApi()
  useEffect(() => {
    ;(async () => {
      const restaurants = await getRestaurants()
      const menuItems = await getMenuItems()
      setRestaurants(restaurants)
      setMenuItems(menuItems)
    })()
  }, [])

  return (
    <>
      <Wrapper>
        <h1>Menu metrics</h1>
      </Wrapper>
      <VerticalGap />
      <Wrapper>
        <Searchbar setFilterWord={setFilterWord} />
        <Button navigateTo="/restaurant">Add new restaurant</Button>
      </Wrapper>
      <VerticalGap />
      <Wrapper>
        <GridWrapper>
          <RestaurantList restaurants={restaurants} menuItems={menuItems} filterWord={filterWord} />
        </GridWrapper>
      </Wrapper>
    </>
  )
}

export default Home
