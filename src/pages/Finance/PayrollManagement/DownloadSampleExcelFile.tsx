import React from 'react'
import PayrollManagementApi from '../../../middleware/api/Finance/PayrollManagement/PayrollManagementApi'
import { DownloadExcelFile } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const DownloadSampleExcelFile = (props: DownloadExcelFile): JSX.Element => {
  const defaultFileName = 'SampleSalaryExcelFile.xlsx'
  const downloadFileName: string = props.fileName
    ? props.fileName
    : defaultFileName

  const downloadExcelFileHandler = async () => {
    const prepareObject = {
      fileName: props.fileName,
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('tenantKey') ?? '',
    }
    const downloadExcel = await PayrollManagementApi.downloadExcelFile(
      prepareObject,
    )
    downloadFile(downloadExcel)
  }

  const downloadFile = (downloadExcel: Blob | undefined) => {
    if (downloadExcel) {
      const url = window.URL.createObjectURL(
        new Blob([downloadExcel], {
          type: downloadExcel.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${downloadFileName}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
  return (
    <>
      <ins className={props.className} onClick={downloadExcelFileHandler}>
        <i className="fa fa-paperclip me-1"></i>
        Download Sample Excel File
      </ins>
    </>
  )
}

export default DownloadSampleExcelFile
