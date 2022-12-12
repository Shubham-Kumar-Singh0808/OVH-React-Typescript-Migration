import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddNewInvestment from './AddNewInvestment'
import InvestmentListTable from './InvestmentListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const InvestmentList = (): JSX.Element => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>()
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getInvestments())
    dispatch(reduxServices.itDeclarationList.getSections())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Investment"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/addSection`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="add-section-btn"
              >
                <i className="fa fa-plus me-1"></i>Add Section
              </CButton>
            </Link>
            <Link to={`/itDeclarationList`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <AddNewInvestment
          selectedSectionId={selectedSectionId as string}
          setSelectedSectionId={setSelectedSectionId}
        />
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <InvestmentListTable />
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default InvestmentList
