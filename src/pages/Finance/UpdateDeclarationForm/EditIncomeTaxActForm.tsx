import { CCardHeader } from '@coreui/react-pro'
import React from 'react'
import EditSectionsFilterOption from './EditSectionsFilterOption'

const EditIncomeTaxActForm = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">
          Deduction available for Salaried employees under Income Tax Act 1961
        </h4>
      </CCardHeader>
      <EditSectionsFilterOption />
    </>
  )
}

export default EditIncomeTaxActForm
