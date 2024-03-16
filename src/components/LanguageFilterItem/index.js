import './index.css'

const LanguageFilterItem = props => {
  const {selected, itemDetails, filterClick} = props
  const onClick = () => {
    filterClick(itemDetails.id)
  }
  return (
    <li>
      <button
        className={selected ? 'selectedLang' : 'Lang'}
        type="button"
        onClick={onClick}
      >
        {itemDetails.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
