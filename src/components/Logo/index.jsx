import { ImgEl } from './index.styles'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

const Logo = () => {
  return (
    <Link to="/">
      <ImgEl src={logo}></ImgEl>
    </Link>
  )
}

export default Logo
