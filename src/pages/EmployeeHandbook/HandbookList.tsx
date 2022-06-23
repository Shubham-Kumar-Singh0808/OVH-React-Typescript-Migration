import React from 'react'

const handbook_data = [
  ' Training and Development',
  ' Performance Iporvement Process',
  ' Awards',
  ' Help Desk',
  ' Joining Formailities',
  ' Information for New Joinee',
  ' Service Award Felicitation',
  ' Roles and Responsibilities',
]

const HandbookList = (): JSX.Element => {
  return (
    <div>
      <ul>
        {handbook_data.map((heading, index) => (
          <li key={index} className="handbook-item">
            <a href="dummy" className="new-link">
              <i className="fa fa-eye" aria-hidden="true"></i>
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HandbookList
