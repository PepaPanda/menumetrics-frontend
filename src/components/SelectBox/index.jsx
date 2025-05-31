//Styled
import { SelectEl } from './index.styles'

//Child element
import Option from './Option'

const SelectBox = ({ readonly = false, children, ...rest }) => {
  return (
    <SelectEl disabled={readonly} {...rest}>
      {children}
    </SelectEl>
  )
}

SelectBox.Option = Option

export default SelectBox
