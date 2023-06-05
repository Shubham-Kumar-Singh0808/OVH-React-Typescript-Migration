/* eslint-disable require-await */
// Todo: remove eslint and fix error
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
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OToast from '../../../components/ReusableComponent/OToast'

const SkillListTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const skills = useTypedSelector(reduxServices.skill.selectors.skills)
  const pageFromState = useTypedSelector(
    reduxServices.skill.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.skill.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(skills.length, pageSizeFromState, pageFromState)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteSkillName, setToDeleteSkillName] = useState('')
  const [toDeleteSkillId, setToDeleteSkillId] = useState(0)

  useEffect(() => {
    dispatch(reduxServices.skill.actions.setPageSize(pageSize))
  }, [dispatch, pageSize])

  useEffect(() => {
    dispatch(reduxServices.skill.actions.setCurrentPage(currentPage))
  }, [currentPage, dispatch])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowDeleteModal = (skillName: string, skillId: number) => {
    setToDeleteSkillName(skillName)
    setToDeleteSkillId(skillId)
    setIsDeleteModalVisible(true)
  }

  const SuccessToastMessage = (
    <OToast toastMessage="Skill Deleted Successfully" toastColor="success" />
  )

  const handleConfirmDelete = async (skillId: number) => {
    setIsDeleteModalVisible(false)

    dispatch(reduxServices.skill.deleteSkill(skillId))
    dispatch(reduxServices.app.actions.addToast(SuccessToastMessage))
  }

  const currentPageItems = useMemo(() => {
    if (skills.length > 0) {
      const sortedSkills = skills
        .slice()
        .sort((a, b) => a.skill.localeCompare(b.skill))
      return currentPageData(sortedSkills, currentPage, pageSize)
    }
    return []
  }, [skills, currentPage, pageSize])

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-25">
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-50">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems?.map((skillItem, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {getItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell>{skillItem.skill}</CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="Delete">
                    <CButton
                      data-testid={`category-delete-btn${index}`}
                      size="sm"
                      color="danger btn-ovh me-1"
                      className="btn-ovh-employee-list"
                      onClick={() =>
                        handleShowDeleteModal(
                          skillItem.skill,
                          skillItem.skillId,
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
          <strong>
            {skills?.length
              ? `Total Records: ${skills.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {skills.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {skills.length > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-2 d-md-flex justify-content-md-end"
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
        modalTitle="Delete Skill"
        closeButtonClass="d-none"
        confirmButtonAction={() => handleConfirmDelete(toDeleteSkillId)}
        modalBodyClass="mt-0"
        alignment="center"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      >
        <>
          Are you sure you want to delete this{' '}
          <strong>{toDeleteSkillName}</strong> skill item?
        </>
      </OModal>
    </>
  )
}

export default SkillListTable
