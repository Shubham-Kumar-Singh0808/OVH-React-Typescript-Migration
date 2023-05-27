import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddNewInvestment from './AddNewInvestment'
import InvestmentListTable from './InvestmentListTable'
import EditInvestment from './EditInvestment/EditInvestment'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import {
  ITDeclarationFormToggleType,
  Investment,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const InvestmentList = (): JSX.Element => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>()
  const [editInvestment, setEditInvestment] = useState<Investment>({
    description: '',
    investmentId: 0,
    investmentName: '',
    maxLimit: '',
    requiredDocs: '',
    sectionName: '',
    sectionId: 0,
  })
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddSection = userAccessToFeatures?.find(
    (feature) => feature.name === 'Investment Section',
  )
  const toggle = useTypedSelector(
    reduxServices.itDeclarationList.selectors.toggle,
  )
  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getInvestments())
    dispatch(reduxServices.itDeclarationList.getSections())
  }, [dispatch])

  const editInvestmentButtonHandler = (
    editInvestmentData: Investment,
  ): void => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.editInvestmentPage,
      ),
    )

    setEditInvestment({
      description: editInvestmentData.description,
      investmentId: editInvestmentData.investmentId,
      investmentName: editInvestmentData.investmentName,
      maxLimit: editInvestmentData.maxLimit,
      requiredDocs: editInvestmentData.requiredDocs,
      sectionName: editInvestmentData.sectionName,
      sectionId: editInvestmentData.sectionId,
    })
  }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Add Investment"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                {userAccessToAddSection?.viewaccess && (
                  <Link to={`/addSection`}>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      data-testid="add-section-btn"
                    >
                      <i className="fa fa-plus me-1"></i>Add Section
                    </CButton>
                  </Link>
                )}
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
                <InvestmentListTable
                  editInvestmentButtonHandler={editInvestmentButtonHandler}
                />
              </>
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </OCard>
        </>
      )}
      {toggle === 'editInvestmentPage' && (
        <EditInvestment editInvestment={editInvestment} />
      )}
    </>
  )
}

export default InvestmentList
