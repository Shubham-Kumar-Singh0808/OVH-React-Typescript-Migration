import { CButton, CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import {
  skillActions,
  skillSelectors,
  skillThunk,
} from '../../../../reducers/MyProfile/QualificationsTab/Skills/employeeSkillSlice'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import AddNewSkill from './AddNewSkill'
import CIcon from '@coreui/icons-react'
import OCard from '../../../../components/ReusableComponent/OCard'
import SkillListTable from './SkillListTable'
import { cilArrowLeft } from '@coreui/icons'

const SkillList = ({
  categoryId,
  categoryType,
}: {
  categoryId: number
  categoryType: string
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(skillSelectors.selectIsSkillListLoading)
  const refreshList = useTypedSelector(skillSelectors.selectRefreshList)

  useEffect(() => {
    dispatch(skillThunk.getAllSkillListById(categoryId))
  }, [dispatch, categoryId])

  useEffect(() => {
    if (refreshList) {
      dispatch(skillThunk.getAllSkillListById(categoryId))
      dispatch(skillActions.doneRefreshList())
    }
  }, [dispatch, categoryId, refreshList])
  return (
    <>
      <OCard
        className="mb-4 category-list-card"
        title={`Skill List for ${categoryType}`}
        CFooterClassName="d-none"
      >
        {!isLoading ? (
          <CRow>
            <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" className="px-4 text-white" size="sm">
                <CIcon icon={cilArrowLeft} />
                Back
              </CButton>
            </CCol>
            <CCol xs={12}>
              <AddNewSkill categoryId={categoryId} />
            </CCol>
            <CCol xs={12}>
              <SkillListTable />
            </CCol>
          </CRow>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default SkillList
