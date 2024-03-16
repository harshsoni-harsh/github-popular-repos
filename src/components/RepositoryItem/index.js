import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  /* eslint-disable */
  const {name, issues_count, forks_count, stars_count, avatar_url} = itemDetails
  return (
    <li className="repoCard">
      <img src={avatar_url} alt={name} />
      <h1 className="repoName">{name}</h1>
      <div className="repoDetails">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{stars_count} stars</p>
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forks_count} forks</p>
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p>{issues_count} open issues</p>
        </div>
      </div>
    </li>
  )
  /* eslint-enable */
}

export default RepositoryItem
