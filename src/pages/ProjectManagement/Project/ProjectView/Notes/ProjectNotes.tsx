import { CRow, CCol, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectNotesTimeLine from './ProjectNotesTimeLine'
import { useAppDispatch } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'

const ProjectNotes = (): JSX.Element => {
  const [notesLink, setNotesLink] = useState<string>('')
  const [isPostButtonEnabled, setIsPostButtonEnabled] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.projectNotes.getProjectNotesTimeLine(projectId as string),
    )
  }, [])
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
          >
            <i className="fa fa-pencil fa-fw"></i>Post
          </CButton>
        </CCol>
      </CRow>
      <ProjectNotesTimeLine />
    </>
  )
}

export default ProjectNotes
