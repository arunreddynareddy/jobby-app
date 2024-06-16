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

let employmentList = []

const FiltersGroup = props => {
  const {getEmploymentType, getSalaryRange} = props

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

  return (
    <>
      <Profile />
      <hr className="hr-line" />
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
            <label htmlFor={eachType.employmentTypeId} className="filter-label">
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
    </>
  )
}

export default FiltersGroup
