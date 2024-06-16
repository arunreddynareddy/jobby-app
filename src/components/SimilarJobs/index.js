import {TiStarFullOutline} from 'react-icons/ti'
import {MdLocationOn, MdLocalPostOffice} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails

  return (
    <div className="similar-jobs-container">
      <div className="similar-jobs-image-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-job-details-logo"
        />
        <div className="similar-jobs-title-rating-container">
          <h1 className="similar-jobs-title">{title}</h1>
          <div className="similar-jobs-rating-container">
            <TiStarFullOutline className="similar-jobs-star-icon" />
            <p className="similar-jobs-item-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description-heading">Description</h1>
      <p className="similar-jobs-description">{jobDescription}</p>
      <div className="similar-jobs-location-type-container">
        <MdLocationOn className="similar-jobs-location-icon" />
        <p className="similar-jobs-item-location">{location}</p>
        <MdLocalPostOffice className="similar-jobs-office-icon" />
        <p className="similar-jobs-item-employment-type">{employmentType}</p>
      </div>
    </div>
  )
}

export default SimilarJobs
