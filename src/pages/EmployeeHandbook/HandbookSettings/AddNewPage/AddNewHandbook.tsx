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
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import {
  AddNewHandbookPage,
  EmployeeHandbookPageProps,
} from '../../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  TextDanger,
  TextWhite,
  TextLabelProps,
} from '../../../../constant/ClassName'

function AddNewHandbook({
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeHandbookPageProps): JSX.Element {
  const initialHandbookDetails = {} as AddNewHandbookPage

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [addNewPage, setAddNewPage] = useState(initialHandbookDetails)
  const [error, setError] = useState<boolean>(true)
  const [isDisplayOrderExist, setIsDisplayOrderExist] = useState<boolean>(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const employeeCountries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeCountries,
  )
  const totalHandbookList = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.totalHandbookList,
  )
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = employeeCountries.map((item) => item.id)
    const { checked } = e.target
    setAllChecked(e.target.checked)
    if (checked) {
      setAddNewPage((prevState) => {
        return {
          ...prevState,
          ...{ list: newList },
        }
      })
    } else {
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ list: [] } }
      })
    }
  }

  const handleSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const value1 = +value
    if (addNewPage.list?.includes(value1)) {
      setAllChecked(checked)
      const list = [...addNewPage.list]
      const index = list.indexOf(value1)
      if (index !== undefined) {
        list.splice(index, 1)
        setAddNewPage((prevState) => {
          return { ...prevState, ...{ list } }
        })
      }
    } else {
      const list = addNewPage.list || []
      list?.push(value1)
      if (list.length === employeeCountries.length) setAllChecked(checked)
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ list } }
      })
    }
  }

  useEffect(() => {
    if (
      addNewPage.title &&
      addNewPage.displayOrder &&
      addNewPage.pageName &&
      addNewPage.list &&
      addNewPage.description?.length > 156 &&
      addNewPage.list?.length > 0
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addNewPage])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'title') {
      const pageTitle = value.replace(/^\s*/, '')
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ [name]: pageTitle } }
      })
    } else if (name === 'pageName') {
      const pageNameValue = value.replace(/^\s*/, '')
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ [name]: pageNameValue } }
      })
    } else if (name === 'displayOrder') {
      const newValue = value.replace(/[\D]/gi, '')
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ [name]: newValue } }
      })
      console.log(displayOrderExists(value))
      if (displayOrderExists(value)) {
        setIsDisplayOrderExist(true)
      } else {
        setIsDisplayOrderExist(false)
      }
    } else {
      setAddNewPage((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const displayOrderExists = (id: string) => {
    console.log(totalHandbookList)
    return totalHandbookList?.find((currentHandBook) => {
      return currentHandBook.displayOrder === Number(id)
    })
  }

  const handleClearInputs = () => {
    setAddNewPage({
      title: '',
      pageName: '',
      displayOrder: '',
      list: [],
      description: '',
      type: '',
    })
    setShowEditor(false)
    setIsDisplayOrderExist(false)
    setAllChecked(false)
    setError(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  useEffect(() => {
    dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
    dispatch(reduxServices.employeeHandbookSettings.getTotalHandbookList())
  }, [dispatch])
  const handleDescription = (description: string) => {
    if (description.length > 156) {
      setError(false)
    } else {
      setError(true)
    }
    setAddNewPage((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const successToastMessage = (
    <OToast
      toastMessage="New page details added successfully"
      toastColor="success"
    />
  )
  const WarningToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage="Please Enter Unique Title, Pagename, Add Countries."
    />
  )
  const handleAddNewHandbookPage = async () => {
    const addNewHandbookResultAction = await dispatch(
      reduxServices.employeeHandbookSettings.addNewHandbook(addNewPage),
    )

    if (
      reduxServices.employeeHandbookSettings.addNewHandbook.fulfilled.match(
        addNewHandbookResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    } else if (
      reduxServices.employeeHandbookSettings.addNewHandbook.rejected.match(
        addNewHandbookResultAction,
      ) &&
      addNewHandbookResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(WarningToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

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
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Title:
              <span
                className={
                  addNewPage.title
                    ?.replace(/^\s*/, '')
                    .replace(/[^a-z\s]/gi, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="title-input"
                autoComplete="off"
                type="text"
                name="title"
                value={addNewPage.title}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Page Name:
              <span
                className={
                  addNewPage.pageName
                    ?.replace(/^\s*/, '')
                    .replace(/[^a-z\s]/gi, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                autoComplete="off"
                data-testid="pageName-input"
                type="text"
                name="pageName"
                value={addNewPage.pageName}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Display Order:
              <span
                className={addNewPage.displayOrder ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="displayOrder-input"
                autoComplete="off"
                type="text"
                maxLength={2}
                min={1}
                max={99}
                id="displayOrder"
                name="displayOrder"
                value={addNewPage.displayOrder}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol sm={3}>
              {isDisplayOrderExist && (
                <p className={TextDanger} data-testid="display-order-exists">
                  Display order Already Exist
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Country:
              <span
                className={addNewPage.list?.length > 0 ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={4}>
              <CRow className="mt-2">
                <CCol sm={3}>
                  <CFormCheck
                    data-testid="ch-All"
                    id="all"
                    name="all"
                    label="All"
                    checked={allChecked}
                    onChange={handleAllCheck}
                  />
                </CCol>
              </CRow>
              <CRow>
                {employeeCountries?.map((country, index) => {
                  return (
                    <CCol sm={3} key={index} className="me-4">
                      <CFormCheck
                        data-testid={`ch-countries${index}`}
                        className="mt-1"
                        id={country.name}
                        label={country.name}
                        checked={!!addNewPage.list?.includes(country.id)}
                        value={country.id}
                        onChange={handleSingleCheck}
                      />
                    </CCol>
                  )
                })}
              </CRow>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>
              Description:{' '}
              <span
                className={
                  addNewPage.description
                    ?.replace(/^\s*/, '')
                    .replace(/[^a-z\s]/gi, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            {showEditor ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addNewPage?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleDescription(editor.getData().trim())
                  }}
                />
                {error && (
                  <p className="text-danger" data-testid="error-msg">
                    Please enter at least 150 characters.
                  </p>
                )}
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1"
                color="success"
                disabled={
                  isButtonEnabled
                    ? isButtonEnabled && isDisplayOrderExist
                    : !isButtonEnabled
                }
                onClick={handleAddNewHandbookPage}
              >
                {confirmButtonText}
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning "
                className="btn-ovh"
                onClick={handleClearInputs}
              >
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
