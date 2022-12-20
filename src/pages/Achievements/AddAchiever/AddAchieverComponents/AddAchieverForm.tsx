import {
  CContainer,
  CFormLabel,
  CForm,
  CRow,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
  CFormText,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { SyntheticEvent } from 'react-draft-wysiwyg'
import FilterEmployeeName from './FilterEmployeeName'
import {
  emptyString,
  imageValue,
  newAchievementLabelClass,
  orderRegexValue,
  selectAchievementType,
} from '../../AchievementConstants'
import AchievementEntryContainer from '../AchievementTypeList/AchievementEntryContainer'
import {
  AddAchieverFormProps,
  IncomingActiveEmployee,
  OutgoingNewAchiever,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { AchievementType } from '../../../../types/Achievements/commonAchievementTypes'
import {
  commonDateFormat,
  deviceLocale,
} from '../../../../utils/dateFormatUtils'
import { TextDanger } from '../../../../constant/ClassName'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'

const getEmployeeId = (list: IncomingActiveEmployee[], name: string) => {
  const data = list.find(
    (item) => item.empFirstName + ' ' + item.empLastName === name,
  )
  if (!data) {
    return -1
  }
  return data.employeeId
}

const compareTheDates = (fromDate: string, toDate: string) => {
  const fromD = Date.parse(fromDate)
  const toD = Date.parse(toDate)
  return fromD > toD
}

const getMonthAndYear = (date: string) => {
  const fullDate = date.split('/')
  return fullDate.filter((_, index) => index !== 1)
}

const AddAchieverForm = (props: AddAchieverFormProps) => {
  const dispatch = useAppDispatch()
  const {
    addAchievementTypeButtonHandler,
    newAchieverDetails,
    setNewAchieverDetails,
    isAddButtonEnabled,
    setAddButton,
    clearInfoButtonHandler,
    addButtonHandler,
  } = props
  const achievementTypeDetailsAscendingList = useTypedSelector(
    (state) => state.commonAchievements.achievementTypeList,
  )

  const allActiveEmployees = useTypedSelector(
    (state) => state.addAchiever.activeEmployeeList,
  )
  const [achievementTypeDetails, setAchievementTypeDetails] =
    useState<AchievementType>()

  const [achievementDescription, setAchievementDescription] =
    useState<string>(emptyString)

  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [employeeFilterName, setEmployeeFilterName] = useState<string>()

  const showDates =
    achievementTypeDetails && achievementTypeDetails.daterequired

  const showTimePeriod =
    achievementTypeDetails && achievementTypeDetails.timeperiodrequired

  const fromDate = newAchieverDetails.startDate
    ? moment(
        new Date(newAchieverDetails.startDate).toLocaleDateString(
          deviceLocale,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
        ),
      ).format('MM-YYYY')
    : ''

  const toDate = newAchieverDetails.endDate
    ? moment(
        new Date(newAchieverDetails.endDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ).format('MM-YYYY')
    : ''

  const datesErrorMessage = compareTheDates(
    newAchieverDetails.startDate,
    newAchieverDetails.endDate,
  ) ? (
    <div data-testid="error-msg-date">
      <CFormText className={TextDanger}>
        To month should be greater than From month
      </CFormText>
    </div>
  ) : (
    <></>
  )

  const setAchievementTypeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target
    setNewAchieverDetails({
      ...newAchieverDetails,
      achievementName: value,
      timePeriod: emptyString,
      startDate: emptyString,
      endDate: emptyString,
    })
    const achievement = achievementTypeDetailsAscendingList.list.find(
      (item) => item.typeName === value,
    )
    setAchievementTypeDetails(achievement)
  }

  const setTimePeriodHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(orderRegexValue, '')
    setNewAchieverDetails({ ...newAchieverDetails, timePeriod: value })
  }

  const pictureHandler = (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['.jpg', '.jpeg', '.png']
    if (!file) return
    const extension = file[0].name.split('.').pop() as string
    if (file[0].size > 2048000) {
      const excessToast = (
        <OToast
          toastMessage="File size exceeded. Please upload a file less than 2MB."
          toastColor="danger"
        />
      )
      dispatch(reduxServices.app.actions.addToast(excessToast))
      return
    }
    if (!acceptedFileTypes.includes(extension)) {
      const wrongFileToast = (
        <OToast
          toastMessage="Wrong File Chosen. Please choose either jpg, jpeg or png"
          toastColor="danger"
        />
      )
      dispatch(reduxServices.app.actions.addToast(wrongFileToast))
      return
    }

    console.log(file)
  }

  const onSelectEmployee = (value: string) => {
    console.log(value)
    setNewAchieverDetails({ ...newAchieverDetails, employeeName: value })
  }

  const descriptionHandler = (value: string) => {
    console.log(value)
    setAchievementDescription(value)
  }

  useEffect(() => {
    if (
      newAchieverDetails.achievementName === selectAchievementType ||
      newAchieverDetails.employeeName === emptyString ||
      employeeFilterName === emptyString
    ) {
      setAddButton(false)
    } else {
      setAddButton(true)
      if (
        showDates &&
        (newAchieverDetails.startDate === emptyString ||
          newAchieverDetails.endDate === emptyString ||
          compareTheDates(
            newAchieverDetails.startDate,
            newAchieverDetails.endDate,
          ))
      ) {
        setAddButton(false)
      }
      if (showTimePeriod && newAchieverDetails.timePeriod === emptyString) {
        setAddButton(false)
      }
    }
  }, [newAchieverDetails])

  useEffect(() => {
    if (
      getEmployeeId(allActiveEmployees, newAchieverDetails.employeeName) === -1
    ) {
      setNewAchieverDetails({
        ...newAchieverDetails,
        employeeName: emptyString,
      })
      setEmployeeFilterName(undefined)
    }
  }, [newAchieverDetails.employeeName])

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    clearInfoButtonHandler()
    setShowEditor(false)
    setAchievementDescription(emptyString)
    setAchievementTypeDetails(undefined)
    setEmployeeFilterName(undefined)
    setTimeout(() => {
      setShowEditor(true)
    }, 50)
  }

  const submitNewAchievementHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // eslint-disable-next-line prefer-const
    let [fromMonth, fromYear] = getMonthAndYear(newAchieverDetails.startDate)
    // eslint-disable-next-line prefer-const
    let [toMonth, toYear] = getMonthAndYear(newAchieverDetails.endDate)

    if (fromMonth.toString().length === 1) {
      fromMonth = '0' + fromMonth
    }

    if (toMonth.toString().length === 1) {
      toMonth = '0' + toMonth
    }

    const finalData: OutgoingNewAchiever = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      achievementTypeId: achievementTypeDetails!.id,
      startDate: fromMonth + '/' + fromYear,
      endDate: toMonth + '/' + toYear,
      timePeriod: newAchieverDetails.timePeriod,
      //croppedImageData: newAchieverDetails.croppedImageData,
      croppedImageData: imageValue,
      employeeId: getEmployeeId(
        allActiveEmployees,
        newAchieverDetails.employeeName,
      ),
      description: achievementDescription,
    }
    console.log(finalData)
    addButtonHandler(finalData)
  }

  return (
    <CForm onSubmit={submitNewAchievementHandler}>
      <CContainer className="mt-4 ms-2">
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-name-label"
            className={newAchievementLabelClass}
          >
            Achievement Type:{' '}
            {(newAchieverDetails.achievementName === null ||
              newAchieverDetails.achievementName === selectAchievementType) && (
              <span className={TextDanger}>*</span>
            )}
          </CFormLabel>
          <CCol md={3}>
            <CFormSelect
              size="sm"
              value={newAchieverDetails.achievementName}
              data-testid="ach-name-sel"
              onChange={setAchievementTypeHandler}
            >
              <option data-testid="ach-name-opt" value={selectAchievementType}>
                {selectAchievementType}
              </option>
              {achievementTypeDetailsAscendingList.list.map((item, index) => (
                <option
                  data-testid="ach-name-opt"
                  key={index}
                  value={item.typeName}
                >
                  {item.typeName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CButton
              color="info"
              data-testid="add-ach-btn"
              size="sm"
              className="btn-ovh me-1"
              onClick={addAchievementTypeButtonHandler}
            >
              {' '}
              + Add
            </CButton>
          </CCol>
        </AchievementEntryContainer>
        <FilterEmployeeName
          allEmployees={allActiveEmployees}
          onSelectEmployee={onSelectEmployee}
          employeeName={employeeFilterName}
          setEmployeeName={setEmployeeFilterName}
        />
        {showTimePeriod && (
          <AchievementEntryContainer>
            <CFormLabel
              className={newAchievementLabelClass}
              data-testid="ach-timep-label"
            >
              Time Period (year&apos;s):
              {(newAchieverDetails.timePeriod === null ||
                newAchieverDetails.timePeriod === emptyString) && (
                <span className={TextDanger}>*</span>
              )}
            </CFormLabel>
            <CCol md={3}>
              <CFormInput
                type="text"
                data-testid="timep-inp"
                maxLength={2}
                placeholder="Time Period"
                value={newAchieverDetails.timePeriod}
                onChange={setTimePeriodHandler}
              />
            </CCol>
          </AchievementEntryContainer>
        )}
        {showDates && (
          <AchievementEntryContainer>
            <CFormLabel
              data-testid="from-date"
              className={newAchievementLabelClass}
            >
              From Date:{' '}
              {(newAchieverDetails.startDate === null ||
                newAchieverDetails.startDate === emptyString) && (
                <span className={TextDanger}>*</span>
              )}
            </CFormLabel>
            <CCol md={3}>
              <ReactDatePicker
                dateFormat="MMMM yyyy"
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                placeholderText="MM-YYYY"
                peekNextMonth
                showMonthYearPicker
                dropdownMode="select"
                value={fromDate}
                onChange={(date: Date) => {
                  setNewAchieverDetails({
                    ...newAchieverDetails,
                    startDate: moment(date).format(commonDateFormat),
                  })
                }}
              />
            </CCol>
          </AchievementEntryContainer>
        )}
        {showDates && (
          <AchievementEntryContainer>
            <CFormLabel
              data-testid="to-date"
              className={newAchievementLabelClass}
            >
              To Date:{' '}
              {(newAchieverDetails.endDate === null ||
                newAchieverDetails.endDate === emptyString) && (
                <span className={TextDanger}>*</span>
              )}
            </CFormLabel>
            <CCol md={3}>
              <ReactDatePicker
                dateFormat="MMMM yyyy"
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                placeholderText="MM-YYYY"
                peekNextMonth
                showMonthYearPicker
                dropdownMode="select"
                value={toDate}
                onChange={(date: Date) => {
                  setNewAchieverDetails({
                    ...newAchieverDetails,
                    endDate: moment(date).format(commonDateFormat),
                  })
                }}
              />
            </CCol>
            <CCol>{datesErrorMessage}</CCol>
          </AchievementEntryContainer>
        )}
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-desc"
            className={`${newAchievementLabelClass}`}
          >
            Description:{' '}
          </CFormLabel>
          <CCol sm={8}>
            {showEditor ? (
              <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                initData={achievementDescription}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  descriptionHandler(editor.getData().trim())
                }}
              />
            ) : (
              <></>
            )}
          </CCol>
        </AchievementEntryContainer>
        <AchievementEntryContainer>
          <CFormLabel
            data-testid="ach-pic"
            className={newAchievementLabelClass}
          >
            Picture:
          </CFormLabel>
          <CCol sm={12} md={3}>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e: SyntheticEvent) =>
                pictureHandler(e.currentTarget as HTMLInputElement)
              }
            />
          </CCol>
        </AchievementEntryContainer>
      </CContainer>
      <CRow>
        <CFormLabel className="col-form-label category-label col-sm-3 col-form-label text-end"></CFormLabel>
        <CCol sm={4}>
          <CButton
            type="submit"
            color="success"
            className="btn-ovh me-1"
            data-testid="add-achiever-btn"
            disabled={!isAddButtonEnabled}
          >
            Add
          </CButton>
          <CButton
            color="warning"
            role="addNewAchiever"
            data-testid="clear-btn"
            className="btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default AddAchieverForm
