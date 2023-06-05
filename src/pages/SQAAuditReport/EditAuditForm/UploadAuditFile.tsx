import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { SyntheticEvent, useEffect, useState } from 'react'

const UploadAuditFile = (): JSX.Element => {
  const [uploadErrorText, setUploadErrorText] = useState<string>('')
  const [uploadAuditFile, setUploadAuditFile] = useState<File | undefined>(
    undefined,
  )
  const onChangeFileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['xlsx']
    let extension = ''
    if (!file) return
    if (file && file[0] !== undefined) {
      extension = file[0].name.split('.').pop() as string
    }
    if (file[0] !== undefined && file[0].size > 2048000) {
      setUploadErrorText('Please upload a file less than 2MB.')
      return
    }
    if (!acceptedFileTypes.includes(extension)) {
      setUploadErrorText('Please choose excel file')
      return
    }
    setUploadErrorText('')
    setUploadAuditFile(file[0])
  }

  useEffect(() => {
    if (uploadAuditFile) {
      setUploadErrorText('')
    }
  }, [])
  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Upload File :
        </CFormLabel>
        <CCol sm={3}>
          <input
            className="mt-1"
            data-testid="auditFile-upload"
            type="file"
            name="upload-form"
            accept=".doc, .docx, .xlsx"
            onChange={(element: SyntheticEvent) =>
              onChangeFileUploadHandler(
                element.currentTarget as HTMLInputElement,
              )
            }
          />
          {uploadErrorText && (
            <div id="error">
              <strong className="mt-3 text-danger">{uploadErrorText}</strong>
            </div>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default UploadAuditFile
