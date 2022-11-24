import React, { useState } from 'react'
import { CRow } from '@coreui/react-pro'
import PanDetails from './PanDetails/PanDetails'
import BankDetails from './BankDetails/BankDetails'
import AddBankAccount from './BankDetails/AddBankAccount'
import EditBankAccount from './BankDetails/EditBankAccount'
import OCard from '../../../components/ReusableComponent/OCard'

const PanAndBankDetails = (): JSX.Element => {
  const [toggle, setToggle] = useState('')

  return (
    <>
      {' '}
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="P.F. & PAN Details"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <PanDetails />
            <CRow className="mt-3">
              <BankDetails setToggle={setToggle} />
            </CRow>
          </OCard>
        </>
      )}
      {toggle === 'addBankAccount' && (
        <AddBankAccount backButtonHandler={() => setToggle('')} />
      )}
      {toggle === 'editBankAccount' && (
        <EditBankAccount backButtonHandler={() => setToggle('')} />
      )}
    </>
  )
}

export default PanAndBankDetails
