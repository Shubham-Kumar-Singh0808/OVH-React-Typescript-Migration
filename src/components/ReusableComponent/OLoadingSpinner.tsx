/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CSpinner } from '@coreui/react-pro'
import React from 'react'
import ReactDOM from 'react-dom'
import loadingSpinner from '../../assets/images/loading-spinner/ajax-loader.gif'
import {
  LoadingSpinner,
  LoadingType,
} from '../../types/Components/loadingScreenTypes'

const OLoadingSpinner = (props: LoadingSpinner): JSX.Element => {
  const backdrop = document.getElementById('backdrop-root')!
  const overlay = document.getElementById('overlay-root')!
  return (
    <>
      {ReactDOM.createPortal(
        <div className="loading-spinner-backdrop "></div>,
        backdrop,
      )}
      {ReactDOM.createPortal(
        <div className="loading-spinner">
          {props.type === LoadingType.COMPONENT ? (
            <CSpinner color="primary" />
          ) : (
            <img src={loadingSpinner} alt="Loading..." />
          )}
        </div>,
        overlay,
      )}
    </>
  )
}

export default OLoadingSpinner
