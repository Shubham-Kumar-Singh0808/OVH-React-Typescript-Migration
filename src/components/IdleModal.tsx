import { CBadge, CModal, CModalBody } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import { clearAuthentication } from '../reducers/Login/authenticationSlice'
import { setIsSessionExpired } from '../reducers/appSlice'
import { useAppDispatch } from '../stateStore'
import { useHistory } from 'react-router-dom'
import { useIdleTimer } from 'react-idle-timer'

const IdleModal = (): JSX.Element => {
  const timeout = 20 * 60 * 1000
  const promptTimeout = 30 * 1000

  const [isIdleModalOpen, setIsIdleModalOpen] = useState(false)
  const history = useHistory()
  const dispatch = useAppDispatch()

  // time before idle
  const [remaining, setRemaining] = useState(0)

  const onPrompt = () => {
    setIsIdleModalOpen(true)
    setRemaining(promptTimeout)
  }

  const onIdle = () => {
    // reset the modal and timer
    setIsIdleModalOpen(false)
    setRemaining(0)

    // clear authentication
    localStorage.clear()
    dispatch(clearAuthentication())

    //set session expired
    dispatch(setIsSessionExpired(true))

    // redirect to session expire page
    history.push('/sessionExpire')
  }

  const onActive = () => {
    setIsIdleModalOpen(false)
    setRemaining(0)
  }

  const { getRemainingTime, isPrompted, reset } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive,
    crossTab: true,
  })

  const handleStillHere = () => {
    setIsIdleModalOpen(false)
    reset()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000))
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [getRemainingTime, isPrompted])

  const remainingBadge = <CBadge color="warning">{`${remaining}`}</CBadge>

  return (
    <>
      <CModal
        alignment={'center'}
        visible={isIdleModalOpen}
        onClose={handleStillHere}
      >
        <CModalBody className={'idle-modal-body'}>
          <h4>{`You're Idle. Do some activity`}</h4>
          <br />
          <p>You`&apos;ll be logged out in {remainingBadge} second(s).</p>
          <br />
        </CModalBody>
      </CModal>
    </>
  )
}

export default IdleModal
