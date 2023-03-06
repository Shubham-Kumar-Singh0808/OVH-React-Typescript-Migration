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
  EmployeeHandbookPageProps,
  UpdateHandbookPage,
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

const EditHandbook = ({
  isEditHandbook = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
  handbookId = 0,
}: EmployeeHandbookPageProps): JSX.Element => {
  const initialHandbookDetails = {} as UpdateHandbookPage

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [editPage, setEditPage] = useState(initialHandbookDetails)
  const [error, setError] = useState<boolean>(true)
  const [isDisplayOrderExist, setIsDisplayOrderExist] = useState<boolean>(false)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const empCountries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeCountries,
  )

  const selectedCountries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.selectedCountries,
  )
  useEffect(() => {
    if (selectedCountries.length > 0) {
      const countryId = selectedCountries.map((each) => each.id)
      setEditPage((prevState) => {
        return { ...prevState, ...{ list: countryId } }
      })
    }
  }, [selectedCountries])

  const totalHandbookList = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.totalHandbookList,
  )

  useEffect(() => {
    const selectedHandbook =
      totalHandbookList.length > 0 &&
      totalHandbookList?.find((each) => each.id === handbookId)

    if (selectedHandbook) {
      setEditPage((prevState) => {
        return {
          ...prevState,
          ...selectedHandbook,
        }
      })
      setShowEditor(false)
      setTimeout(() => {
        setShowEditor(true)
      }, 100)

      if (selectedHandbook.handCountry.length === empCountries.length) {
        setAllChecked(true)
      }
      if (selectedHandbook.description?.length > 156) {
        setError(false)
      } else {
        setError(true)
      }
    }
  }, [totalHandbookList])

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = empCountries?.map((item) => item.id)
    const { checked } = e.target
    setAllChecked(e.target.checked)
    if (checked) {
      setEditPage((prevState) => {
        return {
          ...prevState,
          ...{ list: newList },
        }
      })
    } else {
      setEditPage((prevState) => {
        return { ...prevState, ...{ list: [] } }
      })
    }
  }

  const handleSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const value1 = +value
    if (editPage.list?.includes(value1)) {
      setAllChecked(checked)
      const list = [...editPage.list]
      const index = list.indexOf(value1)
      if (index !== undefined) {
        list.splice(index, 1)
        setEditPage((prevState) => {
          return { ...prevState, ...{ list } }
        })
      }
    } else {
      const list = editPage.list || []
      list?.push(value1)
      if (list.length === empCountries.length) setAllChecked(checked)
      setEditPage((prevState) => {
        return { ...prevState, ...{ list } }
      })
    }
  }

  useEffect(() => {
    if (isEditHandbook) {
      dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
    }
  }, [dispatch])

  useEffect(() => {
    if (
      editPage.title &&
      editPage.displayOrder &&
      editPage.pageName &&
      editPage.list &&
      editPage.description?.length > 156 &&
      editPage.list?.length > 0
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [editPage])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'title') {
      const pageTitle = value.replace(/^\s*/, '')
      setEditPage((prevState) => {
        return { ...prevState, ...{ [name]: pageTitle } }
      })
    } else if (name === 'pageName') {
      const pageNameValue = value.replace(/^\s*/, '')
      setEditPage((prevState) => {
        return { ...prevState, ...{ [name]: pageNameValue } }
      })
    } else if (name === 'displayOrder') {
      const newValue = value.replace(/[\D]/gi, '')
      setEditPage((prevState) => {
        return { ...prevState, ...{ [name]: Number(newValue) } }
      })
      if (displayOrderExists(value)) {
        setIsDisplayOrderExist(true)
      } else {
        setIsDisplayOrderExist(false)
      }
    } else {
      setEditPage((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const displayOrderExists = (id: string) => {
    const selectedHandbook = totalHandbookList.find(
      (each) => each.id === handbookId,
    )
    return totalHandbookList?.find((currentHandBook) => {
      return (
        currentHandBook.displayOrder === Number(id) &&
        currentHandBook.displayOrder !== selectedHandbook?.displayOrder
      )
    })
  }

  const updateToastMessage = (
    <OToast
      toastMessage="Handbook details updated successfully"
      toastColor="success"
    />
  )

  useEffect(() => {
    dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
    dispatch(reduxServices.employeeHandbookSettings.getTotalHandbookList())
  }, [dispatch])
  const handleDescription = (description: string) => {
    if (description?.length > 156) {
      setError(false)
    } else {
      setError(true)
    }
    setEditPage((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleUpdateHandbook = async () => {
    const handCountries = empCountries.filter((each) =>
      (editPage?.list || []).includes(each.id),
    )
    const updateHandbookResultAction = await dispatch(
      reduxServices.employeeHandbookSettings.updateEmployeeHandbook({
        ...editPage,
        ...{ handCountry: handCountries },
      }),
    )
    if (
      reduxServices.employeeHandbookSettings.updateEmployeeHandbook.fulfilled.match(
        updateHandbookResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(reduxServices.app.actions.addToast(updateToastMessage))
    } else if (
      reduxServices.employeeHandbookSettings.updateEmployeeHandbook.rejected.match(
        updateHandbookResultAction,
      ) &&
      updateHandbookResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(WarningToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const WarningToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage="Please Enter Unique Title, Pagename, Add Countries."
    />
  )

  const validateUpdateButton = isButtonEnabled
    ? isButtonEnabled && isDisplayOrderExist
    : !isButtonEnabled

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
              data-testid="back-btn"
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
                  editPage.title?.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
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
                type="text"
                name="title"
                value={editPage.title}
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
                  editPage.pageName
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
                data-testid="pageName-input"
                type="text"
                name="pageName"
                value={editPage.pageName}
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
              <span className={editPage.displayOrder ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="displayOrder-input"
                type="text"
                maxLength={2}
                min={1}
                max={99}
                id="displayOrder"
                name="displayOrder"
                value={editPage.displayOrder || ''}
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
              id="check-country"
            >
              Country:
              <span
                className={
                  (editPage.list?.length as number) > 0 ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={4}>
              <CRow className="mt-2">
                <CCol sm={3}>
                  <CFormCheck
                    data-testid="ch-All-countries"
                    id="all"
                    name="all"
                    label="All"
                    checked={allChecked}
                    onChange={handleAllCheck}
                  />
                </CCol>
              </CRow>
              <CRow>
                {empCountries.length > 0 &&
                  empCountries?.map((country, index) => {
                    return (
                      <CCol sm={3} key={index} className="me-4">
                        <CFormCheck
                          data-testid={`ch-countries${index}`}
                          className="mt-1"
                          id={country.name}
                          label={country.name}
                          checked={
                            editPage.list == null
                              ? false
                              : editPage.list?.includes(country.id)
                          }
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
              <span className={editPage.description ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            {showEditor ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={editPage?.description}
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
                className="btn-ovh me-1"
                data-testid="btn-update"
                color="success"
                disabled={validateUpdateButton}
                onClick={handleUpdateHandbook}
              >
                {confirmButtonText}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default EditHandbook
