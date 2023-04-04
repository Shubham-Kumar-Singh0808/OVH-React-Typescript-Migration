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
import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'

const MilestonePeopleList = () => {
  const getPeopleMilestone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getPeopleMilestone,
  )
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.projectMileStone.getPeopleForMilestone(getProjectDetail.id),
    )
  }, [dispatch])

  console.log(getPeopleMilestone)
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
                        autoComplete="off"
                        // value={item.fromDate}
                        onChange={(date: Date) => console.log('test')}
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
                        autoComplete="off"
                        // value={item.fromDate}
                        onChange={(date: Date) => console.log('test')}
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
