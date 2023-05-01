import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { UpdateSection } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { currentPageData } from '../../../../utils/paginationUtils'

const SectionListTable = ({
  editSectionButtonHandler,
}: {
  editSectionButtonHandler: (editSectionData: UpdateSection) => void
}): JSX.Element => {
  const sections = useTypedSelector(
    reduxServices.investmentCheckList.selectors.sections,
  )
  const pageFromState = useTypedSelector(
    reduxServices.itDeclarationList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.itDeclarationList.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(sections.length, pageSizeFromState, pageFromState)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteSectionName, setToDeleteSectionName] = useState('')
  const [sectionId, setSectionId] = useState(0)

  const handleSectionsPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getSectionItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowSectionDeleteModal = (id: number, sectionName: string) => {
    setSectionId(id)
    setToDeleteSectionName(sectionName)
    setIsDeleteModalVisible(true)
  }

  const toastElement = (
    <OToast toastColor="success" toastMessage="Section Deleted Successfully" />
  )

  const handleConfirmDeleteSection = async () => {
    setIsDeleteModalVisible(false)

    const deleteSectionResultAction = await dispatch(
      reduxServices.itDeclarationList.deleteSection(sectionId),
    )
    if (
      reduxServices.itDeclarationList.deleteSection.fulfilled.match(
        deleteSectionResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      dispatch(reduxServices.investmentCheckList.getSections())
    }
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToSectionActions = userAccessToFeatures?.find(
    (feature) => feature.name === 'Investment Section',
  )

  const currentPageItems = useMemo(
    () => currentPageData(sections, currentPage, pageSize),
    [sections, currentPage, pageSize],
  )

  return (
    <>
      <CTable striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-10">
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-20">
              Section
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Limit
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.map((sectionItem, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell>
                  {getSectionItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell>{sectionItem.sectionName}</CTableDataCell>
                <CTableDataCell>
                  {sectionItem.sectionLimit?.toLocaleString('en-IN')}
                </CTableDataCell>
                <CTableDataCell>
                  {userAccessToSectionActions?.updateaccess && (
                    <CTooltip content="Edit">
                      <CButton
                        size="sm"
                        color="info"
                        className="btn-ovh me-1 btn-sm btn-ovh-employee-list"
                        data-testid={`section-edit-btn${index}`}
                        onClick={() =>
                          editSectionButtonHandler({
                            sectionLimit: sectionItem.sectionLimit,
                            sectionName: sectionItem.sectionName,
                            invests: [],
                            sectionId: sectionItem.sectionId,
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
                        data-testid={`section-delete-btn${index}`}
                        color="danger"
                        className="btn-ovh me-1 btn-sm btn-ovh-employee-list"
                        onClick={() =>
                          handleShowSectionDeleteModal(
                            sectionItem.sectionId,
                            sectionItem.sectionName,
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
            {sections.length
              ? `Total Records: ${sections.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {sections.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handleSectionsPageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {sections.length > 20 && (
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
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Section"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteSection}
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteSectionName}</strong> section?
        </>
      </OModal>
    </>
  )
}

export default SectionListTable
