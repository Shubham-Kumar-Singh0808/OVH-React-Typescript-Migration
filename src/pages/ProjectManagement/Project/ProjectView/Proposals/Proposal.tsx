import { CRow, CCol, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProposalsTimeLine from './ProposalsTimeLine'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const Proposal = (): JSX.Element => {
  const [proposalLink, setProposalLink] = useState<string>('')
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false)
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.projectProposals.selectors.isProjectProposalsLoading,
  )
  useEffect(() => {
    dispatch(
      reduxServices.projectProposals.getProjectTimeLine(projectId as string),
    )
  }, [])
  useEffect(() => {
    if (proposalLink) {
      setIsPostButtonEnabled(true)
    } else {
      setIsPostButtonEnabled(false)
    }
  }, [proposalLink])

  const postButtonHandler = () => {
    dispatch(
      reduxServices.projectProposals.postProjectProposal({
        post: proposalLink,
        projectId,
      }),
    )
    setProposalLink('')
    dispatch(
      reduxServices.projectProposals.getProjectTimeLine(projectId as string),
    )
  }
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CCol col-xs-12 mt-10>
          <CFormInput
            autoComplete="off"
            type="url"
            id="proposalLink"
            name="proposalLink"
            placeholder="What you are thinking?"
            data-testid="person-name"
            value={proposalLink}
            onChange={(e) => setProposalLink(e.target.value)}
          />
        </CCol>
      </CRow>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info btn-ovh me-1 pull-right"
            disabled={!isPostButtonEnabled}
            onClick={postButtonHandler}
          >
            <i className="fa fa-pencil fa-fw"></i>Post
          </CButton>
        </CCol>
      </CRow>
      {isLoading !== ApiLoadingState.loading ? (
        <ProposalsTimeLine />
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default Proposal
