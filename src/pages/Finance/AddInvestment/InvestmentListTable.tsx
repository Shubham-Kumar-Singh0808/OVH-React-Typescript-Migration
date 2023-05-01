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
import React, { useEffect, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { currentPageData } from '../../../utils/paginationUtils'
import { Investment } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const InvestmentListTable = ({
  editInvestmentButtonHandler,
}: {
  editInvestmentButtonHandler: (editInvestmentData: Investment) => void
}): JSX.Element => {
  const [isDescModalVisible, setIsDescModalVisible] = useState(false)
  const [description, setDescription] = useState<string>('')
  const investments = useTypedSelector(
    reduxServices.itDeclarationList.selectors.investments,
  )
  const pageFromState = useTypedSelector(
    reduxServices.itDeclarationList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.itDeclarationList.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()
  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(investments.length, pageSizeFromState, pageFromState)

  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])

  const [isDeleteInvestmentModalVisible, setIsDeleteInvestmentModalVisible] =
    useState(false)
  const [toDeleteInvestmentName, setToDeleteInvestmentName] = useState('')
  const [investmentId, setInvestmentId] = useState(0)

  const handleSectionsPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(selectCurrentPage)
  }

  const getInvestmentItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowSectionDeleteModal = (id: number, sectionName: string) => {
    setInvestmentId(id)
    setToDeleteInvestmentName(sectionName)
    setIsDeleteInvestmentModalVisible(true)
  }

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="Investment Deleted Successfully."
    />
  )

  const handleConfirmDeleteInvestment = async () => {
    setIsDeleteInvestmentModalVisible(false)

    const deleteInvestmentResultAction = await dispatch(
      reduxServices.itDeclarationList.deleteInvestment(investmentId),
    )
    if (
      reduxServices.itDeclarationList.deleteInvestment.fulfilled.match(
        deleteInvestmentResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      dispatch(reduxServices.itDeclarationList.getSections())
      dispatch(reduxServices.itDeclarationList.getInvestments())
    }
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToSectionActions = userAccessToFeatures?.find(
    (feature) => feature.name === 'Investment',
  )

  const currentPageItems = useMemo(
    () => currentPageData(investments, currentPage, pageSize),
    [investments, currentPage, pageSize],
  )

  const handleDescriptionModal = (investmentDescription: string) => {
    setIsDescModalVisible(true)
    setDescription(investmentDescription)
  }

  const sortedSectionName = useMemo(() => {
    if (currentPageItems) {
      return currentPageItems
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.sectionName.localeCompare(sortNode2.sectionName),
        )
    }
    return []
  }, [currentPageItems])

  return (
    <>
      <CTable striped responsive align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Section</CTableHeaderCell>
            <CTableHeaderCell scope="col">Investment</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Required Documents</CTableHeaderCell>
            <CTableHeaderCell scope="col">Limits</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sortedSectionName.map((investmentItem, index) => {
            const removeTag = '/(<([^>]+)>)/gi'
            const removeDescSpaces = investmentItem.description?.replace(
              removeTag,
              '',
            )
            const descriptionLimit =
              removeDescSpaces && removeDescSpaces.length > 30
                ? `${removeDescSpaces.substring(0, 30)}...`
                : removeDescSpaces
            const removeDocSpaces = investmentItem.requiredDocs?.replace(
              removeTag,
              '',
            )
            const reqDocumentsLimit =
              removeDocSpaces && removeDocSpaces.length > 30
                ? `${removeDocSpaces.substring(0, 30)}...`
                : removeDocSpaces
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {getInvestmentItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell scope="row">
                  {investmentItem.sectionName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {investmentItem.investmentName}
                </CTableDataCell>
                {descriptionLimit ? (
                  <CTableDataCell
                    scope="row"
                    className="commentWidth sh-organization-link"
                  >
                    <CLink
                      className="cursor-pointer text-primary centerAlignment-text"
                      data-testid={`desc-comments${index}`}
                      onClick={() =>
                        handleDescriptionModal(investmentItem.description)
                      }
                    >
                      {parse(descriptionLimit)}
                    </CLink>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>{`N/A`}</CTableDataCell>
                )}
                {reqDocumentsLimit ? (
                  <CTableDataCell
                    scope="row"
                    className="commentWidth sh-organization-link"
                  >
                    <CLink
                      className="cursor-pointer text-primary centerAlignment-text"
                      data-testid={`req-docs-desc${index}`}
                      onClick={() =>
                        handleDescriptionModal(investmentItem.requiredDocs)
                      }
                    >
                      {parse(reqDocumentsLimit)}
                    </CLink>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>{`N/A`}</CTableDataCell>
                )}
                <CTableDataCell scope="row">
                  {investmentItem.maxLimit?.toLocaleString('en-IN') || '0'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {userAccessToSectionActions?.updateaccess && (
                    <CTooltip content="Edit">
                      <CButton
                        size="sm"
                        color="info"
                        className="btn-ovh me-1 btn-sm btn-ovh-employee-list"
                        data-testid={`investment-edit-btn${index}`}
                        onClick={() =>
                          editInvestmentButtonHandler({
                            description: investmentItem.description,
                            investmentId: investmentItem.investmentId,
                            investmentName: investmentItem.investmentName,
                            maxLimit: investmentItem.maxLimit,
                            requiredDocs: investmentItem.requiredDocs,
                            sectionName: investmentItem.sectionName,
                            sectionId: investmentItem.sectionId,
                          })
                        }
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTooltip>
                  )}
                  {userAccessToSectionActions?.deleteaccess && (
                    <CTooltip content="Delete">
                      <CButton
                        size="sm"
                        data-testid={`investment-delete-btn${index}`}
                        color="danger"
                        className="btn-ovh me-1 btn-sm btn-ovh-employee-list"
                        onClick={() =>
                          handleShowSectionDeleteModal(
                            investmentItem.investmentId,
                            investmentItem.investmentName,
                          )
                        }
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {investments.length
              ? `Total Records: ${investments.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {investments.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handleSectionsPageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {investments.length > 20 && (
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
        visible={isDeleteInvestmentModalVisible}
        setVisible={setIsDeleteInvestmentModalVisible}
        modalTitle="Delete Investment"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteInvestment}
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteInvestmentName}</strong> Investment?
        </>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isDescModalVisible}
        setVisible={setIsDescModalVisible}
      >
        <span className="descriptionField">
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </span>
      </OModal>
    </>
  )
}

export default InvestmentListTable
