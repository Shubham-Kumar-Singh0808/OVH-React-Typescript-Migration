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

const ResignationListTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
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

  const userAccessManagerClearence = userAccessToFeatures?.find(
    (feature) => feature.name === 'Manager Cleranace',
  )

  const getAllResignationList = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListDetails,
  )
  const resignationListSize = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListSize,
  )

  useEffect(() => {
    dispatch(
      reduxServices.resignationList.getResignationList({
        dateSelection: '',
        empStatus: '',
        endIndex: pageSize * currentPage,
        from: '',
        multiplesearch: '',
        startIndex: pageSize * (currentPage - 1),
        status: 'ALL',
        to: '',
      }),
    )
  }, [dispatch, pageSize, currentPage])
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
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
    dispatch(reduxServices.resignationList.actions.toggle(''))
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
          dateSelection: '',
          empStatus: '',
          endIndex: pageSize * currentPage,
          from: '',
          multiplesearch: '',
          startIndex: pageSize * (currentPage - 1),
          status: 'ALL',
          to: '',
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
    }
  }, [location.pathname])
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
                    <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      {resignationItem.employeeId}
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${resignationItem.employeeId}`}
                        className="employee-name"
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
                            <CButton
                              color="info"
                              className="btn-ovh me-2"
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
                          </Link>
                        )}
                        {resignationItem.isprocessInitiated ? (
                          <>
                            {userAccessManagerClearence?.viewaccess && (
                              <Link to={`/ClearanceCertificateManager`}>
                                <CButton
                                  size="sm"
                                  className={resignationItem.managerCcCss}
                                  onClick={() =>
                                    resignationClearanceManagerButtonHandler(
                                      resignationItem.separationId,
                                    )
                                  }
                                >
                                  <i className="fa fa-user text-white"></i>
                                </CButton>
                              </Link>
                            )}
                            <CButton
                              size="sm"
                              className={resignationItem.itCcCss}
                            >
                              <i className="fa fa-laptop text-white"></i>
                            </CButton>
                            <CButton
                              size="sm"
                              className={resignationItem.finanaceCcCss}
                            >
                              <i className="fa fa-calculator text-white"></i>
                            </CButton>
                            <CButton
                              size="sm"
                              className={resignationItem.adminCcCss}
                            >
                              <i className="fa fa-id-badge text-white"></i>
                            </CButton>
                            <Link to={`/ClearanceCertificateHR`}>
                              <CButton
                                size="sm"
                                className={resignationItem.hrCcCss}
                              >
                                <i className="fa fa-user-circle text-white"></i>
                              </CButton>
                            </Link>
                          </>
                        ) : (
                          userAccess?.viewaccess && (
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
                          )
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
