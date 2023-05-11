import React from 'react'
import { CCardHeader } from '@coreui/react-pro'
import SectionsFilterOptions from './SectionsFilterOptions'

const IncomeTaxAct = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">
          Deduction available for Salaried employees under Income Tax Act 1961
        </h4>
      </CCardHeader>
      <SectionsFilterOptions showAsterix={true} isOldEmployee={true} />
    </>
  )
}

export default IncomeTaxAct
