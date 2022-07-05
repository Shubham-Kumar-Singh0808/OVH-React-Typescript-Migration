import { CListGroup, CListGroupItem } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
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

const HandbookList = ({
  handbooks,
  inputText,
}: HandbooksListProps): JSX.Element => {
  return (
    <div>
      <CListGroup flush>
        {handbooks
          .filter((handbook) => {
            if (inputText === '') {
              return handbook
            } else {
              return handbook.title.toLowerCase().includes(inputText)
            }
          })
          .map((handbook, index) => (
            <Link
              to={`/showemployeehandbook/${handbook.pageName}`}
              className="new-link"
              key={index}
            >
              <CListGroupItem className="handbook-item">
                {handbook.title}
              </CListGroupItem>
            </Link>
          ))}
      </CListGroup>
    </div>
  )
}

export default HandbookList
