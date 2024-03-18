import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const ApiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {selectedId: 'ALL', apiStatus: ''}

  repos = []

  componentDidMount() {
    this.fetchItems()
  }

  filterClick = id => {
    this.setState(
      {apiStatus: ApiStatusConstants.inProgress, selectedId: id},
      this.fetchItems,
    )
  }

  fetchItems = async () => {
    this.setState({apiStatus: ApiStatusConstants.inProgress})
    const {selectedId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos`
    const response = await fetch(
      `${githubReposApiUrl}?language=${selectedId}`,
      {method: 'GET'},
    )
    if (response.ok) {
      const data = await response.json()
      this.repos = data.popular_repos
      this.setState({apiStatus: ApiStatusConstants.success})
    } else {
      this.setState({apiStatus: ApiStatusConstants.failure})
    }
  }

  renderBody = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case ApiStatusConstants.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="failureImage"
            />
          </div>
        )
      case ApiStatusConstants.success:
        return (
          <ul className="repos">
            {this.repos.map(obj => (
              <RepositoryItem key={obj.id} itemDetails={obj} />
            ))}
          </ul>
        )
      case ApiStatusConstants.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      default:
        return null
    }
  }

  /* eslint-disable */
  render() {
    const {selectedId, apiStatus} = this.state
    return (
      <div className="PopularRepos">
        <h1 className="heading">Popular</h1>
        <ul>
          {languageFiltersData.map(obj => (
            <LanguageFilterItem
              selected={obj.id === selectedId}
              key={obj.id}
              itemDetails={obj}
              filterClick={this.filterClick}
            />
          ))}
        </ul>
        {this.renderBody()}
      </div>
    )
  }
}

export default GithubPopularRepos
