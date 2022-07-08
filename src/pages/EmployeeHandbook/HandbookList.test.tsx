import '@testing-library/jest-dom'

import React from 'react'
import HandbookList from './HandbookList'
import { render, screen, waitFor } from '../../test/testUtils'
import { mockHandbookList } from '../../test/data/handbookListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockHandbookList[i].title)).toBeInTheDocument()
  }
}

describe('Handbook List Component Testing', () => {
  test('should render titles of handbooks without crashing', async () => {
    await render(<HandbookList handbooks={mockHandbookList} inputText={''} />)

    expectPageSizeToBeRendered(7)
  })
})
