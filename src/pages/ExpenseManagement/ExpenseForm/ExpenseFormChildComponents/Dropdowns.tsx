import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const Dropdowns = ({
  country,
  setCountry,
  currency,
  setCurrency,
}: {
  country: string
  setCountry: React.Dispatch<React.SetStateAction<string>>
  currency: string
  setCurrency: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const countriesList = useTypedSelector(
    reduxServices.expenseForm.selectors.countriesList,
  )
  const currenciesList = useTypedSelector(
    reduxServices.expenseForm.selectors.currenciesList,
  )
  return (
    <>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="countryLabel"
        >
          Country:
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="country"
            id="country"
            size="sm"
            aria-label="Country"
            name="country"
            onChange={(e) => {
              setCountry(e.target.value)
            }}
            value={country}
          >
            <option value={''}>Select Country</option>
            {countriesList
              .slice()
              .sort((country1, country2) =>
                country1.name.localeCompare(country2.name),
              )
              ?.map((countryItems, countries) => (
                <option key={countries} value={countryItems.id}>
                  {countryItems.name}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="currencyLabel"
        >
          Currency:
          <span className={currency ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="currency"
            id="currency"
            size="sm"
            aria-label="Category"
            name="currency"
            onChange={(e) => {
              setCurrency(e.target.value)
            }}
            value={currency}
          >
            <option value={''}>Select Currency</option>
            {currenciesList
              .slice()
              .sort((currencies1, currencies2) =>
                currencies1.type.localeCompare(currencies2.type),
              )
              ?.map((categoryNames, index) => (
                <option key={index} value={categoryNames.id}>
                  {categoryNames.type}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Dropdowns
