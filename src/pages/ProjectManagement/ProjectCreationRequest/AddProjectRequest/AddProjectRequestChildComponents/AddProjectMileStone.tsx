import {
  CTableBody,
  CFormInput,
  CTableDataCell,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { dateFormat } from '../../../../../constant/DateFormat'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'
import { ProjectRequestMilestoneDTO } from '../../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

const AddProjectMileStone = ({
  item,
  index,
  setProjectMileStone,
  projectMileStone,
  titleOnChange,
  commentsOnChange,
  effortOnChange,
  onChangeHandleFromDate,
  onChangeHandleToDate,
  billableOnChange,
  percentageOnChange,
  setIsAddMileStoneButtonEnabled,
}: {
  item: ProjectRequestMilestoneDTO
  index: number
  projectMileStone: ProjectRequestMilestoneDTO[]
  setProjectMileStone: React.Dispatch<
    React.SetStateAction<ProjectRequestMilestoneDTO[]>
  >
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
  billableOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
  percentageOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  setIsAddMileStoneButtonEnabled: (value: boolean) => void
}): JSX.Element => {
  const [error, setError] = useState(false)
  const handleClickMileStone = (index: number) => {
    const projectMileStoneCopy: ProjectRequestMilestoneDTO[] = JSON.parse(
      JSON.stringify(projectMileStone),
    )
    projectMileStoneCopy[index].buttonType = 'remove'

    setProjectMileStone([
      ...projectMileStoneCopy,
      {
        id: Math.floor(Math.random() * 10000),
        billable: '',
        comments: '',
        effort: '',
        fromDate: '',
        milestonePercentage: '',
        title: '',
        toDate: '',
        buttonType: 'Add',
      },
    ])
  }

  const handleMinusClickMileStone = (id: number) => {
    const newInvestmentList = projectMileStone.filter(
      (investment) => investment.id !== id,
    )
    setProjectMileStone(newInvestmentList)
    console.log(newInvestmentList.length)
  }

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
            value={item.fromDate}
            onChange={(date: Date) => onChangeHandleFromDate(date, index)}
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <DatePicker
            id="editprojectenddate"
            className="form-control form-control-sm sh-date-picker"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="dd/mm/yy"
            data-testid="end-date-picker"
            dateFormat="dd/mm/yy"
            name="editprojectenddate"
            value={item.toDate}
            onChange={(date: Date) => onChangeHandleToDate(date, index)}
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billable"
            data-testid="form-select2"
            name="billable"
            value={item.billable}
            onChange={(e) => billableOnChange(e, index)}
          >
            <option value="true">yes</option>
            <option value="false">No</option>
          </CFormSelect>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormInput
            onChange={(e) => percentageOnChange(e, index)}
            value={item.milestonePercentage}
            name="milestonePercentage"
            data-testid="percentage-test"
          />
        </CTableDataCell>
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
        <CTableDataCell scope="row">
          {item.buttonType === 'Add' ? (
            <CButton
              data-testid="search-btn1"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={() => handleClickMileStone(index)}
            >
              <i className="fa fa-plus"></i>
            </CButton>
          ) : (
            <CButton
              data-testid="search-btn1"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={() => handleMinusClickMileStone(item.id as number)}
            >
              <i className="fa fa-minus"></i>
            </CButton>
          )}
        </CTableDataCell>
      </CTableBody>
    </>
  )
}

export default AddProjectMileStone
