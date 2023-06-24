import { CRow, CCol, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MileStoneDiscussionTimeLine from './MileStoneDiscussionTimeLine'
import OLoadingSpinner from '../../../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'
import { LoadingType } from '../../../../../../types/Components/loadingScreenTypes'
import OToast from '../../../../../../components/ReusableComponent/OToast'
import OCard from '../../../../../../components/ReusableComponent/OCard'

const MileStoneDiscussion = (): JSX.Element => {
  const getMileStone = useTypedSelector(
    reduxServices.projectMileStone.selectors.getProjectMileStoneResponse,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  const [postDiscussion, setPostDiscussion] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false)
  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
  }

  useEffect(() => {
    if (postDiscussion) {
      setIsPostButtonEnabled(true)
    } else {
      setIsPostButtonEnabled(false)
    }
  }, [postDiscussion])
  const postNotesHandler = async () => {
    const postMileStoneDiscussionResultAction = await dispatch(
      reduxServices.projectMileStone.postProjectMileStone({
        post: postDiscussion,
        postedBy: {
          id: Number(employeeId),
        },
        project: {
          id: projectId,
        },
        milestone: {
          id: Number(getMileStone.id),
        },
      }),
    )
    if (uploadFile) {
      const formData = new FormData()
      formData.append('file', uploadFile, uploadFile.name)
      const uploadPrepareObject = {
        postid: postMileStoneDiscussionResultAction.payload as number,
        file: formData,
      }
      dispatch(
        reduxServices.projectMileStone.uploadProjectMileStoneImage(
          uploadPrepareObject,
        ),
      )
    }
    if (
      reduxServices.projectMileStone.postProjectMileStone.fulfilled.match(
        postMileStoneDiscussionResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="project Notes created successfully"
          />,
        ),
      )
      setPostDiscussion('')
      setUploadFile(undefined)
      dispatch(
        reduxServices.projectMileStone.getMilestoneNewsFeed({
          milestoneId: getMileStone.id,
          projectid: String(projectId),
        }),
      )
    }
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper project-report"
        title="Project Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="col-xs-12 mt10">
          <div className="panel-body">
            <p className="milestone-history">
              <strong className="text-info">Milestone:</strong>
              {getMileStone?.title}
            </p>
            <p className="milestone-history">
              <strong className="text-info">Planned End Date:</strong>
              {getMileStone?.planedDate}
            </p>
            <p className="milestone-history">
              <strong className="text-info">Actual End Date:</strong>
              {getMileStone?.actualDate}
            </p>
            <p className="milestone-history">
              <strong className="text-info">Milestone Percentage:</strong>
              {getMileStone?.milestonePercentage}%
            </p>
          </div>
        </CRow>
        <CRow className="mt-4 mb-0">
          <CCol col-xs-12 mt-10>
            <CFormInput
              autoComplete="off"
              type="text"
              id="notesLink"
              name="notesLink"
              placeholder="What you are thinking?"
              data-testid="notes-link"
              value={postDiscussion}
              onChange={(e) => setPostDiscussion(e.target.value)}
            />
            <p className="mt-1">{postDiscussion?.length}/250</p>
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-4">
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file"
              type="file"
              data-testid="file-upload"
              id="fileUpload"
              onChange={(element: React.SyntheticEvent) =>
                onChangeFileEventHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
          </CCol>
          <CCol className="text-end" md={9}>
            <CButton
              color="info btn-ovh me-1 pull-right"
              disabled={!isPostButtonEnabled}
              className="milestone-discussion-post"
              onClick={postNotesHandler}
            >
              <i className="fa fa-pencil fa-fw"></i>Post
            </CButton>
          </CCol>
        </CRow>
      </OCard>
      {isLoading !== ApiLoadingState.loading ? (
        <MileStoneDiscussionTimeLine />
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default MileStoneDiscussion
