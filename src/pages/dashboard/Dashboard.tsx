import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import React from 'react'
import TestComponent from '../../views/blank/TestComponent'
import OCard from '../../components/ReusableComponent/OCard'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <OCard
        className=""
        CHeaderClassName="Basheer"
        title="Title Here"
        CLinkClassName="basheer-link"
      >
        <TestComponent />
      </OCard>
    </>
  )
}

export default Dashboard
