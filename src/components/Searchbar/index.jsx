import Spacer from '../Spacer'
import searchIcon from './images/search_icon.png'
import { InputEl, WrapperEl } from './index.styles'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Searchbar = ({ setFilterWord }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearchParam = searchParams.get('search') || ''

  const [inputValue, setInputValue] = useState(initialSearchParam)

  const handleSearchChange = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    const search = searchParams.get('search') || ''
    setInputValue(search)
    setFilterWord(search)
  }, [searchParams])

  return (
    <WrapperEl>
      <button>
        <img
          src={searchIcon}
          style={{ height: '27px' }}
          onClick={() => {
            setSearchParams({ search: inputValue })
          }}
        />
      </button>
      <Spacer />
      <InputEl
        type="text"
        placeholder="Search for restaurant..."
        value={inputValue}
        onChange={handleSearchChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setSearchParams({ search: inputValue })
        }}
      />
    </WrapperEl>
  )
}

export default Searchbar
