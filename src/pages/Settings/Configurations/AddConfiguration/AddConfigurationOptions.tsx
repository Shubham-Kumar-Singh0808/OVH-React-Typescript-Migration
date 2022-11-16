import {
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const AddConfigurationOptions = (props: {
  selectActiveStatus: string
  setSelectActiveStatus: (value: string) => void
  level: number | string
  setLevel: (value: number) => void
  servicePeriod: string | number | undefined
  setServicePeriod: (value: string) => void
}): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'minimumServicePeriod') {
      let servicePeriodTargetValue = value.replace(/\D/g, '')
      if (Number(servicePeriodTargetValue) > 999)
        servicePeriodTargetValue = '999'
      props.setServicePeriod(servicePeriodTargetValue)
    } else if (name === 'level') {
      let targetValue = value.replace(/\D/g, '')
      if (Number(targetValue) > 9) targetValue = '9'
      props.setLevel(targetValue as unknown as number)
    }
  }

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Level:
          <span className={props.level ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            data-testid="level"
            id="level"
            size="sm"
            name="level"
            placeholder="level"
            type="text"
            autoComplete="off"
            max={9}
            value={props.level}
            onChange={handleInputChange}
            maxLength={1}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Minimum Service Period (days):
          <span className={props.servicePeriod ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            data-testid="minimumServicePeriod"
            id="minimumServicePeriod"
            size="sm"
            name="minimumServicePeriod"
            placeholder="Minimum Service Period"
            autoComplete="off"
            max={999}
            value={props.servicePeriod}
            onChange={handleInputChange}
            maxLength={3}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Active:
        </CFormLabel>
        <CCol sm={3}>
          <CFormCheck
            data-testid="active"
            className="mt-2 sh-hover-handSymbol"
            type="radio"
            name="yes"
            id="yes"
            label="Yes"
            inline
            onChange={(e) => props.setSelectActiveStatus(e.target.value)}
            value={'true'}
            checked={props.selectActiveStatus === 'true'}
          />
          <CFormCheck
            className="mt-2 sh-hover-handSymbol"
            type="radio"
            name="no"
            id="no"
            label="No"
            inline
            onChange={(e) => props.setSelectActiveStatus(e.target.value)}
            value={'false'}
            checked={props.selectActiveStatus === 'false'}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default AddConfigurationOptions
