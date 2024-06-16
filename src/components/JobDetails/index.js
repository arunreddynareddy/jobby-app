import {TiStarFullOutline} from 'react-icons/ti'
import {MdLocationOn, MdLocalPostOffice} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {apiStatus: apiConstants.initial, jobObject: [], similarJobsList: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedJobData = [data.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const updatedSimilarJobData = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        jobObject: updatedJobData,
        similarJobsList: updatedSimilarJobData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobObject, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobObject[0]

    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-details-image-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-logo"
            />
            <div className="job-details-title-rating-container">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating-container">
                <TiStarFullOutline className="job-details-star-icon" />
                <p className="job-details-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-location-annum-container">
            <div className="job-details-location-type-container">
              <MdLocationOn className="job-details-location-icon" />
              <p className="job-details-item-location">{location}</p>
              <MdLocalPostOffice className="job-details-office-icon" />
              <p className="job-details-item-employment-type">
                {employmentType}
              </p>
            </div>
            <p className="job-details-item-package">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-hr-line" />
          <div className="job-details-description-link-container">
            <h1 className="job-details-item-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="job-details-external-link"
            >
              Visit
              <FaExternalLinkAlt className="job-details-external-link-icon" />
            </a>
          </div>
          <p className="job-details-item-description">{jobDescription}</p>
          <h1 className="job-details-job-skills-heading">Skills</h1>
          <ul className="job-details-skills-list-container">
            {skills.map(eachSkill => (
              <li className="job-details-skill-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="job-details-skill-image"
                />
                <h1 className="job-details-skill-name">{eachSkill.name}</h1>
              </li>
            ))}
          </ul>
          <h1 className="job-details-item-heading">Life at Company</h1>
          <div className="job-details-life-at-company-container">
            <p className="job-details-life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="job-details-life-at-company-image"
            />
          </div>
        </div>
        <div className="job-details-similar-jobs-container">
          <h1 className="job-details-similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobsList.map(eachJob => (
              <SimilarJobs key={eachJob.id} similarJobsDetails={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="jobs-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-details-failure-image"
      />
      <h1 className="jobs-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobs-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-details-failure-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobApiResponseView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderSuccessView()
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
        {this.renderJobApiResponseView()}
      </>
    )
  }
}

export default JobDetails
