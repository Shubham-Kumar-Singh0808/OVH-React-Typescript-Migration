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
import { TextWhite, TextDanger } from '../../../constant/ClassName'

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
  const [isDocumentsVisible, setIsDocumentsVisible] = useState<boolean>()
  const [investmentMaxLimit, setInvestmentMaxLimit] = useState<string>()
  const [selectedOption, setSelectedOption] = useState('')
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
    (feature) => feature.name === 'Investment',
  )

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
    if (event.target.value === 'yes') {
      setIsDocumentsVisible(true)
    } else if (event.target.value === 'no') {
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
    if (name === 'investmentName') {
      const invNameVal = value.replace(/^\s*/, '')
      setAddNewInvestment((prevState) => {
        return { ...prevState, ...{ [name]: invNameVal } }
      })
    } else {
      setAddNewInvestment((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      selectedSectionId &&
      addNewInvestment?.investmentName &&
      !isDocumentsVisible
    ) {
      setIsButtonEnabled(true)
    } else if (
      selectedSectionId &&
      addNewInvestment?.investmentName &&
      isDocumentsVisible &&
      requireDocuments
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [
    selectedSectionId,
    addNewInvestment.investmentName,
    isDocumentsVisible,
    requireDocuments,
  ])

  const handleClear = () => {
    setSelectedSectionId('')
    setAddNewInvestment({
      investmentName: '',
      maxLimit: '',
      requiredDocs: '',
    })
    setRequiredDocuments('')
    setSelectedOption('')
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
      reduxServices.itDeclarationList.isInvestmentExist.fulfilled.match(
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
            className="col-sm-2 col-form-label text-end"
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
            className="col-sm-2 col-form-label text-end"
          >
            Investment Name :
            <span
              className={
                addNewInvestment.investmentName?.replace(/^\s*/, '')
                  ? TextWhite
                  : TextDanger
              }
            >
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
            className="col-sm-2 col-form-label text-end pe-18"
          >
            Maximum Investment :
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
              onChange={(e) =>
                setInvestmentMaxLimit(e.target.value.replace(/\D/g, ''))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end pe-18"
          >
            Description :
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
            className="col-sm-2 col-form-label text-end pe-18"
          >
            Required Documents :
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            <CFormCheck
              type="radio"
              name="requiredDocs"
              id="requireDocsYes"
              data-testid="documentsReqYes"
              label="Yes"
              value="yes"
              checked={selectedOption === 'yes'}
              onChange={handleOptionChange}
              inline
            />
            <CFormCheck
              type="radio"
              name="requiredDocs"
              id="requireDocsNo"
              data-testid="documentsReqNo"
              label="No"
              value="no"
              checked={selectedOption === 'no'}
              onChange={handleOptionChange}
              inline
            />
          </CCol>
        </CRow>
        {isDocumentsVisible && (
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-2 col-form-label text-end"
            >
              Documents :
              <span className={showIsRequired(requireDocuments)}>*</span>
            </CFormLabel>
            <CCol sm={9} data-testid="required-documents">
              <CFormTextarea
                {...dynamicFormLabelProps(
                  '2',
                  'investment-text-area documentWidth',
                )}
                onChange={(e) =>
                  setRequiredDocuments(e.target.value.replace(/^\s*/, ''))
                }
              ></CFormTextarea>
            </CCol>
          </CRow>
        )}
        {userAccessToAddInvestment?.createaccess && (
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 4, offset: 2 }}>
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
                  color="warning"
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
