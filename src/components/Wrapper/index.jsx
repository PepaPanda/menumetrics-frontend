import WrapperEl from './index.styles'

const Wrapper = ({ children, colFrom = '450px', border, ...rest }) => {
  return (
    <WrapperEl $colFrom={colFrom} $border={border} {...rest}>
      {children}
    </WrapperEl>
  )
}

export default Wrapper
