import { CFormCheck, CButton } from '@coreui/react-pro'
import React from 'react'
import pipListApi from '../../../../middleware/api/Performance/PIPList/pipListApi'
import { EmployeePIPListTableProps } from '../../../../types/Performance/PipList/pipListTypes'
import { downloadFile } from '../../../../utils/helper'

const EmployeePipListOptions = ({
  selectDate,
  toDate,
  fromDate,
  searchInput,
  searchByAdded,
  searchByEmployee,
  setToggle,
  selectRadioAction,
  setSelectRadioAction,
}: EmployeePIPListTableProps): JSX.Element => {
  const handleExportEmployeePIPListData = async () => {
    const employeePipListDownload = await pipListApi.exportPIPList({
      selectionStatus: selectRadioAction,
      dateSelection: selectDate,
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
              value="PIP"
              id="employmentActive"
              label="PIP"
              inline
              checked={selectRadioAction === 'PIP'}
              onChange={(e) => setSelectRadioAction(e.target.value)}
            />
            <CFormCheck
              type="radio"
              name="EmployeePipStatus"
              value="Removed From PIP"
              id="RemovedFromPIP"
              inline
              label="Removed From PIP"
              checked={selectRadioAction === 'Removed From PIP'}
              onChange={(e) => setSelectRadioAction(e.target.value)}
            />
            <CFormCheck
              type="radio"
              name="EmployeePipStatus"
              value="Inactive"
              id="inactive"
              label="Inactive"
              inline
              checked={selectRadioAction === 'Inactive'}
              onChange={(e) => setSelectRadioAction(e.target.value)}
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
