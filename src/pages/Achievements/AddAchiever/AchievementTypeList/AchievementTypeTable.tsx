import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormSelect,
  CFormInput,
  CCol,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  AchievementTypeIdQueryParameter,
  AddAchieverTypeTableProps,
  NewAchievementStatus,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { currentPageData } from '../../../../utils/paginationUtils'
import {
  EditedAchievementDetails,
  emptyString,
  ErrorBooleans,
  errorOrderMessage,
  orderRegexValue,
  TableColor,
} from '../../AchievementConstants'

const defaultAchievementTypeIdValue = -1
const editAchievementIdDefaultValue = 0

const AchievementTypeTable = (
  props: AddAchieverTypeTableProps,
): JSX.Element => {
  const {
    executeSaveButtonHandler,
    isEditSaveButtonEnabled,
    setEditSaveButtonEnabled,
  } = props
  const dispatch = useAppDispatch()
  const achievementTypeDataList = useTypedSelector(
    (state) => state.commonAchievements.achievementTypeList,
  )
  const [editAchievementId, setEditAchievementId] = useState<number>(
    editAchievementIdDefaultValue,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAchievementTypeAction = userAccessToFeatures?.find(
    (feature) => feature.name === 'Achievement Type',
  )

  const [errors, setErrors] = useState<ErrorBooleans>({
    achievementError1: false,
    achievementError2: false,
  })

  const [isEditAchievementEnabled, setEditAchievementEnabled] =
    useState<boolean>(false)

  const [displayModalContent, setDisplayModalContent] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string>(emptyString)

  const [editedValues, setEditedValues] = useState<EditedAchievementDetails>({
    newOrder: emptyString,
    newStatus: emptyString,
  })

  const setNewOrderHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValues({ ...editedValues, newOrder: e.target.value })
  }

  const setNewStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orderValue = e.target.value.replace(orderRegexValue, '')
    setEditedValues({ ...editedValues, newStatus: orderValue })
  }

  const isOrderAlreadyExistEdited = (newOrder: string) => {
    if (newOrder === emptyString) {
      return false
    }
    const isPresent = achievementTypeDataList.list.filter(
      (item) => item.order === +newOrder,
    )
    for (const isItem of isPresent) {
      if (isItem.id !== editAchievementId) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if (isOrderAlreadyExistEdited(editedValues.newOrder)) {
      setErrors({ ...errors, achievementError2: true })
    } else {
      setErrors({ ...errors, achievementError2: false })
    }
  }, [editedValues])

  useEffect(() => {
    if (
      editedValues.newOrder === emptyString ||
      editedValues.newStatus === emptyString ||
      errors.achievementError2 ||
      editedValues.newOrder === '0' ||
      editedValues.newOrder === '00'
    ) {
      setEditSaveButtonEnabled(false)
    } else {
      setEditSaveButtonEnabled(true)
    }
  }, [editedValues, errors])

  const editButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    status: boolean,
    order: number,
  ) => {
    e.preventDefault()
    setEditAchievementId(id)
    const stringStatus = status
      ? NewAchievementStatus.Active
      : NewAchievementStatus.Inactive
    setEditedValues({ newStatus: stringStatus, newOrder: order.toString() })
    const query: AchievementTypeIdQueryParameter = { typeId: id }
    setEditAchievementEnabled(true)
    dispatch(reduxServices.addAchiever.getAchievementTypeDetailsThunk(query))
  }

  const closeEditButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEditAchievementId(editAchievementIdDefaultValue)
    setEditAchievementEnabled(false)
  }

  const [selectedDeleteAchievementId, setSelectedDeleteAchievementId] =
    useState<number>(defaultAchievementTypeIdValue)

  const pageFromState = useTypedSelector(
    reduxServices.commonAchievements.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.commonAchievements.selectors.pageSizeFromState,
  )

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    achievementTypeDataList.size,
    pageSizeFromState,
    pageFromState,
  )

  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(achievementTypeDataList.list, currentPage, pageSize),
    [achievementTypeDataList.list, currentPage, pageSize],
  )

  const deleteToModalButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    achievementTypeId: number,
    achievementTypeName: string,
  ) => {
    e.preventDefault()
    setSelectedDeleteAchievementId(achievementTypeId)
    setModalContent(achievementTypeName)
    setDisplayModalContent(true)
  }

  const confirmDeleteButtonHandler = async () => {
    const query: AchievementTypeIdQueryParameter = {
      typeId: selectedDeleteAchievementId,
    }
    const result = await dispatch(
      reduxServices.addAchiever.deleteAchievementTypeThunk(query),
    )
    if (
      reduxServices.addAchiever.deleteAchievementTypeThunk.fulfilled.match(
        result,
      )
    ) {
      const successToast = (
        <OToast
          toastColor="success"
          toastMessage="Achievement Type Deleted Successfully"
        />
      )
      setDisplayModalContent(false)
      dispatch(reduxServices.app.actions.addToast(successToast))
      setModalContent(emptyString)
      dispatch(reduxServices.commonAchievements.getAllAchievementsType())
      setSelectedDeleteAchievementId(defaultAchievementTypeIdValue)
    }
  }

  const editSaveButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const orderToast = (
      <OToast toastColor="danger" toastMessage="Please enter a unique order" />
    )
    if (
      isOrderAlreadyExistEdited(editedValues.newOrder) ||
      editedValues.newOrder === emptyString
    ) {
      dispatch(reduxServices.app.actions.addToast(orderToast))
      return
    }
    executeSaveButtonHandler(editedValues)
    setEditAchievementEnabled(false)
  }

  const renderCurrentStatus = (value: boolean) => {
    return value
      ? String(NewAchievementStatus.Active).charAt(0).toUpperCase() +
          String(NewAchievementStatus.Active).slice(1)
      : String(NewAchievementStatus.Inactive).charAt(0).toUpperCase() +
          String(NewAchievementStatus.Inactive).slice(1)
  }

  const uniqueOrderTernary = (
    <p
      data-testid="unique-order-err"
      className={errors.achievementError2 ? TextDanger : TableColor}
    >
      {errorOrderMessage}
    </p>
  )

  return (
    <>
      <CTable className="mt-3 mb-3 table-layout-fixed" responsive striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Achievement Type Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-end pe-5">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems?.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
              <CTableDataCell>{item.typeName}</CTableDataCell>
              <CTableDataCell>
                {isEditAchievementEnabled && item.id === editAchievementId ? (
                  <CFormSelect
                    data-testid={`new-status-sel`}
                    size="sm"
                    value={editedValues.newStatus}
                    onChange={setNewStatusHandler}
                  >
                    <option value={NewAchievementStatus.Active}>
                      {NewAchievementStatus.Active}
                    </option>
                    <option value={NewAchievementStatus.Inactive}>
                      {NewAchievementStatus.Inactive}
                    </option>
                  </CFormSelect>
                ) : (
                  <div>{renderCurrentStatus(item.status)}</div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {isEditAchievementEnabled && item.id === editAchievementId ? (
                  <CRow data-testid="new" className="align-items-center">
                    <CCol sm={3}>
                      <CFormInput
                        data-testid="new-order"
                        type="text"
                        maxLength={2}
                        value={editedValues.newOrder}
                        size="sm"
                        onChange={setNewOrderHandler}
                      />
                    </CCol>
                    <CCol sm={5}>{uniqueOrderTernary}</CCol>
                  </CRow>
                ) : (
                  <div>{item.order}</div>
                )}
              </CTableDataCell>
              <CTableDataCell scope="row">
                <div
                  className="d-flex flex-row align-items-center justify-content-end"
                  data-testid={`user-access-${index}`}
                >
                  {isEditAchievementEnabled && editAchievementId === item.id ? (
                    <div className="button-events">
                      <CButton
                        color="success"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                        data-testid={`save-btn-${index}`}
                        onClick={editSaveButtonHandler}
                        disabled={!isEditSaveButtonEnabled}
                      >
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                      </CButton>
                      <CButton
                        color="warning"
                        className="btn-ovh btn-ovh-employee-list"
                        data-testid={`close-btn-${index}`}
                        onClick={closeEditButtonHandler}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </CButton>
                    </div>
                  ) : (
                    <div className="button-events">
                      {userAccessToAchievementTypeAction?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info"
                            className="danger btn-ovh me-1 btn-ovh-employee-list"
                            size="sm"
                            data-testid={`edit-btn-${index}`}
                            title="Edit"
                            onClick={(e) => {
                              editButtonHandler(
                                e,
                                item.id,
                                item.status,
                                item.order,
                              )
                            }}
                          >
                            <i
                              className="fa fa-edit text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccessToAchievementTypeAction?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            color="danger"
                            size="sm"
                            className="btn-ovh me-2 btn-ovh-employee-list"
                            data-testid={`del-btn-${index}`}
                            title="Delete"
                            onClick={(e) => {
                              deleteToModalButtonHandler(
                                e,
                                item.id,
                                item.typeName,
                              )
                            }}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </div>
                  )}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CRow className="mt-3">
        <CCol xs={4}>
          <p>
            <strong>Total Records: {achievementTypeDataList?.size}</strong>
          </p>
        </CCol>
        {!achievementTypeDataList?.size && (
          <CCol>
            <CRow>
              <h4 className="text-center">No Records Found...</h4>
            </CRow>
          </CCol>
        )}
        <CCol xs={3}>
          {achievementTypeDataList?.size > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {achievementTypeDataList?.size > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        alignment="center"
        visible={displayModalContent}
        setVisible={setDisplayModalContent}
        modalTitle="Delete Achievement Type"
        confirmButtonAction={confirmDeleteButtonHandler}
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
      >
        <>
          Do you really want to delete this <strong>{modalContent}</strong>
          {'  '}
          achievement type ?
        </>
      </OModal>
    </>
  )
}

export default AchievementTypeTable
