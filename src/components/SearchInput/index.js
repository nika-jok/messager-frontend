import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import searchIcon from '../../assets/img/search-input/search-icon.svg'

const SearchInputWrap = styled.div`
  position: relative;
  input {
    width: 100%;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 50px;
    font-size: 15px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
    position: relative;
    padding-left: 44%;
  }

  .search-icon {
    position: absolute;
    z-index: 4;
    top: 8px;
    padding-left: 36%;
  }
`

const SearchInput = (props) => {
  return (
    <SearchInputWrap>
      <img className="search-icon" src={searchIcon} alt="search Icon" />
      <input type="text" {...props} />
    </SearchInputWrap>
  )
}

SearchInput.defaultProps = {}

SearchInput.propTypes = {}

export default SearchInput
