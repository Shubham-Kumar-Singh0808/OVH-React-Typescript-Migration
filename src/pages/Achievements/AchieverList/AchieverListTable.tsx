import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CRow,
  CCol,
  CTableBody,
  CTableDataCell,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import AchieverListToggle from './AchieverListToggle'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import {
  AchievementHistoryTimelineQueryParameters,
  AchieverListTableTypes,
} from '../../../types/Achievements/AchieverList/AchieverListTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { baseImageExtension } from '../AchievementConstants'
import OToast from '../../../components/ReusableComponent/OToast'

const AchieverListTable = (props: AchieverListTableTypes): JSX.Element => {
  const dispatch = useAppDispatch()
  const achieverListState = useTypedSelector((state) => state.achieverList)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteAchievementId, setToDeleteAchievementId] = useState(0)
  const [isDescriptionModelVisible, setDescriptionModel] =
    useState<boolean>(false)
  const [descriptionContent, setDescriptionContent] = useState<string>('')
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
    setAchievementTimeline,
    ToggleTimelineAccess,
  } = props

  const handleDescriptionClick = (desc: string) => {
    setDescriptionContent(desc)
    setDescriptionModel(true)
  }

  const timelineClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: AchievementHistoryTimelineQueryParameters,
  ) => {
    e.preventDefault()
    dispatch(reduxServices.achieverList.getAchievementHistoryTimeline(data))
    setAchievementTimeline(true)
  }

  const handlePageSizeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(e.target.value))
    setCurrentPage(1)
  }
  const handleShowDeleteModal = (achievementId: number) => {
    setIsDeleteModalVisible(true)
    setToDeleteAchievementId(achievementId)
  }

  const handleConfirmDeleteAchiever = async () => {
    setIsDeleteModalVisible(false)
    const deleteAchieverResultAction = await dispatch(
      reduxServices.achieverList.deleteAchievement(toDeleteAchievementId),
    )
    if (
      reduxServices.achieverList.deleteAchievement.fulfilled.match(
        deleteAchieverResultAction,
      )
    ) {
      dispatch(
        reduxServices.achieverList.getAllAchieverList({
          achievementTypeId: '',
          dateSelection: '',
          endIndex: 20,
          fromMonth: 0,
          fromYear: 0,
          startIndex: 0,
          toMonth: 0,
          toYear: 0,
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Achievement deleted successfully"
          />,
        ),
      )
    }
  }

  return (
    <>
      <>
        <CTable className="text-center mt-4" align="middle" responsive striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Achievement Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">From Month</CTableHeaderCell>
              <CTableHeaderCell scope="col">To Month</CTableHeaderCell>
              <CTableHeaderCell scope="col">Time Period (yr)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
              {ToggleTimelineAccess === true ? (
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              ) : (
                <></>
              )}
            </CTableRow>
          </CTableHead>
          {achieverListState.isLoading !== ApiLoadingState.loading ? (
            <CTableBody>
              {achieverListState.achieverList.list.map((item, index) => {
                const removeTag = '/(<([^>]+)>)/gi'
                const removeSpaces = item.description?.replace(removeTag, '')
                const descLimit =
                  removeSpaces && removeSpaces.length > 30
                    ? `${removeSpaces.substring(0, 30)}...`
                    : removeSpaces
                const imageUrl = item.profilePicture
                const baseUrl = baseImageExtension
                const url = new URL(imageUrl, baseUrl)
                const finalImageUrl = url.href
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">
                      <div>
                        <img
                          className="rounded-circle img-responsive"
                          src={finalImageUrl}
                          alt={item.employeeName}
                          width={35}
                        />
                      </div>
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {item.employeeName}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {item.achievementType}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {item.startDate ? item.startDate : 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {item.endDate ? item.endDate : 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {item.timePeriod ? item.timePeriod : 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {descLimit ? (
                        <div
                          className="text-info cursor-pointer"
                          // role="button"
                          data-testid={`description-${index}`}
                          onClick={() => {
                            handleDescriptionClick(item?.description as string)
                          }}
                        >
                          {parse(descLimit)}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    {ToggleTimelineAccess === true ? (
                      <CTableDataCell scope="row">
                        <div
                          className="d-flex flex-row align-items-center"
                          data-testid={`user-access-${index}`}
                          style={{ width: '125px' }}
                        >
                          <AchieverListToggle achieverItem={item} />
                          <div className="button-events">
                            <CTooltip content="Timeline">
                              <CButton
                                color="info"
                                className="btn-ovh me-2 btn-ovh-employee-list"
                                data-testid={`timeline-btn-${index}`}
                                title="Timeline"
                                onClick={(
                                  e: React.MouseEvent<HTMLButtonElement>,
                                ) => {
                                  timelineClickHandler(e, {
                                    achievementId: item.id,
                                  })
                                }}
                              >
                                <i
                                  className="fa fa-bar-chart text-white"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            </CTooltip>
                          </div>
                          <CTooltip content="Delete">
                            <CButton
                              data-testid="delete-family"
                              size="sm"
                              color="danger btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() => handleShowDeleteModal(item.id)}
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        </div>
                      </CTableDataCell>
                    ) : (
                      <></>
                    )}
                  </CTableRow>
                )
              })}
            </CTableBody>
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTable>
        <CRow className="mt-3">
          <CCol md={3} className="pull-left">
            <strong data-testid="record-number">
              {achieverListState.achieverList?.size
                ? `Total Records: ${achieverListState.achieverList.size}`
                : `No Records Found...`}
            </strong>
          </CCol>
          <CCol xs={3}>
            {achieverListState.achieverList.size > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {achieverListState.achieverList.size > 20 && (
            <CCol
              xs={5}
              className="col-6 d-grid d-md-flex justify-content-md-end"
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
          visible={isDescriptionModelVisible}
          setVisible={setDescriptionModel}
          modalSize="lg"
          alignment="center"
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
        >
          {/* <div data-testid="modal-txt">{descriptionContentTernary}</div> */}
          <span className="descriptionField">
            <div
              dangerouslySetInnerHTML={{
                __html: descriptionContent,
              }}
            />
          </span>
        </OModal>
        <OModal
          alignment="center"
          visible={isDeleteModalVisible}
          setVisible={setIsDeleteModalVisible}
          modalTitle="Family Details"
          confirmButtonText="Yes"
          cancelButtonText="No"
          closeButtonClass="d-none"
          confirmButtonAction={handleConfirmDeleteAchiever}
          modalBodyClass="mt-0"
        >
          <>Do you really want to delete this achievement ?</>
        </OModal>
      </>
    </>
  )
}

export default AchieverListTable
