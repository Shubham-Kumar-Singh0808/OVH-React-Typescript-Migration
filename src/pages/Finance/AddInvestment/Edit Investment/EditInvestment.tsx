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

const EditInvestment = ({
  selectedSectionId,
  setSelectedSectionId,
  editInvestment,
}: {
  selectedSectionId: string
  setSelectedSectionId: (value: string) => void
  editInvestment: Investment
}): JSX.Element => {
  const [editInvestmentCopy, setEditInvestmentCopy] = useState(editInvestment)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [requireDocuments, setRequiredDocuments] = useState<string>('')
  const [isDocumentsVisible, setIsDocumentsVisible] = useState<boolean>(false)
  const [investmentMaxLimit, setInvestmentMaxLimit] = useState<string>()
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
  const investments = useTypedSelector(
    reduxServices.itDeclarationList.selectors.investments,
  )

  const handleSelectDocumentOption = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value === 'yes') {
      setIsDocumentsVisible(true)
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
    setEditInvestmentCopy((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  useEffect(() => {
    if (selectedSectionId && editInvestmentCopy?.investmentName) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [selectedSectionId, editInvestmentCopy.investmentName])

  const successToastMessage = (
    <OToast
      toastMessage="Investment Updated Successfully"
      toastColor="success"
    />
  )

  const backButtonHandler = () => {
    dispatch(reduxServices.itDeclarationList.actions.setToggle(''))
  }
  const handleUpdateInvestment = async () => {
    const filteredInvest = investments.filter(
      (currInvest) => currInvest.investmentId === editInvestment.investmentId,
    )
    console.log(filteredInvest)
    const prepareObject = {
      ...editInvestmentCopy,
      investmentId: filteredInvest[0].investmentId,
      sectionId: Number(selectedSectionId),
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
    } else if (
      reduxServices.itDeclarationList.updateInvestment.rejected.match(
        editInvestmentResultAction,
      ) &&
      editInvestmentResultAction.payload === 406
    ) {
      dispatch(reduxServices.app.actions.addToast(WarningToastMessage))
      setInvestmentMaxLimit('')
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
              <span className={showIsRequired(selectedSectionId)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="section"
                name="sectionName"
                id="section"
                data-testid="select-section-name"
                onChange={(e) => setSelectedSectionId(e.target.value)}
                value={selectedSectionId}
              >
                <option value="">Select Section</option>
                {sections &&
                  sections
                    ?.slice()
                    .sort((sec1, sec2) =>
                      sec1.sectionName.localeCompare(sec2.sectionName),
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
              <span className={showIsRequired(editInvestment?.investmentName)}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="ps-2"
                data-testid="investment-name"
                type="text"
                name="investmentName"
                placeholder="Investment Name"
                autoComplete="off"
                value={editInvestmentCopy.investmentName}
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
                data-testid="investment-limit"
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
            {showEditor ? (
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
            ) : (
              ''
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Required Documents:
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="requiredDoc"
            >
              <CFormCheck
                type="radio"
                name="requireDocsYes"
                id="requireDocsYes"
                data-testid="documentsReqYes"
                label="Yes"
                value="yes"
                onChange={handleSelectDocumentOption}
                inline
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="documentsReqNo"
            >
              <CFormCheck
                type="radio"
                name="requireDocsNo"
                id="requireDocsNo"
                data-testid="documentsReqNo"
                label="No"
                value="no"
                onChange={handleSelectDocumentOption}
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
              <CCol sm={9}>
                <CFormTextarea
                  {...dynamicFormLabelProps(
                    '2',
                    'investment-text-area documentWidth',
                  )}
                  onChange={(e) => setRequiredDocuments(e.target.value)}
                ></CFormTextarea>
              </CCol>
            </CRow>
          )}
          {/* {userAccessToAddInvestment?.createaccess && ( */}
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 6, offset: 3 }}>
              <>
                <CButton
                  data-testid="addInv-add-btn"
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
