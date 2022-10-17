import { CListGroup, CListGroupItem } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { HandbooksListProps } from '../../types/EmployeeHandbook/employeeHandbookTypes'

const HandbookList = ({
  handbooks,
  inputText,
}: HandbooksListProps): JSX.Element => {
  return (
    <div>
      <CListGroup flush>
        {handbooks.length > 0 &&
          handbooks
            ?.filter((handbook) => {
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
