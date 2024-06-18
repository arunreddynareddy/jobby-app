import './index.css'
import Profile from '../Profile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = [
  {
    label: 'Hyderabad',
    locationId: 'Hyderabad',
  },
  {
    label: 'Bangalore',
    locationId: 'Bangalore',
  },
  {
    label: 'Chennai',
    locationId: 'Chennai',
  },
  {
    label: 'Delhi',
    locationId: 'Delhi',
  },
  {
    label: 'Mumbai',
    locationId: 'Mumbai',
  },
]

let employmentList = []
let locationList = []

const FiltersGroup = props => {
  const {getEmploymentType, getSalaryRange, getLocation} = props

  const onClickEmploymentType = event => {
    const employmentType = event.target.value
    if (!employmentList.includes(employmentType)) {
      employmentList.push(employmentType)
    } else if (employmentList.includes(employmentType)) {
      employmentList = employmentList.filter(
        eachType => eachType !== employmentType,
      )
    }
    getEmploymentType(employmentList.join(','))
  }

  const onChangeSalaryRange = event => {
    getSalaryRange(event.target.value)
  }

  const onClickLocation = event => {
    const location = event.target.value
    if (!locationList.includes(location)) {
      locationList.push(location)
    } else if (locationList.includes(location)) {
      locationList = locationList.filter(
        eachLocation => eachLocation !== location,
      )
    }
    getLocation(locationList.join(','))
  }

  return (
    <>
      <Profile />
      <hr className="hr-line" />
      <div className="filters-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filters-list-container">
          {employmentTypesList.map(eachType => (
            <li className="filter-item" key={eachType.employmentTypeId}>
              <input
                type="checkbox"
                className="filter-input"
                value={eachType.employmentTypeId}
                id={eachType.employmentTypeId}
                onClick={onClickEmploymentType}
              />
              <label
                htmlFor={eachType.employmentTypeId}
                className="filter-label"
              >
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="hr-line" />
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filters-list-container">
          {salaryRangesList.map(eachRange => (
            <li className="filter-item" key={eachRange.salaryRangeId}>
              <input
                type="radio"
                className="filter-input"
                name="salary"
                id={eachRange.salaryRangeId}
                value={eachRange.salaryRangeId}
                onChange={onChangeSalaryRange}
              />
              <label htmlFor={eachRange.salaryRangeId} className="filter-label">
                {eachRange.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="hr-line" />
        <h1 className="filter-heading">Locations</h1>
        <ul className="filters-list-container">
          {locationsList.map(eachLocation => (
            <li className="filter-item" key={eachLocation.locationId}>
              <input
                type="checkbox"
                className="filter-input"
                id={eachLocation.locationId}
                value={eachLocation.locationId}
                onClick={onClickLocation}
              />
              <label htmlFor={eachLocation.locationId} className="filter-label">
                {eachLocation.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FiltersGroup
