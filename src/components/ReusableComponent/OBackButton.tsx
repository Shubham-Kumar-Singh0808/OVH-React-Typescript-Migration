import { CButton, CCol } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { BackButtonTypes } from '../../types/Components/backButtonTypes'

const OBackButton = ({ destination, name }: BackButtonTypes): JSX.Element => (
  <CCol className="text-end" md={4}>
    <Link to={destination}>
      <CButton
        data-testid={`${name}-btn`}
        color="info"
        className="btn-ovh me-1"
      >
        <i className="fa fa-arrow-left me-1"></i>
        {name}
      </CButton>
    </Link>
  </CCol>
)

export default OBackButton
