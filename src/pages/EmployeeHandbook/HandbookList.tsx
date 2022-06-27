import React from 'react'
import { HandbooksListProps } from '../../types/EmployeeHandbook/employeeHandbookTypes'

// const handbook_data = [
//   ' Training and Development',
//   ' Performance Iporvement Process',
//   ' Awards',
//   ' Help Desk',
//   ' Joining Formailities',
//   ' Information for New Joinee',
//   ' Service Award Felicitation',
//   ' Roles and Responsibilities',
// ]

const HandbookList = ({ handbooks }: HandbooksListProps): JSX.Element => {
  return (
    <div>
      <ul>
        {handbooks.map((handbook, index) => (
          <li key={index} className="handbook-item">
            <a href="dummy" className="new-link">
              <i className="fa fa-eye" aria-hidden="true"></i>
              {handbook.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HandbookList
