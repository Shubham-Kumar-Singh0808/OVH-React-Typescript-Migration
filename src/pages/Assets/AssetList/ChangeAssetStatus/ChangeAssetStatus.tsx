import React, { SetStateAction, useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { IncomingActiveEmployee } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AllAssetsList } from '../../../../types/Assets/AssetList/AssetListTypes'

const ChangeAssetStatus = ({
  setToggle,
  changeReportStatus,
  setChangeReportStatus,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  changeReportStatus: AllAssetsList
  setChangeReportStatus: React.Dispatch<React.SetStateAction<AllAssetsList>>
}): JSX.Element => {
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
    // if (empId === -1) {
    // }
  }

  // const onSelectEmployee = (fullName: string) => {
  //   setEmployeeFilterName(fullName)
  //   const managerName = activeEmployee.find((data) => data.empName === fullName)

  //   const reportManager = {
  //     id: managerName?.id,
  //     fullName: managerName?.fullName,
  //     firstName: managerName?.firstName,
  //     lastName: managerName?.lastName,
  //   } as GetHRAssociate
  //   onSelectHRAssociate(reportManager)
  // }
  return (
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
          setToggle={setToggle}
          setChangeReportStatus={setChangeReportStatus}
        />
      </OCard>
    </>
  )
}

export default ChangeAssetStatus
