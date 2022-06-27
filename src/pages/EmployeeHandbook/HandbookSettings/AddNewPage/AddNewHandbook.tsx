import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'

import React, { useEffect, useState } from 'react'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import {
  EmployeeHandbook,
  EmployeeHandbookPageProps,
} from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

function AddNewHandbook({
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeHandbookPageProps): JSX.Element {
  const initialHandbookDetails = {} as EmployeeHandbook
  const [addNewPage, setAddNewPage] = useState(initialHandbookDetails)
  const [showEditor, setShowEditor] = useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    if (addNewPage.title && addNewPage.displayOrder && addNewPage.pageName) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [
    // addNewPage.country,
    // addNewPage.description,
    addNewPage.displayOrder,
    addNewPage.pageName,
    addNewPage.title,
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'displayOrder') {
      const displayOrder = Number(value.replace(/[^0-9]/gi, ''))
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ [name]: displayOrder } }
      })
    } else {
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }
  const dispatch = useAppDispatch()
  const employeeCountries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeCountries,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
  }, [dispatch])
  const handleDescription = (description: string) => {
    setAddNewPage((prevState) => {
      return { ...prevState, ...{ description: description } }
    })
  }

  const successToastMessage = (
    <OToast
      toastMessage="New page details added successfully"
      toastColor="success"
    />
  )

  // const handleAddNewHandbookPage = async () => {
  //   const prepareObject = {
  //     ...addNewPage,
  //   }
  //   const addNewHandbookResultAction = await dispatch(
  //     reduxServices.employeeHandbookSettings.addNewHandbook(prepareObject),
  //   )

  //   if (
  //     reduxServices.employeeHandbookSettings.addNewHandbook.fulfilled.match(
  //       addNewHandbookResultAction,
  //     )
  //   ) {
  //     backButtonHandler()
  //     dispatch(reduxServices.app.actions.addToast(successToastMessage))
  //   }
  // }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={headerTitle}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'title',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Title:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                name="title"
                maxLength={50}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'pageName',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Page Name:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                name="pageName"
                maxLength={50}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'displayOrder',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Display Order:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                maxLength={2}
                name="displayOrder"
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'country',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Country:
              <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CRow>
                <CCol sm={3}>
                  <CFormCheck
                    className="mt-2"
                    id="All"
                    label="All"
                    checked={false}
                    // onChange={() => setBaseLocationShown(!baseLocationShown)}
                  />
                </CCol>
              </CRow>
              <CRow>
                {employeeCountries.map((country, index) => {
                  return (
                    <CCol sm={3} key={index} className="me-4">
                      <CFormCheck
                        className="mt-1"
                        id="trigger"
                        label={country.name}
                        checked={false}
                      />
                    </CCol>
                  )
                })}
              </CRow>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Description: <span className="text-danger">*</span>
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData=""
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
              <p className="text-danger">
                Please enter at least 150 characters.
              </p>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isButtonEnabled}
              >
                {confirmButtonText}
              </CButton>
              <CButton color="warning " className="btn-ovh text-white">
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default AddNewHandbook
