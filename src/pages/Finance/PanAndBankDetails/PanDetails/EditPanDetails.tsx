import {
  CButton,
  CCol,
  CFormLabel,
  CLink,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import panDetailsApi from '../../../../middleware/api/Finance/PanDetails/panDetailsApi'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { Finance } from '../../../../types/Finance/PanDetails/panDetailsTypes'
import { downloadFile } from '../../../../utils/helper'

const EditPanDetails = ({
  isEditPanData,
  setIsEditPanData,
  editPanData,
  financeId,
}: {
  isEditPanData: boolean
  setIsEditPanData: React.Dispatch<React.SetStateAction<boolean>>
  financeId: number
  editPanData: Finance
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )

  const [uploadPanDetail, setUploadPanDetail] = useState<File | undefined>(
    undefined,
  )

  const saveTheDataToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Finance details successfully saved."
    />
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const onChangeAttachmentHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadPanDetail(file[0])
  }

  const cancelButtonHandler = () => {
    setIsEditPanData(false)
  }

  const saveBtnHandler = async () => {
    setIsEditPanData(false)
    if (uploadPanDetail) {
      const formData = new FormData()
      formData.append('file', uploadPanDetail, uploadPanDetail.name)
      const prepareObject = {
        financeId: Number(financeId),
        file: formData,
      }
      dispatch(
        reduxServices.panDetails.uploadEmployeeFinanceDetails(prepareObject),
      )
    }

    const savePanDataResult = await dispatch(
      reduxServices.panDetails.updateFinanceInformation(editPanData),
    )
    if (
      reduxServices.panDetails.updateFinanceInformation.fulfilled.match(
        savePanDataResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(saveTheDataToastElement))
      dispatch(reduxServices.app.actions.addToast(undefined))
      dispatch(
        reduxServices.panDetails.bankInformation({
          key: 'loggedInEmpId',
          value: Number(employeeId),
        }),
      )
    }
  }
  const handleFinanceData = async () => {
    const employeeBankDetailsDownload = await panDetailsApi.downloadFinanceFile(
      {
        fileName: bankDetail.finance?.financeFilePath as string,
      },
    )

    downloadFile(
      employeeBankDetailsDownload,
      `${bankDetail.finance?.financeFilePath}`,
    )
  }

  return (
    <>
      <CCol sm={5}>
        <CRow>
          <CFormLabel className="col-sm-4 col-form-label">
            <b>Attachment</b>
          </CFormLabel>
          <CCol sm={1} className="sh-alignment">
            :
          </CCol>
          {isEditPanData && bankDetail.finance?.financeId === financeId ? (
            <CCol sm={2}>
              <CCol sm={5}>
                <input
                  className="mt-1"
                  data-testid="attachment"
                  type="file"
                  name="attachment"
                  onChange={(element: SyntheticEvent) =>
                    onChangeAttachmentHandler(
                      element.currentTarget as HTMLInputElement,
                    )
                  }
                />
              </CCol>
            </CCol>
          ) : (
            <>
              <CCol sm={5} className="sh-alignment">
                {bankDetail.finance?.financeFilePath || 'N/A'}
              </CCol>
              <CCol sm={5} className="sh-alignment offset-md-5">
                <CLink
                  className="cursor-pointer sh-hive-activity-link"
                  onClick={handleFinanceData}
                >
                  <i className="fa fa-paperclip me-1"></i>
                  Doc
                </CLink>
              </CCol>
            </>
          )}
        </CRow>
      </CCol>
      <CRow>
        {isEditPanData && bankDetail.finance?.financeId === financeId ? (
          <CCol md={{ span: 20, offset: 2 }}>
            <CTooltip content="Save">
              <CButton
                size="sm"
                data-testid="save-btn"
                className="btn btn-success btn-sm btn-ovh-employee-list cursor-pointer"
                color="success btn-ovh me-2"
                onClick={saveBtnHandler}
              >
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
              </CButton>
            </CTooltip>
            <CTooltip content="Cancel">
              <CButton
                size="sm"
                className="btn btn-warning btn-sm btn-ovh-employee-list cursor-pointer"
                color="warning btn-ovh me-2"
                onClick={cancelButtonHandler}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </CButton>
            </CTooltip>
          </CCol>
        ) : (
          ''
        )}
      </CRow>
    </>
  )
}

export default EditPanDetails
