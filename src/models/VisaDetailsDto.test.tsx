import '@testing-library/jest-dom'
/* eslint-disable import/named */
import { classes } from '@automapper/classes'
import {
  createMapper,
  createMap,
  Converter,
  forMember,
  convertUsing,
} from '@automapper/core'
import { EmployeeVisaDetailsDto } from './VisaDetailsDto'
import { EmployeeVisaDetails } from '../types/MyProfile/PersonalInfoTab/personalInfoTypes'
// import { render, screen, waitFor } from '../test/testUtils'

describe('EmployeeVisaDetailsDto class', () => {
  const mapper = createMapper({ strategyInitializer: classes() })
  const dto = new EmployeeVisaDetailsDto()

  const bigintToNumber: Converter<bigint, number> = {
    convert(source) {
      return Number(source)
    },
  }

  const dateToString: Converter<Date, string> = {
    convert(source) {
      return source.toLocaleDateString('fr', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    },
  }

  test('test functions on class', () => {
    expect(typeof dto.mapToDto).toBe('function')
    expect(typeof dto.mapFromDto).toBe('function')
  })

  test('test mapper', () => {
    createMap(
      mapper,
      EmployeeVisaDetails,
      EmployeeVisaDetailsDto,
      forMember(
        (data) => data.id,
        convertUsing(bigintToNumber, (source) => source.id),
      ),
      forMember(
        (data) => data.empId,
        convertUsing(bigintToNumber, (source) => source.empId),
      ),
      forMember(
        (data) => data.visaTypeId,
        convertUsing(bigintToNumber, (source) => source.visaTypeId),
      ),
      forMember(
        (data) => data.countryId,
        convertUsing(bigintToNumber, (source) => source.countryId),
      ),
      forMember(
        (data) => data.dateOfIssue,
        convertUsing(dateToString, (source) => source.dateOfIssue),
      ),
      forMember(
        (data) => data.dateOfExpire,
        convertUsing(dateToString, (source) => source.dateOfExpire),
      ),
      forMember(
        (data) => data.createdDate,
        convertUsing(dateToString, (source) => source.createdDate),
      ),
      forMember(
        (data) => data.updatedDate,
        convertUsing(dateToString, (source) => source.updatedDate),
      ),
    )

    const visaDetails = new EmployeeVisaDetails()
    visaDetails.id = BigInt(1)
    visaDetails.empId = BigInt(1)
    visaDetails.empName = 'sample'
    visaDetails.visaTypeId = BigInt(1)
    visaDetails.visaType = 'type'
    visaDetails.countryId = BigInt(1)
    visaDetails.countryName = 'country'
    visaDetails.dateOfIssue = new Date()
    visaDetails.dateOfExpire = new Date()
    visaDetails.createdBy = 'created by'
    visaDetails.updatedBy = 'updated by'
    visaDetails.createdDate = new Date()
    visaDetails.updatedDate = new Date()
    visaDetails.visaDetailsPath = null
    visaDetails.visaDetailsData = null
    visaDetails.visaThumbPicture = null

    mapper.map(visaDetails, EmployeeVisaDetails, EmployeeVisaDetailsDto)
  })
})
