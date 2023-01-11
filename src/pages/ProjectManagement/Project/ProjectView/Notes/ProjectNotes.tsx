import { CRow, CCol, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectNotesTimeLine from './ProjectNotesTimeLine'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import OToast from '../../../../../components/ReusableComponent/OToast'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const ProjectNotes = (): JSX.Element => {
  const [notesLink, setNotesLink] = useState<string>('')
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const { projectId } = useParams<{ projectId: string }>()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.projectNotes.getProjectNotesTimeLine(projectId as string),
    )
  }, [])

  const isLoading = useTypedSelector(
    reduxServices.projectNotes.selectors.isProjectNotesLoading,
  )

  useEffect(() => {
    if (notesLink) {
      setIsPostButtonEnabled(true)
    } else {
      setIsPostButtonEnabled(false)
    }
  }, [notesLink])
  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
  }

  const postNotesHandler = async () => {
    const postNotesResultAction = await dispatch(
      reduxServices.projectNotes.postProjectNotes({
        post: notesLink,
        postedBy: {
          id: employeeId,
        },
        project: {
          id: projectId,
        },
      }),
    )
    if (uploadFile) {
      const formData = new FormData()
      formData.append('file', uploadFile, uploadFile.name)
      const uploadPrepareObject = {
        postid: postNotesResultAction.payload as number,
        file: formData,
      }
      dispatch(
        reduxServices.projectNotes.uploadProjectNotesImage(uploadPrepareObject),
      )
    }
    if (
      reduxServices.projectNotes.postProjectNotes.fulfilled.match(
        postNotesResultAction,
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
      setNotesLink('')
      setUploadFile(undefined)
      dispatch(
        reduxServices.projectNotes.getProjectNotesTimeLine(projectId as string),
      )
    }
  }
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CCol col-xs-12 mt-10>
          <CFormInput
            autoComplete="off"
            type="text"
            id="notesLink"
            name="notesLink"
            placeholder="What you are thinking?"
            data-testid="person-name"
            value={notesLink}
            onChange={(e) => setNotesLink(e.target.value)}
          />
          <p>{notesLink?.length}/150</p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
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
      </CRow>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info btn-ovh me-1 pull-right"
            disabled={!isPostButtonEnabled}
            onClick={postNotesHandler}
          >
            <i className="fa fa-pencil fa-fw"></i>Post
          </CButton>
        </CCol>
      </CRow>

      {isLoading !== ApiLoadingState.loading ? (
        <ProjectNotesTimeLine />
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default ProjectNotes
