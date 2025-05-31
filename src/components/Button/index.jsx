import { ButtonEl } from './index.styles'
import { useNavigate } from 'react-router-dom'

const Button = ({ children, navigateTo, onClick, theme = 'regular', dangerMessage, ...rest }) => {
  const navigate = useNavigate()
  const handleClick = (e) => {
    if (navigateTo) {
      navigate(navigateTo)
      return
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <ButtonEl
      onClick={(e) => {
        if (theme === 'danger') {
          const confirmed = confirm(dangerMessage || 'Are you sure you want to proceed?')
          if (!confirmed) return
        }
        handleClick(e)
      }}
      {...rest}
      $theme={theme}
    >
      {children}
    </ButtonEl>
  )
}

export default Button
