import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CButton,
  CFormSelect,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { showIsRequired } from '../../../../utils/helper'
import OToast from '../../../../components/ReusableComponent/OToast'
import { Investment } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'

const EditInvestment = ({
  editInvestment,
}: {
  editInvestment: Investment
}): JSX.Element => {
  const [editInvestmentCopy, setEditInvestmentCopy] = useState(editInvestment)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const [requireDocuments, setRequiredDocuments] = useState(
    editInvestment.requiredDocs,
  )
  const [isDocumentsVisible, setIsDocumentsVisible] = useState<boolean>(false)
  const [investmentMaxLimit, setInvestmentMaxLimit] = useState(
    editInvestment.maxLimit,
  )
  const dispatch = useAppDispatch()
  const formLabelProps = {
    htmlFor: 'inputUpdateInvestment',
    className: 'col-form-label section-label',
  }
  const dynamicFormLabelProps = (rows: string, className: string) => {
    return {
      rows,
      className,
    }
  }
  const sections = useTypedSelector(
    reduxServices.itDeclarationList.selectors.sections,
  )

  const handleSelectDocumentOptions = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === 'yes') {
      setIsDocumentsVisible(true)
    } else if (event.target.value === 'no') {
      setIsDocumentsVisible(false)
    } else {
      setIsDocumentsVisible(false)
    }
  }

  const WarningToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage="Total investment is exceeding section limit"
    />
  )
  const handleDescription = (description: string) => {
    setEditInvestmentCopy((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'investmentName') {
      const investmentNameVal = value.replace(/^\s*/, '')
      setEditInvestmentCopy((prevState) => {
        return { ...prevState, ...{ [name]: investmentNameVal } }
      })
    } else {
      setEditInvestmentCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (editInvestmentCopy?.investmentName && !isDocumentsVisible) {
      setIsUpdateButtonEnabled(true)
    } else if (
      editInvestmentCopy?.investmentName &&
      isDocumentsVisible &&
      requireDocuments
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editInvestmentCopy.investmentName, isDocumentsVisible, requireDocuments])

  useEffect(() => {
    if (editInvestment?.requiredDocs) {
      setIsDocumentsVisible(true)
    } else {
      setIsDocumentsVisible(false)
    }
  }, [editInvestment?.requiredDocs])

  const successToastMessage = (
    <OToast
      toastMessage="Investment Updated Successfully"
      toastColor="success"
    />
  )

  const backButtonHandler = () => {
    dispatch(reduxServices.itDeclarationList.actions.clickBackButton())
  }
  const handleUpdateInvestment = async () => {
    const filteredInvest = sections.filter(
      (currentSec) => currentSec.sectionId === editInvestmentCopy.sectionId,
    )
    if (investmentMaxLimit > filteredInvest[0].sectionLimit) {
      dispatch(reduxServices.app.actions.addToast(WarningToastMessage))
      setInvestmentMaxLimit('')
    } else {
      const prepareObject = {
        ...editInvestmentCopy,
        investmentId: editInvestment.investmentId,
        maxLimit: investmentMaxLimit as string,
        requiredDocs: requireDocuments,
      }
      const editInvestmentResultAction = await dispatch(
        reduxServices.itDeclarationList.updateInvestment(prepareObject),
      )
      if (
        reduxServices.itDeclarationList.updateInvestment.fulfilled.match(
          editInvestmentResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
        dispatch(reduxServices.itDeclarationList.getSections())
        dispatch(reduxServices.itDeclarationList.getInvestments())
        backButtonHandler()
      }
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Investment"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="editInv-back-btn"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Section :
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="section"
                name="sectionName"
                id="section"
                data-testid="editInv-section-name"
                disabled
                value={editInvestmentCopy.sectionId}
              >
                <option value="">Select Section</option>
                {sections &&
                  sections
                    ?.slice()
                    .sort((section1, section2) =>
                      section1.sectionName.localeCompare(section2.sectionName),
                    )
                    ?.map((sectionItem, index) => (
                      <option key={index} value={sectionItem.sectionId}>
                        {sectionItem.sectionName}
                      </option>
                    ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Investment Name:
              <span
                className={
                  editInvestmentCopy?.investmentName ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="ps-2"
                data-testid="editInv-investment-name"
                type="text"
                name="investmentName"
                placeholder="Investment Name"
                autoComplete="off"
                value={editInvestmentCopy?.investmentName}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Maximum Investment:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="ps-2"
                data-testid="editInv-investment-limit"
                type="text"
                name="maxLimit"
                placeholder="Maximum Investment"
                autoComplete="off"
                value={investmentMaxLimit}
                maxLength={16}
                onChange={(e) =>
                  setInvestmentMaxLimit(e.target.value.replace(/\D/g, ''))
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Description:
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editInvestment?.description}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Required Documents:
            </CFormLabel>
            <CCol sm={3}>
              <CFormCheck
                type="radio"
                name="requireDocs"
                id="requireDocsYes"
                data-testid="editInv-documentsReqYes"
                label="Yes"
                value="yes"
                onChange={handleSelectDocumentOptions}
                checked={isDocumentsVisible}
                inline
              />
              <CFormCheck
                type="radio"
                name="requireDocs"
                id="requireDocs"
                data-testid="editInv-documentsReqNo"
                label="No"
                value="no"
                onChange={handleSelectDocumentOptions}
                checked={!isDocumentsVisible}
                inline
              />
            </CCol>
          </CRow>
          {isDocumentsVisible && (
            <CRow className="mt-4 mb-4">
              <CFormLabel
                {...formLabelProps}
                className="col-sm-3 col-form-label text-end"
              >
                Documents:{' '}
                <span className={showIsRequired(requireDocuments)}>*</span>
              </CFormLabel>
              <CCol sm={9} data-testid="editInv-reqDocs">
                <CFormTextarea
                  {...dynamicFormLabelProps(
                    '2',
                    'investment-text-area documentWidth',
                  )}
                  value={requireDocuments}
                  onChange={(e) =>
                    setRequiredDocuments(e.target.value.replace(/^\s*/, ''))
                  }
                ></CFormTextarea>
              </CCol>
            </CRow>
          )}
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 6, offset: 3 }}>
              <>
                <CButton
                  data-testid="editInv-update-btn"
                  className="btn-ovh me-1 text-white"
                  color="success"
                  onClick={handleUpdateInvestment}
                  disabled={!isUpdateButtonEnabled}
                >
                  Update
                </CButton>
              </>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditInvestment
