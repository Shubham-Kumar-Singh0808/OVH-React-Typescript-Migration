import { CContainer, CHeader } from '@coreui/react-pro'
import React from 'react'

const WrapperComponent = ({
  title,
  children,
  customContainerClass,
  customHeaderClass,
}: {
  title: string
  children: React.ReactNode
  customContainerClass?: string
  customHeaderClass?: string
}) => {
  return (
    <CContainer className={customContainerClass}>
      <CHeader className={customHeaderClass}>
        <h4>{title}</h4>
      </CHeader>
      {children}
    </CContainer>
  )
}

export default WrapperComponent
