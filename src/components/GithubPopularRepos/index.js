import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import LanguageFilterItem from "../LanguageFilterItem";
import RepositoryItem from "../RepositoryItem";

import "./index.css";

const languageFiltersData = [
  { id: "ALL", language: "All" },
  { id: "JAVASCRIPT", language: "Javascript" },
  { id: "RUBY", language: "Ruby" },
  { id: "JAVA", language: "Java" },
  { id: "CSS", language: "CSS" },
];

class GithubPopularRepos extends Component {
  state = { selectedId: "ALL", isLoaded: false, apiError: false };

  repos = [];

  componentDidMount() {
    this.fetchItems();
  }

  filterClick = (id) => {
    this.setState(
      { isLoaded: false, selectedId: id, apiError: false },
      this.fetchItems
    );
  };

  fetchItems = async () => {
    const { selectedId } = this.state;
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${selectedId}`;
    try {
      const response = await fetch(githubReposApiUrl);
      if (response.status === 200) {
        const data = await response.json();
        this.repos = data.popular_repos;
      } else {
        this.setState({ apiError: true });
      }
      this.setState({ isLoaded: true });
    } catch (e) {
      this.setState({ apiError: true , isLoaded: true});
    }
  };
  /* eslint-disable */
  render() {
    const { selectedId, isLoaded, apiError } = this.state;
    return (
      <div className="PopularRepos">
        <h1 className="heading">Popular</h1>
        <ul>
          {languageFiltersData.map((obj) => (
            <LanguageFilterItem
              selected={obj.id === selectedId}
              key={obj.id}
              itemDetails={obj}
              filterClick={this.filterClick}
            />
          ))}
        </ul>
        {isLoaded === false ? (
          <div data-testid="loader">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : apiError ? (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="failureImage"
            />
          </div>
        ) : (
          <ul className="repos">
            {this.repos.map((obj) => (
              <RepositoryItem key={obj.id} itemDetails={obj} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default GithubPopularRepos;
