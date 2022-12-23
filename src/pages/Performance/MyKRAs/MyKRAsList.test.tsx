import '@testing-library/jest-dom'
import React from 'react'
import MyKRAsList from './MyKRAsList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <MyKRAsList />
  </div>
)

describe('Investment CheckList Component Testing', () => {
  test('should render Investment CheckList component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('My KRAs')).toBeInTheDocument()
  })
})
