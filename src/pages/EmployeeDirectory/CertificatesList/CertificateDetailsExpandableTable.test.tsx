import '@testing-library/jest-dom'

import { render, screen, waitFor } from '../../../test/testUtils'

import CertificateDetailsExpandableTable from './CertificateDetailsExpandableTable'
import React from 'react'
import { mockCertificateList } from '../../../test/data/certificateListData'
import userEvent from '@testing-library/user-event'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Certificate Details Expandable Table Component Testing', () => {
  test('should render certificate details expandable table component with out crashing', async () => {
    render(
      <CertificateDetailsExpandableTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
    )
  })
})
