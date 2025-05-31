import { CheckboxEl, LabelWrapperEl } from './index.styles'

const Checkbox = ({ children, ...rest }) => {
  return (
    <LabelWrapperEl>
      {children}
      <CheckboxEl type="checkbox" {...rest} />
    </LabelWrapperEl>
  )
}

export default Checkbox
