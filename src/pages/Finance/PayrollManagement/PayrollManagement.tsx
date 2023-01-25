import React, { useState } from 'react'
import PayrollManagementOptions from './PayrollManagementOptions'
import EditPaySlip from './EditPaySlip/EditPaySlip'
import OCard from '../../../components/ReusableComponent/OCard'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const PayrollManagement = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [toEditPayslip, setToEditPayslip] = useState<CurrentPayslip>(
    {} as CurrentPayslip,
  )

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Payroll Management"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <PayrollManagementOptions
            setToggle={setToggle}
            toggle={toggle}
            setToEditPayslip={setToEditPayslip}
          />
        </OCard>
      )}
      {toggle === 'editPaySlip' && (
        <EditPaySlip toEditPayslip={toEditPayslip} setToggle={setToggle} />
      )}
    </>
  )
}

export default PayrollManagement
