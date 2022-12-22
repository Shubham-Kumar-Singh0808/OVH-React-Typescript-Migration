import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import LocationListTable from './LocationListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const LocationList = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectLocationName, setSelectLocationName] = useState('')
  const [locationNameExist, setLocationNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const dispatch = useAppDispatch()

  const locationNames = useTypedSelector(
    reduxServices.addLocationList.selectors.locationNames,
  )
  const isLoading = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.isLoading,
  )
  useEffect(() => {
    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
  }, [dispatch])

  const locationNameExists = (name: string) => {
    return locationNames?.find((locationName) => {
      return locationName.locationName.toLowerCase() === name.toLowerCase()
    })
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setSelectLocationName(newValue)
    }
    if (locationNameExists(value)) {
      setLocationNameExist(value)
    } else {
      setLocationNameExist('')
    }
  }

  const successToast = (
    <OToast toastMessage="Location Added Successfully" toastColor="success" />
  )

  useEffect(() => {
    if (selectLocationName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [selectLocationName])

  const addLocationNameButtonHandler = async () => {
    const isAddLocation = await dispatch(
      reduxServices.addLocationList.addLocation(selectLocationName),
    )
    if (
      reduxServices.addLocationList.addLocation.fulfilled.match(isAddLocation)
    ) {
      dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
      setSelectLocationName('')
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Meeting-Location',
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Location List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name of the Location:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-2"
                data-testid="locationName"
                type="text"
                id="Name"
                size="sm"
                name="name"
                autoComplete="off"
                placeholder="Enter Location Name"
                value={selectLocationName}
                onChange={handledInputChange}
              />
              {locationNameExist && (
                <span
                  className={TextDanger}
                  data-testid="LocationNameAlreadyExist"
                >
                  <b>Location name already exist</b>
                </span>
              )}
            </CCol>
            {userAccess?.createaccess && (
              <CCol sm={3}>
                <CButton
                  data-testid="designationButton"
                  color="info"
                  className="btn-ovh me-1"
                  onClick={addLocationNameButtonHandler}
                  disabled={
                    isAddButtonEnabled
                      ? isAddButtonEnabled && locationNameExist.length > 0
                      : !isAddButtonEnabled
                  }
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              </CCol>
            )}
          </CRow>
        </CForm>
        {isLoading !== ApiLoadingState.loading ? (
          <LocationListTable
            userDeleteAccess={userAccess?.deleteaccess as boolean}
          />
        ) : (
          <>
            <CSpinner />
          </>
        )}
      </OCard>
    </>
  )
}
export default LocationList
