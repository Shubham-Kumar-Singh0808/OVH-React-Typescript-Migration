import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useMemo, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector, useAppDispatch } from '../../../../stateStore'
import { InitiateCycleTableProps } from '../../../../types/Settings/InitiateCycle/initiateCycleTypes'
import { currentPageData } from '../../../../utils/paginationUtils'

const AddQuestionTable = ({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: InitiateCycleTableProps): JSX.Element => {
  const [isQuestionModalVisible, setIsQuestionModalVisible] =
    useState<boolean>(false)
  const [questionPopUp, setQuestionPopUp] = useState<string>('')
  const [isDeleteQuestionModalVisible, setIsDeleteQuestionModalVisible] =
    useState(false)
  const [deleteQuestion, setDeleteQuestion] = useState('')
  const [deleteQuestionId, setDeleteQuestionId] = useState(0)

  const allQuestionsList = useTypedSelector(
    reduxServices.initiateCycle.selectors.allQuestions,
  )

  const questionsListSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const allRecords = allQuestionsList?.list?.length
    ? `Total Records: ${questionsListSize}`
    : `No Records found...`

  const handleDescriptionModal = (value: string) => {
    setIsQuestionModalVisible(true)
    setQuestionPopUp(value)
  }

  const dispatch = useAppDispatch()

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const deleteQuestionBtnHandler = (id: number, question: string) => {
    setIsDeleteQuestionModalVisible(true)
    setDeleteQuestionId(id)
    setDeleteQuestion(question)
  }

  const deleteSuccessToastMessage = (
    <OToast toastMessage="Question deleted successfully" toastColor="success" />
  )

  const confirmDeleteQuestion = async () => {
    setIsDeleteQuestionModalVisible(false)
    const deleteQuestionResult = await dispatch(
      reduxServices.initiateCycle.deleteQuestion(deleteQuestionId),
    )
    if (
      reduxServices.initiateCycle.deleteQuestion.fulfilled.match(
        deleteQuestionResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastMessage))
      dispatch(reduxServices.initiateCycle.getAllQuestions())
    }
  }
  const currentTotalRecords = useMemo(
    () => currentPageData(allQuestionsList?.list, currentPage, pageSize),
    [allQuestionsList?.list, currentPage, pageSize],
  )

  const getPageIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const sorting = useMemo(() => {
    if (currentTotalRecords) {
      return currentTotalRecords
        ?.slice()
        .sort((sortNode1, sortNode2) => sortNode2.id - sortNode1.id)
    }
    return []
  }, [currentTotalRecords])

  return (
    <>
      <CTable responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Question</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-middle">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sorting?.length > 0 &&
            sorting?.map((currentItem, index) => {
              const removingSpacesOfText = currentItem.question
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const limitOfQuestion =
                removingSpacesOfText && removingSpacesOfText.length > 30
                  ? `${removingSpacesOfText.substring(0, 30)}...`
                  : removingSpacesOfText
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getPageIndex(index)}</CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {currentItem.question ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="question-link"
                        onClick={() =>
                          handleDescriptionModal(currentItem.question)
                        }
                      >
                        {parse(limitOfQuestion)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell className="text-middle ms-2">
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        onClick={() =>
                          deleteQuestionBtnHandler(
                            currentItem.id,
                            currentItem.question,
                          )
                        }
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{allRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {questionsListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isQuestionModalVisible}
        setVisible={setIsQuestionModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <span className="descriptionField">
          <p
            dangerouslySetInnerHTML={{
              __html: questionPopUp,
            }}
          />
        </span>
      </OModal>
      <OModal
        alignment="center"
        visible={isDeleteQuestionModalVisible}
        setVisible={setIsDeleteQuestionModalVisible}
        modalTitle="Delete Question"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteQuestion}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong>{deleteQuestion}</strong>{' '}
          Question ?
        </>
      </OModal>
    </>
  )
}
export default AddQuestionTable
