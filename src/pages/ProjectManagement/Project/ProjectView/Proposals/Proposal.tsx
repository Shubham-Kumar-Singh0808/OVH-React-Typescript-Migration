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

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToProjectProposal = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-Proposals',
  )

  useEffect(() => {
    dispatch(reduxServices.projectProposals.getProjectTimeLine(projectId))
  }, [])

  const isValidUrl = (input: string) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/
    return regex.test(input)
  }

  const postButtonHandler = () => {
    dispatch(
      reduxServices.projectProposals.postProjectProposal({
        post: proposalLink,
        projectId,
      }),
    )
    setProposalLink('')
    setIsPostButtonEnabled(false)
    dispatch(reduxServices.projectProposals.getProjectTimeLine(projectId))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const isValid = isValidUrl(inputValue?.replace(/^\s*/, ''))
    setProposalLink(inputValue?.replace(/^\s*/, ''))
    setIsPostButtonEnabled(isValid)
  }
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CCol col-xs-12 mt-10>
          <CFormInput
            autoComplete="off"
            type="link"
            id="proposalLink"
            name="proposalLink"
            placeholder="Please Enter Proposal link"
            data-testid="proposal-link"
            value={proposalLink?.replace(/^\s*/, '')}
            onChange={handleInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          {userAccessToProjectProposal?.createaccess && (
            <CButton
              className="proposal-post-button"
              color="info btn-ovh me-1 pull-right"
              data-testid="post-btn"
              disabled={!isPostButtonEnabled}
              onClick={postButtonHandler}
            >
              <i className="fa fa-pencil fa-fw"></i>Post
            </CButton>
          )}
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
