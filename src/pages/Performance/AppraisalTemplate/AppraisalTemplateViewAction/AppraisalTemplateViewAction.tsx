import { CRow, CCol, CButton, CFormInput, CFormLabel } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AppraisalTemplateViewActionTable from './AppraisalTemplateViewActionTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  GetDesignationsUnderCycle,
  KraLookups,
} from '../../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const AppraisalTemplateViewAction = ({
  setToggle,
  editAppraisalId,
}: {
  setToggle: () => void
  editAppraisalId: GetDesignationsUnderCycle | undefined
}): JSX.Element => {
  const [cycleChecked, setCycleChecked] = useState<KraLookups>()
  const [checkList, setCheckList] = useState<KraLookups[]>([])
  const [cbFromApi, setCbFromApi] = useState<KraLookups[]>([])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }
  useEffect(() => {
    if (cycleChecked) {
      const tmpArr: KraLookups[] = []
      cbFromApi.forEach((item) => {
        tmpArr.push(item)
        return ''
      })
      let ndx = 9999
      tmpArr.forEach((el, i) => {
        if (el.id === cycleChecked.id) {
          ndx = i
        }
        return ''
      })
      if (ndx < 9999) {
        tmpArr.splice(ndx, 1)
      } else {
        tmpArr.push(cycleChecked)
      }
      setCbFromApi(tmpArr)
      setCheckList([...checkList, cycleChecked])
    }
  }, [cycleChecked])

  const activeCycle = useTypedSelector(
    reduxServices.appraisalTemplate.selectors.designationWiseKRAs,
  )
  console.log(activeCycle)

  useEffect(() => {
    if (activeCycle) {
      setCbFromApi(activeCycle)
    }
  }, [activeCycle])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Assign Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={setToggle}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Appraisal Title:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control form-control-not-allowed"
              data-testid="title"
              id="title"
              size="sm"
              name="title"
              disabled={true}
              value={editAppraisalId?.appraisalCycleDto.name}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control form-control-not-allowed"
              data-testid="department"
              id="department"
              size="sm"
              name="department"
              disabled={true}
              value={editAppraisalId?.designation.departmentName}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Designation:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-control form-control-not-allowed"
              data-testid="designation"
              id="designation"
              size="sm"
              name="designation"
              disabled={true}
              value={editAppraisalId?.designation.name}
            />
          </CCol>
        </CRow>
        <AppraisalTemplateViewActionTable
          cycleChecked={cycleChecked as KraLookups}
          setCycleChecked={setCycleChecked}
          selChkBoxesFromApi={cbFromApi}
          checkList={checkList}
          editAppraisalId={editAppraisalId}
          cbFromApi={cbFromApi}
        />
      </OCard>
    </>
  )
}

export default AppraisalTemplateViewAction
