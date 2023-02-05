import { CRow, CCol, CFormLabel, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import ProcessAreaTable from './ProcessAreaTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ProcessArea = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.processArea.getProjectTailoringDocument('totalList'))
  }, [dispatch])

  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Process Area List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mb-3 mt-3">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Category: </CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="location"
              data-testid="form-select1"
              name="location"
            >
              <option value={''}>-- Select Category --</option>
              {ProjectTailoringList.length > 0 &&
                ProjectTailoringList?.map((item, index) => (
                  <option key={index}>{item.processHeadname}</option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-plus me-1"></i>
              Add Process Area
            </CButton>
          </CCol>
        </CRow>
        <ProcessAreaTable />
      </OCard>
    </>
  )
}

export default ProcessArea
