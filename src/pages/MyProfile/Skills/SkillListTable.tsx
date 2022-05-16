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
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import {
  removeSkillById,
  selectSkillList,
} from '../../../reducers/MyProfile/Skills/skillSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CIcon from '@coreui/icons-react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { cilTrash } from '@coreui/icons'
import { currentPageData } from '../../../utils/paginationUtils'
import { usePagination } from '../../../middleware/hooks/usePagination'

const SkillListTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const skills = useTypedSelector(selectSkillList)

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(skills.length, 20)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteSkillName, setToDeleteSkillName] = useState('')
  const [toDeleteSkillId, setToDeleteSkillId] = useState(0)

  useEffect(() => {
    setPageSize(20)
    setCurrentPage(1)
  }, [skills, setPageSize, setCurrentPage])

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

  const handleConfirmDelete = async (skillId: number) => {
    setIsDeleteModalVisible(false)

    dispatch(removeSkillById(skillId))
  }

  const currentPageItems = useMemo(() => {
    const sortedSkills = skills
      .slice()
      .sort((a, b) => a.skill.localeCompare(b.skill))
    return currentPageData(sortedSkills, currentPage, pageSize)
  }, [skills, currentPage, pageSize])

  return (
    <>
      {skills.length ? (
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
              {currentPageItems.map((skillItem, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      {getItemNumber(index)}
                    </CTableHeaderCell>
                    <CTableDataCell>{skillItem.skill}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() =>
                          handleShowDeleteModal(
                            skillItem.skill,
                            skillItem.skillId,
                          )
                        }
                      >
                        <CIcon className="text-white" icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {skills.length}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {skills.length > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
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
        </>
      ) : (
        <CCol>
          <CRow className="category-no-data">
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
      <OModal
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Skill"
        confirmButtonText="Delete"
        confirmButtonAction={() => handleConfirmDelete(toDeleteSkillId)}
      >
        {`Are you sure you want to delete this ${toDeleteSkillName} skill item?`}
      </OModal>
    </>
  )
}

export default SkillListTable
