import { CRow, CCol, CFormCheck, CButton, CFormLabel } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useParams } from 'react-router-dom'
import { TextWhite, TextDanger } from '../../../../../constant/ClassName'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

const ProjectHiveActivityReportOptions = (): JSX.Element => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [filterByDate, setFilterByDate] = useState<Date>()
  const currentMonthDate = moment().subtract(1, 'months').format('M/YYYY')
  const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')
  const selectedDate = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.selectedDate,
  )
  const dispatch = useAppDispatch()
  const { projectId } = useParams<{ projectId: string }>()
  const dateToUse = filterByDate
    ? filterByDate?.getMonth() + '/' + filterByDate.getFullYear()
    : selectedDate
  const handleSelectMonthRadio = () => {
    dispatch(
      reduxServices.projectTimeSheet.getProjectTimeSheet({
        hiveDate: dateToUse,
        projectId,
      }),
    )
  }
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <div className="mb-3">
            <div className="d-inline">
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="currentMonth"
                label="Current Month"
                value="currentMonth"
                inline
                defaultChecked={selectedDate === currentMonthDate}
                onChange={handleSelectMonthRadio}
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="previousMonth"
                label="Previous Month"
                value="previousMonth"
                inline
                defaultChecked={selectedDate === previousMonthDate}
                onChange={handleSelectMonthRadio}
              />
              <CFormCheck
                type="radio"
                name="selectMonth"
                id="otherMonth"
                label="Other"
                value="otherMonth"
                inline
                defaultChecked={
                  selectedDate !== currentMonthDate &&
                  selectedDate !== previousMonthDate
                }
                onChange={handleSelectMonthRadio}
              />
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectHiveActivityReportOptions
