import {
  CButton,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { deviceLocale } from '../../../../../../utils/dateFormatUtils'

const MilestonePeopleList = ({ isDateEnabled }: { isDateEnabled: boolean }) => {
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'
  useEffect(() => {
    dispatch(
      reduxServices.projectMileStone.getPeopleForMilestone(getProjectDetail.id),
    )
  }, [dispatch])

  useEffect(() => {
    if (toDate) {
      dispatch(
        reduxServices.projectMileStone.getWorkDetails({
          empId: Number(getProjectDetail.employeeId),
          fromdate: fromDate as string,
          todate: toDate as string,
        }),
      )
    }
  }, [toDate])

  const milestoneWorkDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.milestoneWorkDetails,
  )

  console.log(milestoneWorkDetails)
  return (
    <>
      <div className="table-scroll">
        <div className="table-responsive colorTable">
          WD<span style={{ color: 'red' }}>*</span> = Working Days , HD
          <span style={{ color: 'red' }}>*</span> = Holidays , TD
          <span style={{ color: 'red' }}>*</span> = Total Days , THrs
          <span style={{ color: 'red' }}>*</span> = Total Hours.
        </div>
        {getPeopleMilestone.length > 0 ? (
          <CTable striped responsive className="sh-project-report-details">
            <CTableHead className="profile-tab-header">
              <CTableRow>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  ID
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  From Date
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  To Date
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  WD
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  HD
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Leaves
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  TD
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Hours
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  THrs
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Role
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Billable
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Comments
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {getPeopleMilestone.map((item, index) => {
              return (
                <CTableBody key={index}>
                  <CTableRow>
                    <CTableDataCell scope="row">
                      {item.employeeId}
                    </CTableDataCell>
                    <CTableDataCell scope="row">{item.empName}</CTableDataCell>
                    <CTableDataCell scope="row">
                      <DatePicker
                        id="fromDate"
                        data-testid="leaveApplyFromDate"
                        className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                        showMonthDropdown
                        showYearDropdown
                        autoComplete="off"
                        dropdownMode="select"
                        dateFormat="dd/mm/yy"
                        placeholderText="dd/mm/yy"
                        name="fromDate"
                        value={
                          fromDate
                            ? new Date(fromDate).toLocaleDateString(
                                deviceLocale,
                                {
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: '2-digit',
                                },
                              )
                            : ''
                        }
                        onChange={(date: Date) =>
                          setFromDate(moment(date).format(commonFormatDate))
                        }
                        disabled={!isDateEnabled}
                      />
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      <DatePicker
                        id="toDate"
                        data-testid="leaveApprovalFromDate"
                        className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                        showMonthDropdown
                        autoComplete="off"
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/mm/yy"
                        placeholderText="dd/mm/yy"
                        name="toDate"
                        value={
                          toDate
                            ? new Date(toDate).toLocaleDateString(
                                deviceLocale,
                                {
                                  year: 'numeric',
                                  month: 'numeric',
                                  day: '2-digit',
                                },
                              )
                            : ''
                        }
                        onChange={(date: Date) =>
                          setToDate(moment(date).format(commonFormatDate))
                        }
                        disabled={!isDateEnabled}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={milestoneWorkDetails.workingDays}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={item.effort?.replace(/^\s*/, '')}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={item.effort?.replace(/^\s*/, '')}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={item.effort?.replace(/^\s*/, '')}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={item.effort?.replace(/^\s*/, '')}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={item.effort?.replace(/^\s*/, '')}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormInput
                        // onChange={(e) => effortOnChange(e, index)}
                        // value={item.effort?.replace(/^\s*/, '')}
                        className="mt-2"
                        name="effort"
                        id="effort"
                        autoComplete="off"
                        data-testid="effort-test"
                      />
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CFormSelect
                        aria-label="Default select example"
                        size="sm"
                        id="isAllocated"
                        data-testid="form-select2"
                        name="isAllocated"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell className="col-sm-1 ps-2 pe-2">
                      <CButton>
                        <i className="fa fa-comments fa-lg text-white"></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              )
            })}
          </CTable>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default MilestonePeopleList
