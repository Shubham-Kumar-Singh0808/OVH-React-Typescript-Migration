import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { UsernameEmailChangeHandlerProp } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { UsernameChangeHandlerProp } from '../../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'

const UserEmployeeName = ({
  dynamicFormLabelProps,
  // usernameChangeHandler,
  onAllowedUserChangeHandler,
  username,
  userEmployeeName,
  setUserEmployeeName,
}: UsernameChangeHandlerProp): JSX.Element => {
  const handleOnBlurInput = () => {
    onAllowedUserChangeHandler(userEmployeeName)
  }
  const getJoineeDetails = useTypedSelector(
    reduxServices.upComingJoinList.selectors.getJoineeDetails,
  )
  useEffect(() => {
    if (getJoineeDetails.candidateName) {
      setUserEmployeeName(getJoineeDetails.candidateName)
    }
  }, [getJoineeDetails.candidateName])

  console.log('hjdvbgjs')

  const convertedString = username.toLowerCase().replace(/\s/g, '.')

  const [firstName, lastName] = username.split(' ')
  console.log(firstName)
  console.log(lastName)

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'username',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Username:
          <span className={showIsRequired(username)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="username"
            data-testid="user-input"
            size="sm"
            type="text"
            name="username"
            placeholder="User Name"
            value={convertedString}
            onBlur={handleOnBlurInput}
            onChange={(e) => setUserEmployeeName(e.target.value)}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'email',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Email:
          <span className={showIsRequired(username)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="email"
            data-testid="user-email-input"
            size="sm"
            type="text"
            name="email"
            placeholder="Email"
            value={convertedString}
            disabled
          />
          <strong>@raybiztech.com</strong>
        </CCol>
      </CRow>
    </>
  )
}

export default UserEmployeeName
