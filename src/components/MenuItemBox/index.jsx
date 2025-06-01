import { OuterWrapperEl } from './index.styles'
const MenuItemBox = ({ children, calories, id, ...rest }) => {
  return (
    <OuterWrapperEl to={`/menuitem/${id}`} {...rest}>
      <span>{children}</span>
      <span>
        <b>{calories}</b> cal
      </span>
    </OuterWrapperEl>
  )
}

export default MenuItemBox
