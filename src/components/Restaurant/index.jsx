import { RestaurantWrapperEl, MenuItemWrapperEl, ListItem, LinkUnderline } from './index.styles'
import { Link } from 'react-router-dom'
import Button from '../Button'
import VerticalGap from '../VerticalGap'

const Restaurant = ({ id, name, address, items = [] }) => {
  return (
    <div>
      <Link to={`restaurant/${id}`}>
        <RestaurantWrapperEl>
          <b>{name}</b>
          <span>{address}</span>
        </RestaurantWrapperEl>
      </Link>
      <MenuItemWrapperEl>
        <VerticalGap height="10px" />
        {items.length === 0 ? (
          'This restaurant has no menu items. Add some'
        ) : (
          <ul>
            {items.map((i) => (
              <ListItem key={i.id}>
                <span>{`${i.name}`}</span>
                <LinkUnderline to={`/menuitem/${i.id}`}>{'>'}</LinkUnderline>
              </ListItem>
            ))}
          </ul>
        )}
        <VerticalGap height="10px" />

        <Button navigateTo="/menuitem" style={{ aspectRatio: '1/1' }}>
          <b>+</b>
        </Button>
      </MenuItemWrapperEl>
    </div>
  )
}

export default Restaurant
