/* eslint-disable prettier/prettier */
import { render, screen } from '@testing-library/react'
import React from 'react'
import OCard from './OCard'

test('load OCard component without crashing', () => {
  render(<OCard />)
  screen.debug()
})
