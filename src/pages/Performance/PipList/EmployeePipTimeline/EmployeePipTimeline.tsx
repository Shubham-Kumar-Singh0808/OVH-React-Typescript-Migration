import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmployeePipTimelineOptions from './EmployeePipTimelineOptions'
import EmployeeExtendPIP from './EmployeeExtendPIP'
import EmployeeRemovePIP from './EmployeeRemovePIP'
import EmployeeUpdatePIP from './EmployeeUpdatePIP'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const EmployeePipTimeline = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const viewEmployeePipDetails = useTypedSelector(
    reduxServices.pipList.selectors.viewEmployeePipDetails,
  )

  const updateButtonHandler = () => {
    setToggle('employeeUpdatePIP')
    dispatch(reduxServices.pipList.viewPipDetails(id))
  }
  const extendButtonHandler = () => {
    setToggle('employeeExtendPIP')
    dispatch(reduxServices.pipList.viewPipDetails(id))
  }

  const removeButtonHandler = () => {
    setToggle('employeeRemovePIP')
    dispatch(reduxServices.pipList.viewPipDetails(id))
  }
  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="PIP Details"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="justify-content-end">
            <CCol className="text-end" md={5}>
              <>
                {viewEmployeePipDetails?.extendDate != null ||
                viewEmployeePipDetails?.pipflag === false ? (
                  ''
                ) : (
                  <CButton
                    data-testid="update-btn"
                    className="btn-ovh me-1 text-white"
                    color="success"
                    onClick={updateButtonHandler}
                  >
                    Update
                  </CButton>
                )}
                {viewEmployeePipDetails?.pipflag === true ? (
                  <CButton
                    data-testid="Extend-btn"
                    color="warning"
                    className="btn-ovh me-1 text-white"
                    onClick={extendButtonHandler}
                  >
                    Extend PIP
                  </CButton>
                ) : (
                  ''
                )}
                {viewEmployeePipDetails?.pipflag === true ? (
                  <CButton
                    data-testid="Remove-btn"
                    className="btn-ovh me-1 text-white"
                    color="success"
                    onClick={removeButtonHandler}
                  >
                    Remove From PIP
                  </CButton>
                ) : (
                  ''
                )}
                <Link to={`/PIPList`}>
                  <CButton
                    color="info"
                    className="btn-ovh me-1"
                    data-testid="toggle-back-btn"
                  >
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </>
            </CCol>
          </CRow>
          <EmployeePipTimelineOptions />
        </OCard>
      )}
      {toggle === 'employeeExtendPIP' && (
        <EmployeeExtendPIP setToggle={setToggle} />
      )}
      {toggle === 'employeeRemovePIP' && (
        <EmployeeRemovePIP setToggle={setToggle} />
      )}
      {toggle === 'employeeUpdatePIP' && (
        <EmployeeUpdatePIP setToggle={setToggle} />
      )}
    </>
  )
}

export default EmployeePipTimeline
