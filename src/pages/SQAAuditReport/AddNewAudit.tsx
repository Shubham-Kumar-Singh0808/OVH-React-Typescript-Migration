import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import OCard from '../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../constant/ClassName'
import { reduxServices } from '../../reducers/reduxServices'
import { useTypedSelector } from '../../stateStore'

const AddNewAudit = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'newAuditEvent',
    className: 'col-form-label category-label',
  }
  const formLabel = 'col-sm-3 col-form-label text-end'
  const [projectNameAutoCompleteTarget, setProjectNameAutoCompleteTarget] =
    useState<string>('')
  const projects = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )
  const projectsOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectNameAutoCompleteTarget(e.target.value)
  }
  const onHandleSelectProjectName = (projectName: string) => {
    setProjectNameAutoCompleteTarget(projectName)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Event Edit"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="newAudit-back-btn"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Audit Type:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="audit-type"
                autoComplete="off"
                type="text"
                name="auditType"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Project Type :
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="requiredDoc"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="projectType"
                data-testid="projType-dev"
                label="Development "
                value="yes"
                inline
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="documentsReqNo"
            >
              <CFormCheck
                type="radio"
                name="projectType"
                id="projectType"
                data-testid="projType-support"
                label="Support"
                value="no"
                inline
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...formLabelProps} className={formLabel}>
              Project Name:
              <span
                className={
                  projectNameAutoCompleteTarget ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  placeholder: 'Project Name',
                }}
                getItemValue={(item) => item.projectName}
                items={projects ? projects : []}
                wrapperStyle={{ position: 'relative' }}
                renderMenu={(children) => (
                  <div
                    className={
                      projectNameAutoCompleteTarget &&
                      projectNameAutoCompleteTarget.length > 0
                        ? 'autocomplete-dropdown-wrap'
                        : 'autocomplete-dropdown-wrap hide'
                    }
                  >
                    {children}
                  </div>
                )}
                renderItem={(item, isHighlighted) => (
                  <div
                    data-testid="project-option"
                    className={
                      isHighlighted
                        ? 'autocomplete-dropdown-item active'
                        : 'autocomplete-dropdown-item '
                    }
                    key={item.id}
                  >
                    {item.projectName}
                  </div>
                )}
                value={projectNameAutoCompleteTarget}
                shouldItemRender={(item, itemValue) =>
                  item?.projectName
                    ?.toLowerCase()
                    .indexOf(itemValue?.toLowerCase()) > -1
                }
                onChange={(e) => projectsOnChangeHandler(e)}
                onSelect={(selectedVal) =>
                  onHandleSelectProjectName(selectedVal)
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Post Graduation:
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                options={getPgAndGraduationLookUpItems?.pgDetails || []}
                displayValue="label"
                selectedValues={addQualification.pgLookUp}
                onSelect={(list: PostGraduationAndGraduationLookUp[]) =>
                  handleMultiSelect(list, 'pgLookUp')
                }
                onRemove={(selectedList: PostGraduationAndGraduationLookUp[]) =>
                  handleOnRemoveSelectedOption(selectedList, 'pgLookUp')
                }
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="newAudit-save-btn"
                className="btn-ovh me-1"
                color="success"
                disabled
              >
                Save
              </CButton>
              <CButton
                data-testid="newAudit-submit-btn"
                color="success "
                className="btn-ovh"
              >
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AddNewAudit
