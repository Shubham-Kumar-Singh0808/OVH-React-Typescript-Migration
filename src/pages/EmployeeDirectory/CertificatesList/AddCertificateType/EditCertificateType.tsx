import {
  CButton,
  CFormInput,
  CFormSelect,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { CertificateType } from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'

export type EditCertificateTypeProps = {
  cancelCertificateTypeButtonHandler: () => void
  setIsEditCertificateType: (value: boolean) => void
  isEditCertificateType: boolean
}
const EditCertificateType = ({
  cancelCertificateTypeButtonHandler,
  setIsEditCertificateType,
  isEditCertificateType,
}: EditCertificateTypeProps): JSX.Element => {
  const [editCertificateTypeCopy, setEditCertificateTypeCopy] =
    useState<CertificateType>({
      certificateType: '',
      id: 0,
      technologyId: 0,
      technologyName: '',
    })

  const dispatch = useAppDispatch()

  const getAllTechnology = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const editCertificateType = useTypedSelector(
    reduxServices.certificateType.selectors.editCertificateType,
  )

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    console.log(name, value)
    if (name === 'certificate') {
      const newValue = value.replace(/[^a-zA-Z\s]/gi, '').replace(/^\s*/, '')
      setEditCertificateTypeCopy((prevState) => {
        return { ...prevState, ...{ [name]: newValue } }
      })
    } else {
      setEditCertificateTypeCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const saveCertificateTypeHandler = async () => {
    const updateCertificateTypeResultAction = await dispatch(
      reduxServices.certificateType.updateCertificateType(
        editCertificateTypeCopy,
      ),
    )
    if (
      reduxServices.certificateType.updateCertificateType.fulfilled.match(
        updateCertificateTypeResultAction,
      )
    ) {
      await dispatch(reduxServices.certificateType.getCertificateTypes())
      setIsEditCertificateType(false)
      //   dispatch(
      //     reduxServices.app.actions.addToast(
      //       getToastMessage(actionMapping.updated),
      //     ),
      //   )
    }
  }

  useEffect(() => {
    if (isEditCertificateType) {
      setEditCertificateTypeCopy(editCertificateType)
    }
  }, [editCertificateType, isEditCertificateType])
  console.log(editCertificateTypeCopy)

  return (
    <>
      <CTableDataCell scope="row">
        <CFormSelect
          data-testid="form-select"
          aria-label="Default select example"
          size="sm"
          id="technology"
          name="technology"
          value={editCertificateTypeCopy.technologyName}
          onChange={handleInputChange}
        >
          <option>{editCertificateTypeCopy.technologyName}</option>
          {getAllTechnology?.map((certificateItem, index) => (
            <option key={index} value={certificateItem.id}>
              {certificateItem.name}
            </option>
          ))}
        </CFormSelect>
      </CTableDataCell>
      <CTableDataCell scope="row">
        <CFormInput
          type="text"
          id="certificate"
          size="sm"
          name="certificate"
          maxLength={32}
          value={editCertificateTypeCopy.certificateType}
          onChange={handleInputChange}
        ></CFormInput>
      </CTableDataCell>
      <CTableDataCell scope="row">
        <CButton
          color="success"
          data-testid={`sh-save-btn`}
          className="btn-ovh me-1"
          onClick={saveCertificateTypeHandler}
        >
          <i className="fa fa-floppy-o" aria-hidden="true"></i>
        </CButton>
        <CButton
          color="warning"
          className="btn-ovh me-1"
          onClick={cancelCertificateTypeButtonHandler}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CButton>
      </CTableDataCell>
    </>
  )
}

export default EditCertificateType
