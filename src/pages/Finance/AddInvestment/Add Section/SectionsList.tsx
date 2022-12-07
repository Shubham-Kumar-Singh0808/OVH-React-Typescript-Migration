import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddNewSection from './AddNewSection'
import SectionListTable from './SectionListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const SectionsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.investmentCheckList.getSections())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={"Section's"}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/addInvestment`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-btn"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <AddNewSection />
        <SectionListTable />
      </OCard>
    </>
  )
}

export default SectionsList
