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
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  AchievementTypeIdQueryParameter,
  AddAchieverTypeTableProps,
  NewAchievementStatus,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import {
  EditedAchievementDetails,
  emptyString,
  ErrorBooleans,
  errorOrderMessage,
  orderRegexValue,
} from '../../AchievementConstants'

const defaultAchievementTypeIdValue = -1
const editAchievementIdDefaultValue = 0

const AchievementTypeTable = (
  props: AddAchieverTypeTableProps,
): JSX.Element => {
  const { executeSaveButtonHandler } = props
  const dispatch = useAppDispatch()
  const achievementTypeDataList = useTypedSelector(
    (state) => state.commonAchievements.dateSortedList,
  )
  const [editAchievementId, setEditAchievementId] = useState<number>(
    editAchievementIdDefaultValue,
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
    for (let i = 0; i < isPresent.length; i++) {
      if (isPresent[i].id !== editAchievementId) {
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

  const deleteToModalButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    achievementTypeId: number,
    achievementTypeName: string,
  ) => {
    e.preventDefault()
    setSelectedDeleteAchievementId(achievementTypeId)
    const toModalContent = `Do you really want to delete ${achievementTypeName} type?`
    setModalContent(toModalContent)
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

  const uniqueOrderTernary = errors.achievementError2 ? (
    <p data-testid="unique-order-err" className={TextDanger}>
      {errorOrderMessage}
    </p>
  ) : undefined

  return (
    <>
      <CTable
        className="mt-2 mb-2"
        responsive
        striped
        align="middle"
        role="table"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Achievement Type Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {achievementTypeDataList.list.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{index + 1}</CTableDataCell>
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
                  <div>
                    {item.status
                      ? NewAchievementStatus.Active
                      : NewAchievementStatus.Inactive}
                  </div>
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
                  className="d-flex flex-row align-items-center"
                  data-testid={`user-access-${index}`}
                >
                  {isEditAchievementEnabled && editAchievementId === item.id ? (
                    <div className="button-events">
                      <CButton
                        color="success"
                        className="btn-ovh me-1"
                        data-testid={`save-btn-${index}`}
                        onClick={editSaveButtonHandler}
                      >
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                      </CButton>
                      <CButton
                        color="warning"
                        className="btn-ovh"
                        data-testid={`close-btn-${index}`}
                        onClick={closeEditButtonHandler}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </CButton>
                    </div>
                  ) : (
                    <div className="button-events">
                      <CButton
                        color="info"
                        className="danger btn-ovh me-1"
                        size="sm"
                        data-testid={`edit-btn-${index}`}
                        title="Edit"
                        onClick={(e) => {
                          editButtonHandler(e, item.id, item.status, item.order)
                        }}
                      >
                        <i
                          className="fa fa-edit text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        className="btn-ovh me-2"
                        data-testid={`del-btn-${index}`}
                        title="Delete"
                        onClick={(e) => {
                          deleteToModalButtonHandler(e, item.id, item.typeName)
                        }}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </div>
                  )}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <OModal
        visible={displayModalContent}
        setVisible={setDisplayModalContent}
        modalSize="lg"
        alignment="center"
        modalHeaderClass="d-none"
        confirmButtonAction={confirmDeleteButtonHandler}
        confirmButtonText="Yes"
        cancelButtonText="No"
      >
        <div data-testid="confirm-modal-content">{modalContent}</div>
      </OModal>
    </>
  )
}

export default AchievementTypeTable
