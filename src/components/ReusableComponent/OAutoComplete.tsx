import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import {
  AutoCompleteProps,
  GetAutoCompleteList,
  GetOnSelect,
} from '../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import { showIsRequired } from '../../utils/helper'

const OAutoComplete = ({
  dynamicFormLabelProps,
  list,
  onSelect,
  shouldReset,
  value,
  isRequired,
  label,
  placeholder,
  name,
}: AutoCompleteProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  const initList = [] as GetAutoCompleteList[]
  const [selectorList, setSelectorList] = useState(initList)

  useEffect(() => {
    setAutoCompleteTarget(value)
  }, [value])

  useEffect(() => {
    if (list == null) return

    setSelectorList(list)
  }, [list])

  useEffect(() => {
    if (shouldReset) setAutoCompleteTarget('')
  }, [shouldReset])

  const onHandleSelect = (selectedName: string) => {
    setAutoCompleteTarget(selectedName)
    const detail = selectorList.find(
      (listValue) => listValue.name === selectedName,
    )

    const user = {
      id: detail?.id,
      name: detail?.name,
    } as GetOnSelect
    onSelect(user)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid={name}
          {...dynamicFormLabelProps(
            `${name}`,
            'col-sm-3 col-form-label text-end',
          )}
        >
          {label}:
          {isRequired && (
            <span className={showIsRequired(autoCompleteTarget as string)}>
              *
            </span>
          )}
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              placeholder: `${placeholder}`,
            }}
            getItemValue={(item) => item.name}
            items={selectorList}
            data-testid={name}
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  autoCompleteTarget && autoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                data-testid="option"
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.id}
              >
                {item.name}
              </div>
            )}
            value={autoCompleteTarget}
            shouldItemRender={(item, itemValue) =>
              item.name.toLowerCase().indexOf(itemValue.toLowerCase()) > -1
            }
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(selectedVal) => onHandleSelect(selectedVal)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default OAutoComplete
