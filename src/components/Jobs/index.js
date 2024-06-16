import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

import Header from '../Header'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiConstants.initial,
    searchInput: '',
    employmentTypes: '',
    salaryRange: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, employmentTypes, salaryRange} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobsData: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsList)
  }

  getEmploymentType = array => {
    this.setState({employmentTypes: array}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInputResults = () => {
    this.getJobsList()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchInputResults}
        >
          <BsSearch className="search-icon" />.
        </button>
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsData} = this.state

    return (
      <>
        {' '}
        {jobsData.length > 0 ? (
          <ul className="jobs-list-container">
            {jobsData.map(eachJob => (
              <JobItem key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}{' '}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobsApiResponseView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderJobsList()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filters-group-container">
            <FiltersGroup
              getSalaryRange={this.getSalaryRange}
              getEmploymentType={this.getEmploymentType}
            />
          </div>
          <div className="search-list-container">
            {this.renderSearchInput()}
            {this.renderJobsApiResponseView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
