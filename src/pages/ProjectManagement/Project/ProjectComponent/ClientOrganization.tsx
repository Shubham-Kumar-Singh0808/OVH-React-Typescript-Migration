import React from 'react'
import OAutoComplete from '../../../../components/ReusableComponent/OAutoComplete'
import { ClientOrganizationProps } from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

const dynamicFormLabelProps = (htmlFor: string, className: string) => {
  return {
    htmlFor,
    className,
  }
}

export const ClientOrganization = ({
  list,
  onSelectHandler,
  value,
}: ClientOrganizationProps): JSX.Element => (
  <OAutoComplete
    list={list}
    onSelect={onSelectHandler}
    shouldReset={false}
    value={value}
    isRequired={true}
    label={'Client Organization'}
    placeholder={'Client'}
    name={'clientOrganization'}
    dynamicFormLabelProps={dynamicFormLabelProps}
  />
)
