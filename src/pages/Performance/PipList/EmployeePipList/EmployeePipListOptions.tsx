import { CFormCheck, CButton } from '@coreui/react-pro'
import React from 'react'
import pipListApi from '../../../../middleware/api/Performance/PIPList/pipListApi'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  EmployeePIPListTableProps,
  EmployeePipStatus,
} from '../../../../types/Performance/PipList/pipListTypes'
import { downloadFile } from '../../../../utils/helper'

const EmployeePipListOptions = ({
  toDate,
  fromDate,
  searchInput,
  searchByAdded,
  searchByEmployee,
  setToggle,

  selectDay,
}: EmployeePIPListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const selectedEmployeePipStatus = useTypedSelector(
    reduxServices.pipList.selectors.selectedEmployeePipStatus,
  )

  const handleChangeSelectedEmployeePIPStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      reduxServices.pipList.actions.changeSelectedEmployeePipStatus(
        event.target.value,
      ),
    )
  }

  const handleExportEmployeePIPListData = async () => {
    const employeePipListDownload = await pipListApi.exportPIPList({
      selectionStatus: selectedEmployeePipStatus,
      dateSelection: selectDay,
      from: (fromDate as string) || '',
      multiSearch: searchInput as string,
      searchByAdded: searchByAdded as boolean,
      searchByEmployee: searchByEmployee as boolean,
      to: (toDate as string) || '',
    })
    downloadFile(employeePipListDownload, 'PIPList.csv')
  }

  return (
    <>
      <div className="mb-3 pull-right">
        <div className="d-inline">
          <>
            <CFormCheck
              type="radio"
              name="EmployeePipStatus"
              value={EmployeePipStatus.pip}
              id="employmentActive"
              label="PIP"
              inline
              defaultChecked={
                selectedEmployeePipStatus === EmployeePipStatus.pip
              }
              onChange={handleChangeSelectedEmployeePIPStatus}
            />
            <CFormCheck
              type="radio"
              name="EmployeePipStatus"
              value={EmployeePipStatus.RemovedFromPIP}
              id="RemovedFromPIP"
              label="Removed From PIP"
              inline
              defaultChecked={
                selectedEmployeePipStatus === EmployeePipStatus.RemovedFromPIP
              }
              onChange={handleChangeSelectedEmployeePIPStatus}
            />
            <CFormCheck
              type="radio"
              name="EmployeePipStatus"
              value={EmployeePipStatus.inactive}
              id="inactive"
              label="Inactive"
              inline
              defaultChecked={
                selectedEmployeePipStatus === EmployeePipStatus.inactive
              }
              onChange={handleChangeSelectedEmployeePIPStatus}
            />
          </>
        </div>

        <div className="d-inline ml15 pull-right">
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            onClick={() => setToggle('addPIP')}
          >
            <i className="fa fa-plus me-1"></i>
            Add
          </CButton>
          &nbsp; &nbsp; &nbsp;
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            data-testid="employee-export-btn"
            onClick={handleExportEmployeePIPListData}
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export
          </CButton>
        </div>
      </div>
    </>
  )
}

export default EmployeePipListOptions
