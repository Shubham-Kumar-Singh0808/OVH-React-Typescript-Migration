import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react-pro'
import React from 'react'
import {
  CheckedQuestionsOptions,
  Chelist,
} from '../../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

const CheckList = ({
  onChangeRadio,
  commentsOnChange,
  item,
  index,
}: {
  onChangeRadio: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  commentsOnChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => void
  item: Chelist
  index: number
}): JSX.Element => {
  return (
    <>
      <CTable key={item.id}>
        <CTableBody>
          <CTableRow>
            <CTableDataCell scope="row">{item.checklistId}</CTableDataCell>
            <CTableDataCell scope="row">{item.name}</CTableDataCell>
            <CTableDataCell scope="row">
              <CFormCheck
                type="radio"
                data-testid={`yes-radio`}
                label="Yes"
                inline
                checked={item.answer === CheckedQuestionsOptions.yes}
                onChange={(e) => onChangeRadio(e, index)}
                value={String(CheckedQuestionsOptions.yes)}
              />
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CFormCheck
                type="radio"
                data-testid={`yes-radio`}
                label="No"
                inline
                checked={item.answer === CheckedQuestionsOptions.no}
                value={String(CheckedQuestionsOptions.no)}
                onChange={(e) => onChangeRadio(e, index)}
              />
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CFormCheck
                type="radio"
                data-testid={`yes-radio`}
                label="N/A"
                inline
                checked={item.answer === CheckedQuestionsOptions.noAnswer}
                onChange={(e) => onChangeRadio(e, index)}
                value={String(CheckedQuestionsOptions.noAnswer)}
              />
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CFormTextarea
                placeholder="Purpose"
                aria-label="textarea"
                id="textArea"
                name="textArea"
                data-testid="text-area"
                value={item.comments}
                onChange={(e) => commentsOnChange(e, index)}
              ></CFormTextarea>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default CheckList
