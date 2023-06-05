import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ResignationList } from '../../../types/Separation/ResignationList/resignationListTypes'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const ResignationListTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  Select,
  employeeStatus,
  selectCurrentPage,
  selectFromDate,
  selectToDate,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  Select: string
  employeeStatus: string
  selectCurrentPage: number
  selectFromDate: string
  selectToDate: string
}): JSX.Element => {
  const [isInitiateModalVisible, setIsInitiateModalVisible] = useState(false)
  const [toInitiateSeparationId, setToInitiateSeparationId] = useState(0)

  const isLoading = useTypedSelector(
    reduxServices.resignationList.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  const location = useLocation()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Initiate CC',
  )

  const userAccessShowTimeLine = userAccessToFeatures?.find(
    (feature) => feature.name === 'ShowTimeLine',
  )

  const userAccessManagerClearance = userAccessToFeatures?.find(
    (feature) => feature.name === 'Manager Cleranace',
  )

  const userAccessITClearance = userAccessToFeatures?.find(
    (feature) => feature.name === 'IT Cleranace',
  )

  const userAccessHRClearance = userAccessToFeatures?.find(
    (feature) => feature.name === 'HR Cleranace',
  )

  const userAccessFinanceClearance = userAccessToFeatures?.find(
    (feature) => feature.name === 'Finance Cleranace',
  )

  const userAccessAdminClearance = userAccessToFeatures?.find(
    (feature) => feature.name === 'Admin Cleranace',
  )

  const getAllResignationList = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListDetails,
  )
  const resignationListSize = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListSize,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowInitiateResignationModal = (separationId: number) => {
    setToInitiateSeparationId(separationId)
    setIsInitiateModalVisible(true)
  }

  const resignationHistoryButtonHandler = (separationId: number) => {
    dispatch(reduxServices.resignationList.getSeparationTimeLine(separationId))
  }

  const resignationClearanceManagerButtonHandler = (separationId: number) => {
    dispatch(reduxServices.resignationList.getSeparationTimeLine(separationId))
    dispatch(
      reduxServices.resignationList.getClearanceDetails({
        separationId,
        submittedBy: 'Manager',
      }),
    )
  }

  const resignationHRClearanceHandler = (separationId: number) => {
    dispatch(reduxServices.resignationList.getSeparationTimeLine(separationId))
    dispatch(
      reduxServices.resignationList.getClearanceDetails({
        separationId,
        submittedBy: 'HR',
      }),
    )
  }

  const resignationITClearanceHandler = (separationId: number) => {
    dispatch(reduxServices.resignationList.getSeparationTimeLine(separationId))
    dispatch(
      reduxServices.resignationList.getClearanceDetails({
        separationId,
        submittedBy: 'IT',
      }),
    )
  }

  const resignationFinanceClearanceHandler = (separationId: number) => {
    dispatch(reduxServices.resignationList.getSeparationTimeLine(separationId))
    dispatch(
      reduxServices.resignationList.getClearanceDetails({
        separationId,
        submittedBy: 'Finance',
      }),
    )
  }

  const resignationAdminClearanceHandler = (separationId: number) => {
    dispatch(reduxServices.resignationList.getSeparationTimeLine(separationId))
    dispatch(
      reduxServices.resignationList.getClearanceDetails({
        separationId,
        submittedBy: 'Admin',
      }),
    )
  }

  const handleConfirmInitiateResignation = async () => {
    setIsInitiateModalVisible(false)
    const initiateResignationResultAction = await dispatch(
      reduxServices.resignationList.resignationIntitiateCC(
        toInitiateSeparationId,
      ),
    )
    if (
      reduxServices.resignationList.resignationIntitiateCC.fulfilled.match(
        initiateResignationResultAction,
      )
    ) {
      dispatch(
        reduxServices.resignationList.getResignationList({
          dateSelection: Select || '',
          empStatus: employeeStatus || '',
          endIndex: pageSize * selectCurrentPage,
          from: selectFromDate
            ? new Date(selectFromDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '',
          multiplesearch: '',
          startIndex: pageSize * (selectCurrentPage - 1),
          status: status || 'All',
          to: selectToDate
            ? new Date(selectToDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '',
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Exit process initiated Successfully"
          />,
        ),
      )
    }
  }
  useEffect(() => {
    if (location.pathname === '/resignationList') {
      dispatch(reduxServices.resignationList.actions.toggle(''))
      dispatch(reduxServices.resignationList.actions.removeClearanceDetails())
    }
  }, [location.pathname])

  const resignationButtonHandler = (resignationItem: ResignationList) => {
    return (
      <>
        {resignationItem.isprocessInitiated ? (
          <>
            {userAccessManagerClearance?.viewaccess && (
              <Link to={`/ClearanceCertificateManager`}>
                <CTooltip content="Manager">
                  <CButton
                    size="sm"
                    className={resignationItem.managerCcCss}
                    data-testid="manager-test"
                    onClick={() =>
                      resignationClearanceManagerButtonHandler(
                        resignationItem.separationId,
                      )
                    }
                  >
                    <i className="fa fa-user text-white"></i>
                  </CButton>
                </CTooltip>
              </Link>
            )}
            {userAccessITClearance?.viewaccess && (
              <Link to={`/ClearanceCertificateIT`}>
                <CTooltip content="IT">
                  <CButton
                    size="sm"
                    className={resignationItem.itCcCss}
                    onClick={() =>
                      resignationITClearanceHandler(
                        resignationItem.separationId,
                      )
                    }
                  >
                    <i className="fa fa-laptop text-white"></i>
                  </CButton>
                </CTooltip>
              </Link>
            )}
            {userAccessFinanceClearance?.viewaccess && (
              <Link to={`/ClearanceCertificateFinance`}>
                <CTooltip content="Finance">
                  <CButton
                    size="sm"
                    className={resignationItem.finanaceCcCss}
                    onClick={() =>
                      resignationFinanceClearanceHandler(
                        resignationItem.separationId,
                      )
                    }
                  >
                    <i className="fa fa-calculator text-white"></i>
                  </CButton>
                </CTooltip>
              </Link>
            )}
            {userAccessAdminClearance?.viewaccess && (
              <Link to={`/ClearanceCertificateAdmin`}>
                <CTooltip content="Admin">
                  <CButton
                    size="sm"
                    className={resignationItem.adminCcCss}
                    onClick={() =>
                      resignationAdminClearanceHandler(
                        resignationItem.separationId,
                      )
                    }
                  >
                    <i className="fa fa-id-badge text-white"></i>
                  </CButton>
                </CTooltip>
              </Link>
            )}
            {userAccessHRClearance?.viewaccess && (
              <Link to={`/ClearanceCertificateHR`}>
                <CTooltip content="HR">
                  <CButton
                    size="sm"
                    className={resignationItem.hrCcCss}
                    onClick={() =>
                      resignationHRClearanceHandler(
                        resignationItem.separationId,
                      )
                    }
                  >
                    <i className="fa fa-user-circle text-white"></i>
                  </CButton>
                </CTooltip>
              </Link>
            )}
          </>
        ) : (
          userAccess?.viewaccess && (
            <CTooltip content="Initiate">
              <CButton
                color="#34b2e7"
                size="sm"
                className="resignation-initiate-btn"
                data-testid="initiate-btn"
                onClick={() =>
                  handleShowInitiateResignationModal(
                    resignationItem?.separationId,
                  )
                }
              >
                <i className="fa fa-clock-o  text-white"></i>
              </CButton>
            </CTooltip>
          )
        )}
      </>
    )
  }
  return (
    <>
      <>
        <CTable striped className="mt-3">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Resignation Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Relieving Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Primary Reason</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Resignation Status
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {isLoading !== ApiLoadingState.loading ? (
              getAllResignationList &&
              getAllResignationList?.map((resignationItem, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">
                      {getItemNumber(index)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {resignationItem.employeeId}
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${resignationItem.employeeId}`}
                        className="employee-name"
                        data-testid={`employee-profile-link${index}`}
                      >
                        {resignationItem.employeeName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      {resignationItem.managerName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {resignationItem.resignationDate}
                    </CTableDataCell>
                    <CTableDataCell>
                      {resignationItem.relievingDate}
                    </CTableDataCell>
                    <CTableDataCell>
                      {resignationItem.primaryReasonName}
                    </CTableDataCell>
                    <CTableDataCell>{resignationItem.status}</CTableDataCell>
                    <CTableDataCell>{resignationItem.empStatus}</CTableDataCell>
                    <CTableDataCell data-testid="action-cell">
                      <div className="sh-btn-group resign-btn">
                        {userAccessShowTimeLine?.viewaccess && (
                          <Link to={`/managerComments?`}>
                            <CTooltip content="Timeline">
                              <CButton
                                color="info"
                                className="btn-ovh-employee-list"
                                data-testid="history-btn"
                                onClick={() =>
                                  resignationHistoryButtonHandler(
                                    resignationItem.separationId,
                                  )
                                }
                              >
                                <i
                                  className="fa fa-bar-chart text-white"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            </CTooltip>
                          </Link>
                        )}
                        {resignationItem.status === 'Relieved' ? (
                          <></>
                        ) : (
                          resignationButtonHandler(resignationItem)
                        )}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </CTableBody>
          <OModal
            alignment="center"
            visible={isInitiateModalVisible}
            setVisible={setIsInitiateModalVisible}
            modalTitle="initiate resignation"
            modalHeaderClass="d-none"
            confirmButtonText="Yes"
            cancelButtonText="No"
            confirmButtonAction={handleConfirmInitiateResignation}
          >
            {`Do you really want to initiate the separation process?`}
          </OModal>
        </CTable>
        {getAllResignationList?.length ? (
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {resignationListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {resignationListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {resignationListSize > 20 && (
              <CCol
                xs={5}
                className="gap-1 d-grid d-md-flex justify-content-md-end"
              >
                <OPagination
                  currentPage={currentPage}
                  pageSetter={setCurrentPage}
                  paginationRange={paginationRange}
                />
              </CCol>
            )}
          </CRow>
        ) : (
          <CCol>
            <CRow className="mt-4 ms-3">
              <h5>No Records Found... </h5>
            </CRow>
          </CCol>
        )}
      </>
    </>
  )
}
export default ResignationListTable
