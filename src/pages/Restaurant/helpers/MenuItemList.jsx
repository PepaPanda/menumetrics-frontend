import MenuItemBox from '../../../components/MenuItemBox'
import calculateCalories from '../../../helpers/calculateCalories'
import Wrapper from '../../../components/Wrapper'
import VerticalGap from '../../../components/VerticalGap'

const MenuItemList = ({ menuItems, restaurantId }) => {
  const filtered = menuItems.filter((item) => item.restaurantId === restaurantId)

  if (filtered.length === 0) {
    return (
      <Wrapper>
        <p>This restaurant has no menu items. Add some</p>
      </Wrapper>
    )
  }

  return (
    <>
      {filtered.map((item) => (
        <div key={item._id}>
          <Wrapper style={{ width: '100%' }}>
            <MenuItemBox key={item._id} id={item._id} calories={calculateCalories(item)}>
              {item.name}
            </MenuItemBox>
          </Wrapper>
          <VerticalGap height="10px" />
        </div>
      ))}
    </>
  )
}

export default MenuItemList
