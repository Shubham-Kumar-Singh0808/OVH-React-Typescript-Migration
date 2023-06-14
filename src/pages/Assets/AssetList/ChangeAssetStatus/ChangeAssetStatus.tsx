import React, { useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import ChangeAssetAddVendor from './ChangeAssetAddVendor'
import OCard from '../../../../components/ReusableComponent/OCard'
import { IncomingActiveEmployee } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AllAssetsList } from '../../../../types/Assets/AssetList/AssetListTypes'
import { useTypedSelector } from '../../../../stateStore'

const ChangeAssetStatus = ({
  setToggle,
  changeReportStatus,
  setChangeReportStatus,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  changeReportStatus: AllAssetsList
  setChangeReportStatus: React.Dispatch<React.SetStateAction<AllAssetsList>>
}): JSX.Element => {
  const [EmpToggle, setEmpToggle] = useState('')
  const activeEmployee = useTypedSelector(
    (state) => state.addAchiever.activeEmployeeList,
  )
  const [employeeFilterName, setEmployeeFilterName] = useState<string>(
    changeReportStatus.employeeName,
  )

  const getEmployeeId = (list: IncomingActiveEmployee[], name: string) => {
    const data = list.find(
      (item) => item.empFirstName + ' ' + item.empLastName === name,
    )
    if (!data) {
      return -1
    }
    return data.employeeId
  }
  const onSelectEmployee = (value: string) => {
    const empId = getEmployeeId(activeEmployee, value)
  }
  return (
    <>
      {EmpToggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Change Asset Status"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <CButton
                  color="info"
                  name="back"
                  className="btn-ovh me-1"
                  data-testid="back-button"
                  onClick={() => setToggle('')}
                >
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
            </CRow>
            <ChangeAssetFilterOptions
              allEmployees={activeEmployee}
              onSelectEmployee={onSelectEmployee}
              employeeName={employeeFilterName}
              setEmployeeName={setEmployeeFilterName}
              changeReportStatus={changeReportStatus}
              setEmpToggle={setEmpToggle}
              setChangeReportStatus={setChangeReportStatus}
            />
          </OCard>
        </>
      )}
      {EmpToggle === 'ChangeReportToAddVendor' && (
        <ChangeAssetAddVendor setEmpToggle={setEmpToggle} />
      )}
    </>
  )
}

export default ChangeAssetStatus
