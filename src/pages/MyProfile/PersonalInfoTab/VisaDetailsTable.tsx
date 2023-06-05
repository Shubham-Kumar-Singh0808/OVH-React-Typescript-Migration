/* eslint-disable consistent-return */
// Todo: remove eslint and fix error
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeeVisaDetailsTableProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { localeDateFormat } from '../../../utils/dateFormatUtils'

const VisaDetailsTable = ({
  editVisaButtonHandler,
}: EmployeeVisaDetailsTableProps): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteVisaId, setToDeleteVisaId] = useState(0)

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const getEmployeeVisaData = useTypedSelector(
    reduxServices.personalInformation.selectors.visaDetails,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.personalInformation.getEmployeeVisaDetails(
        isViewingAnotherEmployee ? selectedEmployeeId : employeeId,
      ),
    )
  }, [dispatch, employeeId, isViewingAnotherEmployee, selectedEmployeeId])

  const handleShowDeleteModal = (visaId: number) => {
    setToDeleteVisaId(visaId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteVisaDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      reduxServices.personalInformation.deleteEmployeeVisa(toDeleteVisaId),
    )
    if (
      reduxServices.personalInformation.deleteEmployeeVisa.fulfilled.match(
        deleteFamilyMemberResultAction,
      )
    ) {
      dispatch(
        reduxServices.personalInformation.getEmployeeVisaDetails(employeeId),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Visa Detail deleted successfully"
          />,
        ),
      )
    }
  }

  const sortedVisaDetails = useMemo(() => {
    if (getEmployeeVisaData) {
      return getEmployeeVisaData
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.countryName.localeCompare(sortNode2.countryName),
        )
    }
  }, [getEmployeeVisaData])

  return (
    <>
      <CTable striped responsive align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">Visa Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Issue</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Expire</CTableHeaderCell>
            {!isViewingAnotherEmployee ? (
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            ) : (
              <></>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sortedVisaDetails?.map((visaItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {visaItem.countryName}
              </CTableDataCell>
              <CTableDataCell scope="row">{visaItem.visaType}</CTableDataCell>
              <CTableDataCell scope="row">
                {localeDateFormat(visaItem.dateOfIssue)}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {localeDateFormat(visaItem.dateOfExpire)}
              </CTableDataCell>
              {!isViewingAnotherEmployee ? (
                <CTableDataCell scope="row">
                  <CTooltip content="Edit">
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                      onClick={() => editVisaButtonHandler(visaItem.id)}
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </CButton>
                  </CTooltip>
                  <CTooltip content="Delete">
                    <CButton
                      data-testid={`btn-delete${index}`}
                      size="sm"
                      color="danger btn-ovh me-1"
                      className="btn-ovh-employee-list"
                      onClick={() => handleShowDeleteModal(visaItem.id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTooltip>
                </CTableDataCell>
              ) : (
                <></>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <strong>
        {getEmployeeVisaData?.length
          ? `Total Records: ${getEmployeeVisaData?.length}`
          : `No Records found`}
      </strong>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Visa Details"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteVisaDetails}
        modalBodyClass="mt-0"
      >
        <>Do you really want to delete this ?</>
      </OModal>
    </>
  )
}
export default VisaDetailsTable
