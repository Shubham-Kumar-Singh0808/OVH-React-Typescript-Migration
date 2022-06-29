import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import CertificateDetailsExpandableTable from './CertificateDetailsExpandableTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockCertificateList } from '../../../test/data/certificateListData'

const expectPageSizeToBeRendered = async (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      await screen.findByText(mockCertificateList[i].empName),
    ).toBeInTheDocument()
  }
}

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
        isAccordionItemShow={false}
      />,
      {
        preloadedState: {
          certificateList: {
            employeeCertificationList: mockCertificateList,
            listSize: 44,
          },
        },
      },
    )
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
