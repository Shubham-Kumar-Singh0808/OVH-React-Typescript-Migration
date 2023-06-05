import { CRow, CCol, CFormLabel, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ProcessAreaTable from './ProcessAreaTable'
import AddProcessArea from './AddProcessArea/AddProcessArea'
import NewProcessAreas from './InnerProcessAreas/NewProcessAreas'
import EditProcessArea from './EditProcessArea/EditProcessArea'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ProcessArea = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')
  const [selectCategory, setSelectCategory] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.processArea.getProjectTailoringDocument('totalList'))
  }, [dispatch])

  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )
  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Process Area List"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="mb-3 mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="pt-2">Category: </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="location"
                data-testid="form-select1"
                name="location"
                value={selectCategory}
                onChange={(e) => {
                  setSelectCategory(e.target.value)
                }}
              >
                <option value={''}>-- Select Category --</option>
                {ProjectTailoringList.length > 0 &&
                  ProjectTailoringList?.map((item, index) => (
                    <option key={index} value={item.id as number}>
                      {item.processHeadname}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="justify-content-end mb-4">
            <CCol className="text-end" md={4}>
              <CButton
                data-testid="Process-Area"
                color="info"
                className="btn-ovh me-1"
                onClick={() => setToggle('addProcessArea')}
              >
                <i className="fa fa-plus me-1"></i>
                Add Process Area
              </CButton>
            </CCol>
          </CRow>
          <ProcessAreaTable
            selectCategory={selectCategory}
            setToggle={setToggle}
          />
        </OCard>
      )}
      {toggle === 'addProcessArea' && <AddProcessArea setToggle={setToggle} />}
      {toggle === 'addNewProcessArea' && (
        <NewProcessAreas setToggle={setToggle} />
      )}
      {toggle === 'editProcessArea' && (
        <EditProcessArea setToggle={setToggle} />
      )}
    </>
  )
}

export default ProcessArea
