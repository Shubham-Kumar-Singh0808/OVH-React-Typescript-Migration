import {
  CButton,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import MoreSections from './MoreSections'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { Sections } from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

const SectionsFilterOptions = (): JSX.Element => {
  const [selectedSection, setSelectedSection] = useState<Sections>(
    {} as Sections,
  )
  const [showInvestment, setShowInvestment] = useState<boolean>(false)
  const [isMoreSectionsButtonEnabled, setIsMoreSectionsButtonEnabled] =
    useState<boolean>(false)
  const [sectionList, setSectionList] = useState<Sections[]>([])
  const dispatch = useAppDispatch()
  const section = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.sections,
  )

  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.getSectionsHavingInvests())
  }, [dispatch])

  useEffect(() => {
    if (selectedSection?.sectionId) {
      setIsMoreSectionsButtonEnabled(true)
    } else {
      setIsMoreSectionsButtonEnabled(false)
    }
  }, [selectedSection?.sectionId])

  const formLabelProps = {
    htmlFor: 'inputSection',
    className: 'col-form-label sections-label',
  }
  const handleClearInputs = () => {
    setShowInvestment(false)
  }

  const handleOnChangeSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const filterSection = section.filter(
      (currentSection) => currentSection.sectionId === Number(value),
    )
    console.log(filterSection)
    setSelectedSection(filterSection[0])
  }

  const handleClickSection = () => {
    setShowInvestment(true)
    setSectionList([selectedSection, ...sectionList])
  }

  useEffect(() => {
    if (selectedSection?.sectionId) {
      dispatch(
        reduxServices.itDeclarationForm.getInvestsBySectionId(
          selectedSection.sectionId,
        ),
      )
    }
  }, [selectedSection?.sectionId])

  return (
    <>
      <CRow className="mt-3 mb-3">
        <CCol sm={1}>
          <CFormLabel {...formLabelProps}>Sections:</CFormLabel>
        </CCol>
        <CCol sm={3}>
          <CFormSelect
            size="sm"
            id="section"
            data-testid="form-select-section"
            name="sectionName"
            onChange={(e) => {
              handleOnChangeSection(e)
            }}
            value={selectedSection?.sectionId}
          >
            <option value={''}>Select section</option>
            {section?.map((sectionItem, index) => (
              <option key={index} value={sectionItem.sectionId}>
                {sectionItem.sectionName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} className="d-flex align-items-center">
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            disabled={!isMoreSectionsButtonEnabled}
            onClick={handleClickSection}
          >
            <i className="fa fa-plus me-1"></i>
            More Sections
          </CButton>
        </CCol>
      </CRow>
      {showInvestment &&
        sectionList &&
        sectionList?.map((currentSec, index) => {
          return (
            <CRow key={index}>
              <CCol>
                <MoreSections sectionItem={currentSec} />
              </CCol>
            </CRow>
          )
        })}
      <CRow className="mt-3 mb-3">
        <CCol sm={12} className="mt-2">
          <CFormCheck name="agree" data-testid="ch-agree" />{' '}
          <span className="ps-2">
            <strong>
              I, declare that the above statement is true to the best of my
              knowledge and belief. In the event of any change that may occur
              during the year pertaining to the information given in the form, I
              undertake to inform the same to the company. Income Tax liability
              arising due to failure, if any, for not making / not intimating
              payment / investment made or proposed to be made by me and / or
              any wrong declaration would be my responsibility. I further
              undertake to provide all documentary proofs of payment made by me
              and if I fail to do so, the company can make full deduction of
              income tax dues from salary.
            </strong>
          </span>
        </CCol>
      </CRow>
      <CRow className="mt-2 mb-2">
        <CCol className="col-md-3 offset-md-4">
          <CButton
            color="success"
            className="btn-ovh me-1"
            data-testid="df-submit-btn"
            size="sm"
            disabled
          >
            Submit
          </CButton>
          <CButton
            color="warning "
            className="btn-ovh"
            data-testid="df-clear-btn"
            onClick={handleClearInputs}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default SectionsFilterOptions
