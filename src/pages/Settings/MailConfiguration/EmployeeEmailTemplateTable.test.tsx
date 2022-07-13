/* eslint-disable import/named */
import '@testing-library/jest-dom'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeEmailTemplateTable from './EmployeeEmailTemplateTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import stateStore from '../../../stateStore'
import { templateType } from '../../../test/constants'
import { reduxServices } from '../../../reducers/reduxServices'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
