import { CRow, CFormLabel, CCol, CFormCheck } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const CheckList = (): JSX.Element => {
  const checkList = useTypedSelector(
    reduxServices.addProjectCreationRequest.selectors.checkList,
  )
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Checklist: :
        </CFormLabel>
        <CCol sm={3}>
          {checkList.map((item, index) => {
            return (
              <>
                <p key={index}>{item.checklistId}</p>
                <p key={index}>{item.name}</p>
              </>
            )
          })}
        </CCol>
      </CRow>
    </>
  )
}

export default CheckList
