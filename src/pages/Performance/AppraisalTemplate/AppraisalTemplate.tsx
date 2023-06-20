import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import AppraisalTemplateTable from './AppraisalTemplateTable'
import AppraisalTemplateViewAction from './AppraisalTemplateViewAction/AppraisalTemplateViewAction'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { GetDesignationsUnderCycle } from '../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'

const AppraisalTemplate = (): JSX.Element => {
  const [selectAppraisalId, setSelectAppraisalId] = useState<string>('')
  const [toggle, setToggle] = useState('')

  const [editAppraisalId, setEditAppraisalId] =
    useState<GetDesignationsUnderCycle>()

  const cycleList = useTypedSelector(
    reduxServices.appraisalTemplate.selectors.cycleList,
  )

  const dispatch = useAppDispatch()

  // const tmpData = useTypedSelector(
  //   reduxServices.appraisalTemplate.selectors.designationsUnderCycle,
  // )

  useEffect(() => {
    dispatch(reduxServices.appraisalTemplate.activeCycle())
    dispatch(reduxServices.appraisalTemplate.cycle())
  }, [dispatch])

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title={'Appraisal Template'}
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="mb-3 mt-3">
            <CCol sm={3}>
              <CFormLabel className="mt-1">
                Configurations :
                <span className={selectAppraisalId ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="appraisalId"
                data-testid="form-select1"
                name="appraisalId"
                value={selectAppraisalId}
                onChange={(e) => {
                  setSelectAppraisalId(e.target.value)
                }}
              >
                <option value={''}>Select Appraisal Title</option>
                {cycleList?.length > 0 &&
                  cycleList?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <AppraisalTemplateTable
            setEditAppraisalId={setEditAppraisalId}
            selectAppraisalId={selectAppraisalId}
            setToggle={setToggle}
          />
        </OCard>
      )}
      {toggle === 'editViewAppraisalTemplate' && (
        <AppraisalTemplateViewAction
          editAppraisalId={editAppraisalId}
          setToggle={() => {
            setToggle('')
          }}
        />
      )}
    </>
  )
}

export default AppraisalTemplate
