import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const Attendees = (): JSX.Element => {
  const [attendie, setAttendie] = useState<string>('')
  const allAttendiesNames = useTypedSelector(
    reduxServices.newBooking.selectors.attendieNames,
  )
  console.log(allAttendiesNames)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.newBooking.getAllAttendiesData(attendie))
  }, [])
  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Attendees:
          <span className={attendie ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormInput
            type="text"
            data-testid="selectSubject"
            id="subjectValue"
            name="subjectValue"
            value={attendie}
            onChange={(e) => setAttendie(e.target.value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Attendees
