import { CListGroup, CListGroupItem, CRow } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Handbook,
  HandbooksListProps,
} from '../../types/EmployeeHandbook/employeeHandbookTypes'

const HandbookList = ({
  handbooks,
  inputText,
}: HandbooksListProps): JSX.Element => {
  const filteredHandbooks = (handbookList: Handbook[]): Handbook[] => {
    return handbookList?.filter((handbook) => {
      if (inputText === '') {
        return handbook
      } else {
        return handbook.title.toLowerCase().includes(inputText)
      }
    })
  }

  return (
    <div>
      <CListGroup flush>
        {handbooks?.length > 0 &&
          filteredHandbooks(handbooks).map((handbook, index) => (
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
      {!handbooks?.length || filteredHandbooks(handbooks)?.length === 0 ? (
        <CRow>
          <strong className="no-records">No Records Found... </strong>
        </CRow>
      ) : (
        <></>
      )}
    </div>
  )
}

export default HandbookList
