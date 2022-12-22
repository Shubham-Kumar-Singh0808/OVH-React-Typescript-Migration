import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import React from 'react'
import ProjectHistoryTimeLine from './ProjectHistoryTimeLine'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectHistoryDetails = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.projectTimeLine.selectors.isLoading,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project History Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ProjectHistoryTimeLine />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default ProjectHistoryDetails
