import { Link } from 'react-router-dom'
import RestaurantBox from '../../../components/RestaurantBox'

const RestaurantList = ({ restaurants, menuItems, filterWord }) => {
  if (!restaurants || restaurants.length === 0) {
    return (
      <span style={{ marginTop: '3rem' }}>
        You don't have any restaurants yet,&nbsp;
        <Link to="/restaurant" style={{ textDecoration: 'underline' }}>
          create a new restaurant
        </Link>
      </span>
    )
  }

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(filterWord.toLowerCase())
  )

  if (filteredRestaurants.length === 0) {
    return <span>There are no restaurants matching your search results.</span>
  }

  return (
    <>
      {filteredRestaurants.map((restaurant) => {
        const associatedMenuItems = menuItems
          .filter((item) => item.restaurantId === restaurant._id)
          .map((item) => ({ name: item.name, id: item._id }))

        return (
          <RestaurantBox
            key={restaurant._id}
            id={restaurant._id}
            name={restaurant.name}
            address={restaurant.address}
            items={associatedMenuItems}
          />
        )
      })}
    </>
  )
}

export default RestaurantList
