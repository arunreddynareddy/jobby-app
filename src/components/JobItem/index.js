import {TiStarFullOutline} from 'react-icons/ti'
import {MdLocationOn, MdLocalPostOffice} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item-container">
        <div className="image-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-item-title">{title}</h1>
            <div className="rating-container">
              <TiStarFullOutline className="star-icon" />
              <p className="item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-annum-container">
          <div className="location-type-container">
            <MdLocationOn className="location-icon" />
            <p className="item-location">{location}</p>
            <MdLocalPostOffice className="office-icon" />
            <p className="item-employment-type">{employmentType}</p>
          </div>
          <p className="item-package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="item-description-heading">Description</h1>
        <p className="item-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
