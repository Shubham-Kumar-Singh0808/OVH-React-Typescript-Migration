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
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { showIsRequired } from '../../../utils/helper'
import { AddInvestmentData } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const AddNewInvestment = ({
  selectedSectionId,
  setSelectedSectionId,
}: {
  selectedSectionId: string
  setSelectedSectionId: (value: string) => void
}): JSX.Element => {
  const initialAddInvestmentData = {} as AddInvestmentData
  const [addNewInvestment, setAddNewInvestment] = useState(
    initialAddInvestmentData,
  )
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [requireDocuments, setRequiredDocuments] = useState<string>('')
  const [isDocumentsVisible, setIsDocumentsVisible] = useState<boolean>(false)
  const [investmentMaxLimit, setInvestmentMaxLimit] = useState<string>()
  const dispatch = useAppDispatch()
  const formLabelProps = {
    htmlFor: 'inputAddInvestment',
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
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddInvestment = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Section and Investment',
  )

  const handleSelectDocumentOption = (
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

  const successToastMessage = (
    <OToast toastMessage="Investment added Successfully" toastColor="success" />
  )
  const warningToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage="Total investment is exceeding section limit"
    />
  )
  const alreadyExistToastMessage = (
    <OToast toastColor="danger" toastMessage="Investment already Exist" />
  )
  const handleDescription = (description: string) => {
    setAddNewInvestment((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setAddNewInvestment((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  useEffect(() => {
    if (selectedSectionId && addNewInvestment?.investmentName) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [selectedSectionId, addNewInvestment.investmentName])

  const handleClear = () => {
    setSelectedSectionId('')
    setAddNewInvestment({
      investmentName: '',
      maxLimit: '',
      requiredDocs: '',
    })
    setRequiredDocuments('')
    setInvestmentMaxLimit('')
    setIsDocumentsVisible(false)
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }

  const handleAddNewInvestment = async () => {
    const prepareObject = {
      ...addNewInvestment,
      sectionId: Number(selectedSectionId),
      maxLimit: investmentMaxLimit as string,
      requiredDocs: requireDocuments,
    }
    const investmentExist = {
      investmentId: -1,
      investmentName: addNewInvestment.investmentName,
      sectionId: Number(selectedSectionId),
    }
    const isInvestmentExistsResultAction = await dispatch(
      reduxServices.itDeclarationList.isInvestmentExist(investmentExist),
    )
    if (
      reduxServices.itDeclarationList.isCycleExist.fulfilled.match(
        isInvestmentExistsResultAction,
      ) &&
      isInvestmentExistsResultAction.payload === true
    ) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
    } else {
      const addNewInvestmentResultAction = await dispatch(
        reduxServices.itDeclarationList.addInvestment(prepareObject),
      )
      if (
        reduxServices.itDeclarationList.addInvestment.fulfilled.match(
          addNewInvestmentResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
        handleClear()
        dispatch(reduxServices.itDeclarationList.getSections())
        dispatch(reduxServices.itDeclarationList.getInvestments())
      } else if (
        reduxServices.itDeclarationList.addInvestment.rejected.match(
          addNewInvestmentResultAction,
        ) &&
        addNewInvestmentResultAction.payload === 406
      ) {
        dispatch(reduxServices.app.actions.addToast(warningToastMessage))
        setInvestmentMaxLimit('')
      }
    }
  }

  return (
    <>
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
            <span className={showIsRequired(addNewInvestment?.investmentName)}>
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
              value={addNewInvestment.investmentName}
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
                initData={addNewInvestment?.description}
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
          <CCol className="mt-1" sm={2} md={1} lg={1} data-testid="requiredDoc">
            <CFormCheck
              type="radio"
              name="requireDocs"
              id="requireDocsYes"
              data-testid="documentsReqYes"
              label="Yes"
              value="yes"
              checked={isDocumentsVisible}
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
              name="requireDocs"
              id="requireDocsNo"
              data-testid="documentsReqNo"
              label="No"
              value="no"
              checked={!isDocumentsVisible}
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
            <CCol sm={9} data-testid="required-documents">
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
        {userAccessToAddInvestment?.createaccess && (
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 6, offset: 3 }}>
              <>
                <CButton
                  data-testid="addInv-add-btn"
                  className="btn-ovh me-1 text-white"
                  color="success"
                  onClick={handleAddNewInvestment}
                  disabled={!isButtonEnabled}
                >
                  Add
                </CButton>
                <CButton
                  data-testid="addInv-clear-btn"
                  color="warning "
                  className="btn-ovh text-white"
                  onClick={handleClear}
                >
                  Clear
                </CButton>
              </>
            </CCol>
          </CRow>
        )}
      </CForm>
    </>
  )
}

export default AddNewInvestment
