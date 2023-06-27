import { CButton, CCol } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import ChecklistInformationTable from './ChecklistInformationTable'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import OCard from '../../components/ReusableComponent/OCard'

const Checklist = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const checkListParams = useTypedSelector(
    (state) => state.Checklist.checklistParams,
  )

  useEffect(() => {
    dispatch(reduxServices.Checklist.getCheckListThunk(checkListParams))
  }, [checkListParams])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Checklist Information"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <div className="d-flex flex-row justify-content-end mb-4">
          <CCol sm={3} className="text-end">
            <Link to="/checklistInfosettings">
              <CButton className="btn-ovh" color="info">
                <i className="fa fa-sign-out fa-fw"></i>
                Checklist Information Settings
              </CButton>
            </Link>
          </CCol>
        </div>
        <ChecklistInformationTable />
      </OCard>
    </>
  )
}

export default Checklist
