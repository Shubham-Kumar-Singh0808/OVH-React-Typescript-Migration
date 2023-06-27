import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const VendorList = ({
  vendorAutoCompleteTarget,
  setVendorAutoCompleteTarget,
}: {
  vendorAutoCompleteTarget: string
  setVendorAutoCompleteTarget: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const formLabel = 'col-sm-3 col-form-label text-end'
  const [isEnable, setIsEnable] = useState(false)
  const allVendors = useTypedSelector(
    reduxServices.expenseForm.selectors.allVendorsList,
  )
  //Vendor Autocomplete Implementation
  const vendorItemsLayout = (
    id: string | number,
    vendorName: string,
    isHighlighted: boolean,
  ): JSX.Element => {
    return (
      <div
        data-testid="option"
        className={
          isHighlighted
            ? 'autocomplete-dropdown-item active'
            : 'autocomplete-dropdown-item '
        }
        key={id}
      >
        {vendorName}
      </div>
    )
  }

  const onHandleSelectVendorName = (vendorName: string) => {
    setVendorAutoCompleteTarget(vendorName)
    setIsEnable(true)
  }
  return (
    <>
      <CRow className="mt-3 mb-3">
        <CFormLabel {...formLabelProps} className={formLabel}>
          Vendor:
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm2',
              id: 'vendor-autocomplete',
              placeholder: 'Vendor Name',
            }}
            getItemValue={(item) => item.vendorName}
            data-testid="vendorautocomplete"
            items={allVendors}
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  vendorAutoCompleteTarget &&
                  vendorAutoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) =>
              vendorItemsLayout(item.id, item.vendorName, isHighlighted)
            }
            value={vendorAutoCompleteTarget}
            shouldItemRender={(item, vendorValue) =>
              item?.vendorName
                ?.toLowerCase()
                .indexOf(vendorValue.toLowerCase()) > -1
            }
            onChange={(e) => setVendorAutoCompleteTarget(e.target.value)}
            onSelect={(selectedVal) => onHandleSelectVendorName(selectedVal)}
          />
          {/* {isProjectNameExist && ()} */}
          {/* <span
            className={isEnable ? TextWhite : TextDanger}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
            }}
          >
            Please select valid vendor
          </span> */}
        </CCol>
        <CCol></CCol>
      </CRow>
    </>
  )
}

export default VendorList
