//Env variables
const baseUrl = import.meta.env.VITE_API_BASE

//Hooks
import { useEffect, useState } from 'react'

//Components
import Wrapper from '../../components/Wrapper'
import Searchbar from '../../components/Searchbar'
import VerticalGap from '../../components/VerticalGap'
import Button from '../../components/Button'
import GridWrapper from '../../components/GridWrapper'
import Restaurant from '../../components/Restaurant'
import { Link } from 'react-router-dom'

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState(null)
  const [filterWord, setFilterWord] = useState('')

  //Fetch the data
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${baseUrl}/restaurants`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Fetch failed')
        setRestaurants(json)
      } catch (e) {
        setError(e.message)
      }
    }

    const fetchMenuItems = async () => {
      try {
        const res = await fetch(`${baseUrl}/menuitems`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Fetch failed')
        setMenuItems(json)
      } catch (e) {
        setError(e.message)
      }
    }

    fetchMenuItems()
    fetchRestaurants()
  }, [])

  const renderRestaurants = () => {
    if (restaurants.length === 0)
      return (
        <>
          <span style={{ marginTop: '3rem' }}>
            You don't have any restaurants yet,{' '}
            <Link to="/restaurant" style={{ textDecoration: 'underline' }}>
              create a new restaurant
            </Link>
          </span>
        </>
      )

    const filteredRestaurants = restaurants?.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(filterWord)
    })

    if (filteredRestaurants.length === 0)
      return 'There are no restaurants matching your search results'

    return filteredRestaurants.map((restaurant) => (
      <Restaurant
        key={restaurant._id}
        id={restaurant._id}
        name={restaurant.name}
        address={restaurant.address}
        items={menuItems
          .filter((menuItem) => {
            return menuItem.restaurantId === restaurant._id
          })
          .map((menuItem) => ({ name: menuItem.name, id: menuItem._id }))}
      />
    ))
  }

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
        {!error ? <GridWrapper>{renderRestaurants()}</GridWrapper> : `Neco se posralo: ${error}`}
      </Wrapper>
    </>
  )
}

export default Home
