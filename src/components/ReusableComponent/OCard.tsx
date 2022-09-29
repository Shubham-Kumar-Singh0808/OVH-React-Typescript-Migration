import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CLink,
} from '@coreui/react-pro'
import React from 'react'

const OCard = (props: {
  className?: string
  CHeaderClassName?: string
  title?: string
  CBodyClassName?: string
  CFooterClassName?: string
  CLinkClassName?: string
  CCardTitleClassName?: string
  children?: React.ReactNode
  footerPath?: string
}): JSX.Element => {
  return (
    <>
      <CCard className={props.className}>
        <CCardHeader className={props.CHeaderClassName}>
          <h4 className={`h4 ${props.CCardTitleClassName}`}>{props.title}</h4>
        </CCardHeader>
        <CCardBody className={props.CBodyClassName}>{props.children}</CCardBody>
        <CCardFooter className={props.CFooterClassName}>
          <CLink
            className={`font-weight-bold font-xs float-end ${
              props.CLinkClassName ? props.CLinkClassName : ''
            }`}
            href={props.footerPath}
            rel="noopener norefferer"
            target="_self"
          >
            More
            {''} <i className="fa fa-angle-double-right fa-lg"></i>
          </CLink>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default OCard
