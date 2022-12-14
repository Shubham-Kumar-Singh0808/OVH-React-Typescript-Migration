import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddNewInvestmentCycle from './AddNewInvestmentCycle'
import InvestmentCycleTable from './InvestmentCycleTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const AddInvestmentCycle = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getCycles())
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Cycle"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/itDeclarationList`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="addCycle-back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <AddNewInvestmentCycle />
        <InvestmentCycleTable />
      </OCard>
    </>
  )
}

export default AddInvestmentCycle
