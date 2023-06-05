import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
  CLink,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import { Link, useParams } from 'react-router-dom'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { usePagination } from '../../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'
import OModal from '../../../../../components/ReusableComponent/OModal'
import { MileStoneResponse } from '../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

const MileStoneTable = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalCommentVisible, setIsModalCommentsVisible] = useState(false)
  const [subject, setSubject] = useState<string>()
  const [title, setTitle] = useState({} as MileStoneResponse)
  const mileStoneList = useTypedSelector(
    reduxServices.projectMileStone.selectors.projectMileStone,
  )
  const mileStoneListSize = useTypedSelector(
    reduxServices.projectMileStone.selectors.projectMileStoneSize,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(mileStoneListSize, 20)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const handleModal = (comments: string) => {
    setIsModalCommentsVisible(true)
    setSubject(comments)
  }

  const handleTitleModal = (titleItem: MileStoneResponse) => {
    setIsModalVisible(true)
    setTitle(titleItem)
  }
  useEffect(() => {
    dispatch(
      reduxServices.projectMileStone.getProjectMileStone({
        endIndex: pageSize * currentPage,
        firstIndex: pageSize * (currentPage - 1),
        projectid: projectId,
      }),
    )
  }, [dispatch])

  const result = (
    <>
      <h4 className="mb-4">Milestone Details</h4>
      <CTable className="milestone-model-table">
        <CTableBody>
          <CTableRow>
            <CTableDataCell>Project:</CTableDataCell>
            <CTableDataCell>{title.project}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Client:</CTableDataCell>
            <CTableDataCell>{title.client}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Milestone:</CTableDataCell>
            <CTableDataCell>{title.title}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Percentage:</CTableDataCell>
            <CTableDataCell>{title.milestonePercentage}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Effort:</CTableDataCell>
            <CTableDataCell>{title.effort || 'N/A'}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Planned End Date:</CTableDataCell>
            <CTableDataCell>{title.planedDate || 'N/A'}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Actual End Date:</CTableDataCell>
            <CTableDataCell>{title.actualDate || 'N/A'}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Comments:</CTableDataCell>
            <CTableDataCell>{title.comments || 'N/A'}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
  const mileStoneHistoryButtonHandler = (id: number) => {
    dispatch(reduxServices.projectMileStone.mileStoneTimeLine(id))
  }

  const mileStoneDiscussionButtonHandler = (id: number) => {
    dispatch(reduxServices.projectMileStone.getMilestone(id))
    dispatch(
      reduxServices.projectMileStone.getMilestoneNewsFeed({
        milestoneId: id,
        projectid: String(projectId),
      }),
    )
  }
  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">CR Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Effort</CTableHeaderCell>
            <CTableHeaderCell scope="col">Planned End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actual End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Billable</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            mileStoneList.length > 0 &&
            mileStoneList?.map((item, index) => {
              const commentsLimit =
                item.comments && item.comments.length > 30
                  ? `${item.comments.substring(0, 30)}...`
                  : item.comments

              const titleLimit =
                item.title && item.title.length > 30
                  ? `${item.title.substring(0, 30)}...`
                  : item.title
              const billable = item.billable ? 'Yes' : 'No'
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  {titleLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid="title-test"
                        onClick={() => handleTitleModal(item)}
                      >
                        {parse(titleLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell>{item.crName || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.effort || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.planedDate}</CTableDataCell>
                  <CTableDataCell>{item.actualDate}</CTableDataCell>
                  <CTableDataCell>{billable}</CTableDataCell>
                  <CTableDataCell>{item.milestonePercentage}%</CTableDataCell>
                  {commentsLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid="comments-test"
                        onClick={() => handleModal(item.comments)}
                      >
                        {parse(commentsLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell>
                    <CTooltip content="Edit">
                      <CButton
                        color="danger"
                        className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                        data-testid="edit-btn"
                      >
                        <i className="fa fa-times text-white"></i>
                      </CButton>
                    </CTooltip>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </CButton>
                    <Link to={`/milestonehistory/${item.id}`}>
                      <CButton
                        color="info"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                        onClick={() => mileStoneHistoryButtonHandler(item.id)}
                      >
                        <i className="fa fa-bar-chart text-white"></i>
                      </CButton>
                    </Link>
                    <Link to={`/milestoneNewsFeed/${item.id}`}>
                      <CButton
                        color="info"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                        onClick={() =>
                          mileStoneDiscussionButtonHandler(item.id)
                        }
                      >
                        <i className="fa fa-comments text-white"></i>
                      </CButton>
                    </Link>
                    <CButton
                      color="danger"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {mileStoneList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {mileStoneListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {mileStoneListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {mileStoneListSize > 20 && (
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
      <>
        <OModal
          modalSize="lg"
          alignment="center"
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
          modalBodyClass="model-body-text-alinement"
          visible={isModalCommentVisible}
          setVisible={setIsModalCommentsVisible}
        >
          <>
            <p>
              <span className="descriptionField">
                <div
                  dangerouslySetInnerHTML={{
                    __html: subject as string,
                  }}
                />
              </span>
            </p>
          </>
        </OModal>
      </>
      <>
        <OModal
          modalSize="lg"
          alignment="center"
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
          modalBodyClass="model-body-text-alinement"
          visible={isModalVisible}
          setVisible={setIsModalVisible}
        >
          {result}
        </OModal>
      </>
    </>
  )
}

export default MileStoneTable
