import { CRow, CCol, CFormTextarea, CButton } from '@coreui/react-pro'
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
  const [clearFile, setClearFile] = useState<string>('')

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectNotes.getProjectNotesTimeLine(projectId))
  }, [])

  const isLoading = useTypedSelector(
    reduxServices.projectNotes.selectors.isProjectNotesLoading,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToProjectNotes = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-Notes',
  )

  useEffect(() => {
    if (notesLink?.replace(/^\s*/, '')) {
      setIsPostButtonEnabled(true)
    } else {
      setIsPostButtonEnabled(false)
    }
  }, [notesLink])
  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
    setClearFile(element.value)
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

    if (
      reduxServices.projectNotes.postProjectNotes.fulfilled.match(
        postNotesResultAction,
      )
    ) {
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        const uploadPrepareObject = {
          postid: postNotesResultAction.payload as number,
          file: formData,
        }
        const uploadResultAction = await dispatch(
          reduxServices.projectNotes.uploadProjectNotesImage(
            uploadPrepareObject,
          ),
        )

        if (
          reduxServices.projectNotes.uploadProjectNotesImage.fulfilled.match(
            uploadResultAction,
          )
        ) {
          // Image upload succeeded, continue with other APIs

          await dispatch(
            reduxServices.app.actions.addToast(
              <OToast
                toastColor="success"
                toastMessage="Project notes created successfully"
              />,
            ),
          )
          setNotesLink('')
          setClearFile('')
          dispatch(
            reduxServices.projectNotes.getProjectNotesTimeLine(projectId),
          )
        } else {
          // Image upload failed, handle the error
          // You can add appropriate error handling code here
        }
      } else {
        await dispatch(
          reduxServices.app.actions.addToast(
            <OToast
              toastColor="success"
              toastMessage="Project notes created successfully"
            />,
          ),
        )
        setNotesLink('')
        setClearFile('')
        dispatch(reduxServices.projectNotes.getProjectNotesTimeLine(projectId))
      }
    }
  }

  return (
    <>
      <CRow className="mt-4 mb-0">
        <CCol col-xs-12 mt-10>
          <CFormTextarea
            autoComplete="off"
            type="text"
            id="notesLink"
            name="notesLink"
            placeholder="What you are thinking?"
            data-testid="notes-link"
            maxLength={250}
            value={notesLink}
            onChange={(e) => setNotesLink(e.target.value)}
          ></CFormTextarea>
          <p className="mt-1">{notesLink?.length}/250</p>
        </CCol>
      </CRow>
      <CRow className="mt-2 mb-4">
        <CCol sm={3}>
          <input
            className="sh-updateTicket-file"
            type="file"
            data-testid="file-upload"
            id="fileUpload"
            value={clearFile}
            onChange={(element: React.SyntheticEvent) =>
              onChangeFileEventHandler(
                element.currentTarget as HTMLInputElement,
              )
            }
            accept="image/*"
          />
        </CCol>
        <CCol className="text-end" md={9}>
          {userAccessToProjectNotes?.createaccess && (
            <CButton
              color="info btn-ovh me-1 pull-right"
              disabled={!isPostButtonEnabled}
              onClick={postNotesHandler}
            >
              <i className="fa fa-pencil fa-fw"></i>Post
            </CButton>
          )}
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
