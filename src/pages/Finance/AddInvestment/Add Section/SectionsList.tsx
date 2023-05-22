import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddNewSection from './AddNewSection'
import SectionListTable from './SectionListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import EditSection from '../Edit Section/EditSection'
import {
  ITDeclarationFormToggleType,
  UpdateSection,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const SectionsList = (): JSX.Element => {
  const [editSection, setEditSection] = useState<UpdateSection>({
    invests: [],
    sectionId: 0,
    sectionLimit: '',
    sectionName: '',
  })

  const toggle = useTypedSelector(
    reduxServices.itDeclarationList.selectors.toggle,
  )
  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.investmentCheckList.getSections())
  }, [dispatch])

  const editSectionButtonHandler = (editSectionData: UpdateSection): void => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.editSection,
      ),
    )
    console.log(editSectionData)
    setEditSection({
      invests: [],
      sectionId: editSectionData.sectionId,
      sectionLimit: editSectionData.sectionLimit,
      sectionName: editSectionData.sectionName,
    })
  }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title={"Section's"}
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            {isLoading !== ApiLoadingState.loading ? (
              <>
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
                <AddNewSection />
                <SectionListTable
                  editSectionButtonHandler={editSectionButtonHandler}
                />
              </>
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </OCard>
        </>
      )}
      {toggle === 'editSections' && <EditSection editSection={editSection} />}
    </>
  )
}

export default SectionsList
