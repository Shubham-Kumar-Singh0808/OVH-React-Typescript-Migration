import {
  CFormTextarea,
  CFormInput,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import OToast from '../../../../components/ReusableComponent/OToast'
import { dateFormat } from '../../../../constant/DateFormat'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { ProjectRequestMilestoneDTO } from '../../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'

const ProjectMileStone = ({
  item,
  index,
  titleOnChange,
  commentsOnChange,
  effortOnChange,
  onChangeHandleFromDate,
  onChangeHandleToDate,
  setIsAddMileStoneButtonEnabled,
}: {
  item: ProjectRequestMilestoneDTO
  index: number
  titleOnChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onChangeHandleFromDate: (date: Date, index: number) => void
  onChangeHandleToDate: (date: Date, index: number) => void
  effortOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  commentsOnChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => void
  setIsAddMileStoneButtonEnabled: (value: boolean) => void
}): JSX.Element => {
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(item?.fromDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(item?.toDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setError(moment(end).isBefore(start))
  }, [item.fromDate, item.toDate])
  const projectBillable = item.billable ? 'Yes' : 'No'
  useEffect(() => {
    if (
      item?.title &&
      item?.effort &&
      item?.fromDate &&
      item?.toDate &&
      item?.comments
    ) {
      setIsAddMileStoneButtonEnabled(true)
    } else {
      setIsAddMileStoneButtonEnabled(false)
    }
  }, [item?.title, item?.effort, item?.fromDate, item?.comments])

  useEffect(() => {
    if (error)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            MileStone FromDate less than ToDate"
          />,
        ),
      )
  }, [error])

  return (
    <>
      <CTableBody>
        <CTableDataCell scope="row">
          <CFormInput
            onChange={(e) => titleOnChange(e, index)}
            value={item.title}
            name="title"
            id="title"
            placeholder="Title"
            data-testid="title-test"
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormInput
            onChange={(e) => effortOnChange(e, index)}
            value={item.effort}
            name="effort"
            id="effort"
            placeholder="effort"
            data-testid="effort-test"
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <DatePicker
            id="editProjectFromDate"
            className="form-control form-control-sm sh-date-picker"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="dd/mm/yy"
            data-testid="end-date-picker"
            dateFormat="dd/mm/yy"
            name="editProjectFromDate"
            value={item.fromDate}
            onChange={(date: Date) => onChangeHandleFromDate(date, index)}
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <DatePicker
            id="editProjectEndDate"
            className="form-control form-control-sm sh-date-picker"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="dd/mm/yy"
            data-testid="end-date-picker"
            dateFormat="dd/mm/yy"
            name="editProjectEndDate"
            value={item.toDate}
            onChange={(date: Date) => onChangeHandleToDate(date, index)}
          />
        </CTableDataCell>
        <CTableDataCell scope="row">{projectBillable}</CTableDataCell>
        <CTableDataCell scope="row">{item.milestonePercentage}</CTableDataCell>
        <CTableDataCell scope="row">
          <CFormTextarea
            aria-label="textarea"
            id="comments"
            name="comments"
            data-testid="text-area"
            value={item.comments}
            onChange={(e) => commentsOnChange(e, index)}
          ></CFormTextarea>
        </CTableDataCell>
      </CTableBody>
    </>
  )
}

export default ProjectMileStone
