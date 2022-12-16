import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeDetails from './EmployeeDetails'
import ITDeclarationFormViewTable from './ITDeclarationFormViewTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ITForm } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ViewDeclarationListForm = (): JSX.Element => {
  const toggle = useTypedSelector(
    reduxServices.itDeclarationList.selectors.toggle,
  )
  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getEmployeeDetails())
  }, [dispatch])

  //   const viewFormButtonHandler = (editSectionData: ITForm): void => {
  //     dispatch(reduxServices.itDeclarationList.actions.setToggle('editSections'))
  //     setEditSection({
  //       invests: [],
  //       sectionId: editSectionData.sectionId,
  //       sectionLimit: editSectionData.sectionLimit,
  //       sectionName: editSectionData.sectionName,
  //     })
  //   }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="IT Declaration Form View"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            {/* {isLoading !== ApiLoadingState.loading ? (
              <> */}
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <Link to={`/addInvestment`}>
                  <CButton
                    color="info"
                    className="btn-ovh me-1"
                    data-testid="back-btn"
                  >
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <EmployeeDetails />
            <ITDeclarationFormViewTable viewDeclarationForm={[]} />
          </OCard>
        </>
      )}
      {/* {toggle === 'editSections' && <EditSection editSection={editSection} />} */}
    </>
  )
}

export default ViewDeclarationListForm
