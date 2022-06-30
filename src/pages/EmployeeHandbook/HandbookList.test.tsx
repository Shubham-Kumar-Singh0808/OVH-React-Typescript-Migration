import '@testing-library/jest-dom'

import { render, screen, waitFor } from '../../test/testUtils'
import HandbookList from './HandbookList'
import React from 'react'
import { mockHandbookList } from '../../test/data/handbookListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockHandbookList[i].title)).toBeInTheDocument()
  }
}

describe('Handbook List Component Testing', () => {
  test('should render titles of handboks without crashing', async () => {
    render(<HandbookList handbooks={mockHandbookList} />)

    expectPageSizeToBeRendered(20)
  })
})
