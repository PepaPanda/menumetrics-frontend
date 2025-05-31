import { WrapperEl, CaptionEl } from './index.styles'

const TextInput = ({ caption, type = 'text', ...rest }) => {
  return (
    <WrapperEl>
      <input type={type} {...rest} />
      {caption && <CaptionEl>{caption}</CaptionEl>}
    </WrapperEl>
  )
}

export default TextInput
