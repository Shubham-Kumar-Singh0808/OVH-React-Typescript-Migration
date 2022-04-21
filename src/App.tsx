import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'
import './assets/scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  render(): JSX.Element {
    return (
      <HashRouter>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Switch>
            <Route path="/" render={() => <DefaultLayout />} />
          </Switch>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
