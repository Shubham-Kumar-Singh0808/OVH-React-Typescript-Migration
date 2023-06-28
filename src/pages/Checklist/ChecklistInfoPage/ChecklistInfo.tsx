import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CCol, CButton } from '@coreui/react-pro'
import parse from 'html-react-parser'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ChecklistInfo = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { pageName } = useParams<{ pageName: string }>()
  const checkListItem = useTypedSelector(
    (state) => state.Checklist.clickedChecklistTitle,
  )

  useEffect(() => {
    dispatch(reduxServices.Checklist.getChecklistItemThunk(pageName))
  }, [])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={checkListItem.title}
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <div className="d-flex flex-row justify-content-end mb-4">
        <CCol sm={3} className="text-end">
          <Link to="/Checklist">
            <CButton
              className="btn-ovh"
              color="info"
              data-testid="checkListInfoBackBtn"
            >
              <i className="fa fa-arrow-left me-1"></i>
              Back
            </CButton>
          </Link>
        </CCol>
      </div>
      <div>{parse(checkListItem.description)}</div>
    </OCard>
  )
}

export default ChecklistInfo
