import { useError } from '../../hooks/ErrorContext'
import { ErrorContainer, ErrorBox, ErrorMessage, DismissButton } from './index.styles'

const ErrorOverlay = () => {
  const { error, clearError } = useError()

  if (!error) return null

  return (
    <ErrorContainer>
      <ErrorBox>
        <ErrorMessage>{error}</ErrorMessage>
        <DismissButton onClick={clearError}>✕</DismissButton>
      </ErrorBox>
    </ErrorContainer>
  )
}

export default ErrorOverlay
