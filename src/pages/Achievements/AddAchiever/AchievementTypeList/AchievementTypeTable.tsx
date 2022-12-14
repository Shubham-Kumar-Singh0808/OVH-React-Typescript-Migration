import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AchievementTypeIdQueryParameter } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'

const defaultAchievementTypeIdValue = -1
const AchievementTypeTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const achievementTypeDataList = useTypedSelector(
    (state) => state.commonAchievements.dateSortedList,
  )

  const [displayModalContent, setDisplayModalContent] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string>('')
  const [selectedAchievementId, setSelectedAchievementId] = useState<number>(
    defaultAchievementTypeIdValue,
  )

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
                {item.status ? 'Active' : 'Inactive'}
              </CTableDataCell>
              <CTableDataCell>{item.order}</CTableDataCell>
              <CTableDataCell scope="row">
                <div
                  className="d-flex flex-row align-items-center"
                  data-testid={`user-access-${index}`}
                >
                  <div className="button-events">
                    <CButton
                      color="info"
                      className="danger btn-ovh me-1"
                      size="sm"
                      data-testid={`timeline-btn-${index}`}
                      title="Edit"
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
