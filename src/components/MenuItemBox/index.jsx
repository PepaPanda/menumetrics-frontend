import { OuterWrapperEl } from './index.styles'
import { Link } from 'react-router-dom'
const MenuItemBox = ({ children, calories, id, ...rest }) => {
  return (
    <Link to={`/menuitem/${id}`}>
      <OuterWrapperEl {...rest}>
        <span>{children}</span>
        <span>
          <b>{calories}</b> cal
        </span>
      </OuterWrapperEl>
    </Link>
  )
}

export default MenuItemBox
