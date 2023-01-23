/* eslint-disable sonarjs/cognitive-complexity */
import {
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
import React, { useCallback, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import FilterEmployeeName from './FilterEmployeeName'
import AchieverImage from './AchieverImage'
import {
  base64Extension,
  fromToDateError,
  getDateForamatted,
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
import { commonDateFormat } from '../../../../utils/dateFormatUtils'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
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

const AddAchieverForm = (props: AddAchieverFormProps): JSX.Element => {
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
  const selectedEmployee = useTypedSelector(
    (state) => state.addAchiever.employeeData,
  )
  const allActiveEmployees = useTypedSelector(
    (state) => state.addAchiever.activeEmployeeList,
  )
  const [achievementTypeDetails, setAchievementTypeDetails] =
    useState<AchievementType>()

  const [achievementDescription, setAchievementDescription] =
    useState<string>('')

  const [imageDescription, setImageDescription] = useState<string>()

  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [employeeFilterName, setEmployeeFilterName] = useState<string>()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToViewAchievementType = userAccessToFeatures?.find(
    (feature) => feature.name === 'Achievement Type',
  )
  const userAccessToAchievement = userAccessToFeatures?.find(
    (feature) => feature.name === "Add Achiever's",
  )
  const showDates =
    achievementTypeDetails && achievementTypeDetails.daterequired

  const showTimePeriod =
    achievementTypeDetails && achievementTypeDetails.timeperiodrequired

  const datesErrorMessage = compareTheDates(
    newAchieverDetails.startDate,
    newAchieverDetails.endDate,
  ) ? (
    <div data-testid="error-msg-date">
      <CFormText data-testid="error-date" className={TextDanger}>
        {fromToDateError}
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
      timePeriod: '',
      startDate: '',
      endDate: '',
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

  const onSelectEmployee = (value: string) => {
    setNewAchieverDetails({ ...newAchieverDetails, employeeName: value })
    const empId = getEmployeeId(allActiveEmployees, value)
    if (empId === -1) {
      return
    }
    dispatch(reduxServices.addAchiever.getImageDataThunk(empId))
  }

  const descriptionHandler = (value: string) => {
    setAchievementDescription(value)
  }

  //For image that is being uploaded only. Not for Api fetched image
  const croppedImageDataHandler = useCallback(
    (imageData: string | undefined) => {
      setImageDescription(imageData)
    },
    [],
  )

  useEffect(() => {
    if (
      newAchieverDetails.achievementName === selectAchievementType ||
      newAchieverDetails.employeeName === '' ||
      employeeFilterName === ''
    ) {
      setAddButton(false)
    } else {
      setAddButton(true)
      if (
        showDates &&
        (newAchieverDetails.startDate === '' ||
          newAchieverDetails.endDate === '' ||
          compareTheDates(
            newAchieverDetails.startDate,
            newAchieverDetails.endDate,
          ))
      ) {
        setAddButton(false)
      }
      if (
        showTimePeriod &&
        (newAchieverDetails.timePeriod === '' ||
          newAchieverDetails.timePeriod === '0' ||
          newAchieverDetails.timePeriod.trim().length === 0 ||
          !Number(newAchieverDetails.timePeriod))
      ) {
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
        employeeName: '',
      })
      setEmployeeFilterName(undefined)
    }
  }, [newAchieverDetails.employeeName])

  const clearLocalDetails = () => {
    clearInfoButtonHandler()
    setShowEditor(false)
    setAchievementDescription('')
    setAchievementTypeDetails(undefined)
    setEmployeeFilterName(undefined)
    setImageDescription(undefined)
    setTimeout(() => {
      setShowEditor(true)
    }, 50)
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    clearLocalDetails()
  }

  //Final data for api
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

    const image = imageDescription
      ? imageDescription
      : base64Extension + selectedEmployee.imageData

    const finalData: OutgoingNewAchiever = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      achievementTypeId: achievementTypeDetails!.id,
      startDate: fromMonth + '/' + fromYear,
      endDate: toMonth + '/' + toYear,
      timePeriod: newAchieverDetails.timePeriod,
      croppedImageData: image,
      employeeId: getEmployeeId(
        allActiveEmployees,
        newAchieverDetails.employeeName,
      ),
      description: achievementDescription,
    }
    addButtonHandler(finalData)
    clearLocalDetails()
  }

  return (
    <CForm onSubmit={submitNewAchievementHandler}>
      <AchievementEntryContainer>
        <CFormLabel
          data-testid="ach-name-label"
          className={newAchievementLabelClass}
        >
          Achievement Type :
          <span
            className={
              newAchieverDetails.achievementName === null ||
              newAchieverDetails.achievementName === selectAchievementType
                ? TextDanger
                : TextWhite
            }
          >
            *
          </span>
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
        {userAccessToViewAchievementType?.viewaccess && (
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
        )}
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
            Time Period (year&apos;s) :
            <span
              className={
                newAchieverDetails.timePeriod === null ||
                newAchieverDetails.timePeriod === '' ||
                newAchieverDetails.timePeriod === '0' ||
                newAchieverDetails.timePeriod.trim().length === 0 ||
                !Number(newAchieverDetails.timePeriod)
                  ? TextDanger
                  : TextWhite
              }
            >
              *
            </span>
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
            From Date :
            <span
              className={
                newAchieverDetails.startDate === null ||
                newAchieverDetails.startDate === ''
                  ? TextDanger
                  : TextWhite
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol md={3}>
            <ReactDatePicker
              dateFormat="MMMM yyyy"
              autoComplete="off"
              className="form-control form-control-sm sh-date-picker"
              data-testid="startDate"
              placeholderText="MM-YYYY"
              peekNextMonth
              showMonthYearPicker
              dropdownMode="select"
              value={getDateForamatted(newAchieverDetails.startDate)}
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
            To Date :
            <span
              className={
                newAchieverDetails.endDate === null ||
                newAchieverDetails.endDate === ''
                  ? TextDanger
                  : TextWhite
              }
            >
              *
            </span>
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
              value={getDateForamatted(newAchieverDetails.endDate)}
              onChange={(date: Date) => {
                setNewAchieverDetails({
                  ...newAchieverDetails,
                  endDate: moment(date).format(commonDateFormat),
                })
              }}
            />
            <CCol>{datesErrorMessage}</CCol>
          </CCol>
        </AchievementEntryContainer>
      )}
      <AchievementEntryContainer>
        <CFormLabel
          data-testid="ach-desc"
          className={`${newAchievementLabelClass} align-self-start`}
        >
          Description :<span className={TextWhite}>*</span>
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
        <CFormLabel data-testid="ach-pic" className={newAchievementLabelClass}>
          Picture :<span className={TextWhite}>*</span>
        </CFormLabel>
        <CCol sm={12} md={3}>
          <AchieverImage
            file={`${base64Extension}${selectedEmployee?.imageData}`}
            empId={selectedEmployee?.id}
            onUploadImage={croppedImageDataHandler}
          />
        </CCol>
      </AchievementEntryContainer>
      {userAccessToAchievement?.createaccess && (
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
      )}
    </CForm>
  )
}

export default AddAchieverForm
