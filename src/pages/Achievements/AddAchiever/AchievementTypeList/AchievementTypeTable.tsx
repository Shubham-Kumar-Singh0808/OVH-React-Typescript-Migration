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
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  AchievementTypeIdQueryParameter,
  NewAchievementStatus,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AchievementType } from '../../../../types/Achievements/commonAchievementTypes'
import { errorOrderMessage } from '../../AchievementConstants'

const defaultAchievementTypeIdValue = -1
const editAchievementIdDefaultValue = 0
type EditedAchievementDetails = {
  newStatus: undefined | string
  newOrder: undefined | number
}
const AchievementTypeTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const achievementTypeDataList = useTypedSelector(
    (state) => state.commonAchievements.dateSortedList,
  )
  const [editAchievementId, setEditAchievementId] = useState<number>(
    editAchievementIdDefaultValue,
  )

  const [isEditAchievementEnabled, setEditAchievementEnabled] =
    useState<boolean>(false)
  const [displayModalContent, setDisplayModalContent] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string>('')
  const [selectedAchievementId, setSelectedAchievementId] = useState<number>(
    defaultAchievementTypeIdValue,
  )

  const [editedValues, setEditedValues] = useState<EditedAchievementDetails>({
    newOrder: undefined,
    newStatus: undefined,
  })

  const setNewOrderHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValues({ ...editedValues, newOrder: +e.target.value })
  }

  const setNewStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedValues({ ...editedValues, newStatus: e.target.value })
  }

  const isOrderAlreadyExist = (newOrder: number) => {
    const isPresent = achievementTypeDataList.list.filter(
      (item) => item.order === newOrder,
    )
    return isPresent.length > 1
  }

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
    setEditedValues({ newStatus: stringStatus, newOrder: order })
    const query: AchievementTypeIdQueryParameter = { typeId: id }
    setEditAchievementEnabled(true)
    dispatch(reduxServices.addAchiever.getAchievementTypeDetailsThunk(query))
  }

  const closeEditButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEditAchievementId(editAchievementIdDefaultValue)
    setEditAchievementEnabled(false)
  }

  // const editStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {

  // }

  const deleteToModalButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    achievementTypeId: number,
    achievementTypeName: string,
  ) => {
    e.preventDefault()
    setSelectedAchievementId(achievementTypeId)
    const toModalContent = `Do you really want to delete ${achievementTypeName} type?`
    setModalContent(toModalContent)
    setDisplayModalContent(true)
  }

  const confirmDeleteButtonHandler = async () => {
    const query: AchievementTypeIdQueryParameter = {
      typeId: selectedAchievementId,
    }
    console.log(query)
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
      dispatch(reduxServices.commonAchievements.getAllAchievementsType())
      setSelectedAchievementId(defaultAchievementTypeIdValue)
    }
  }

  return (
    <>
      <CTable className="mt-2 mb-2" responsive striped align="middle">
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
                    size="sm"
                    value={
                      item.status
                        ? NewAchievementStatus.Active
                        : NewAchievementStatus.Inactive
                    }
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
                  <div>
                    <CCol sm={3}>
                      <CFormInput
                        value={editedValues.newOrder}
                        size="sm"
                        onChange={setNewOrderHandler}
                      />
                    </CCol>
                    <CCol sm={4}>
                      {isOrderAlreadyExist(editedValues.newOrder!)
                        ? errorOrderMessage
                        : undefined}
                    </CCol>
                  </div>
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
                      <CButton color="success" className="btn-ovh me-1">
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                      </CButton>
                      <CButton
                        color="warning"
                        className="btn-ovh"
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
                        data-testid={`timeline-btn-${index}`}
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
                        data-testid={`timeline-btn-${index}`}
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
        <div>{modalContent}</div>
      </OModal>
    </>
  )
}

export default AchievementTypeTable
