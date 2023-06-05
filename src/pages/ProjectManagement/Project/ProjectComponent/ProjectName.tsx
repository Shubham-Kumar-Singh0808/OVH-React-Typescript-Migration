import React from 'react'
import OInputField from '../../../../components/ReusableComponent/OInputField'
import { ProjectNameProps } from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

const dynamicFormLabelProps = (htmlFor: string, className: string) => {
  return {
    htmlFor,
    className,
  }
}

export const ProjectName = ({
  onChange,
  onBlur,
  value,
}: ProjectNameProps): JSX.Element => (
  <OInputField
    onChangeHandler={onChange}
    onBlurHandler={onBlur}
    value={value}
    isRequired={true}
    label={'Project Name'}
    name={'projectName'}
    placeholder={'Project Name'}
    autoComplete={'off'}
    dynamicFormLabelProps={dynamicFormLabelProps}
  />
)
