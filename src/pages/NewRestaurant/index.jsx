//Components
import Wrapper from '../../components/Wrapper'
import VerticalGap from '../../components/VerticalGap'
import TextInput from '../../components/TextInput'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

//Hooks
import { useNavigate } from 'react-router-dom'
import { useHandleFormSubmit } from '../../hooks/useHandleFormSubmit'
import useForm from '../../hooks/useForm'

const NewRestaurant = () => {
  const navigate = useNavigate()
  const handlePost = useHandleFormSubmit()
  const [formData, setFormData] = useForm('restaurant')

  return (
    <>
      <VerticalGap height="10px" />
      <Wrapper style={{ width: '100%' }} colFrom="500px">
        <Logo />
        <h1>{'New restaurant'}</h1>
      </Wrapper>
      <VerticalGap />
      <form
        onSubmit={(e) => {
          handlePost(e, 'restaurant', formData, (restaurant) => {
            if (restaurant?._id) navigate(`/restaurant/${restaurant._id}`)
          })
        }}
      >
        <Wrapper>
          <label>
            Name
            <TextInput
              placeholder="Restaurant name"
              value={formData.name}
              onChange={(e) => {
                setFormData(e)
              }}
              name="name"
              required
            />
          </label>
        </Wrapper>
        <Wrapper>
          <label>
            Address
            <TextInput
              placeholder="Restaurant address"
              value={formData.address}
              onChange={(e) => {
                setFormData(e)
              }}
              name="address"
              required
            />
          </label>
        </Wrapper>
        <VerticalGap />
        <Wrapper>
          <Button data-action="POST" type="submit">
            Create new restaurant
          </Button>
        </Wrapper>
      </form>
      <VerticalGap height="47px" />
    </>
  )
}

export default NewRestaurant
