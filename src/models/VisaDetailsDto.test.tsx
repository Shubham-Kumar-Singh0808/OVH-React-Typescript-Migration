import {
  EmployeeVisaDetailsDto,
  bigintToNumber,
  dateToString,
} from './VisaDetailsDto'
import { EmployeeVisaDetails } from '../types/MyProfile/PersonalInfoTab/personalInfoTypes'

describe('EmployeeVisaDetailsDto class', () => {
  const dto = new EmployeeVisaDetailsDto()

  test('test converter functions', () => {
    const bigintNumber = bigintToNumber.convert(BigInt(1))
    expect(bigintNumber).toBe(Number(1))

    const dateString = dateToString.convert(new Date(2022, 8, 22))
    expect(dateString).toBe('22/8/2022')
  })

  test('test data types for the dto class', () => {
    expect(typeof dto.id).toBeDefined()
    expect(typeof dto.empId).toBeDefined()
    expect(typeof dto.empName).toBeDefined()
    expect(typeof dto.visaTypeId).toBeDefined()
    expect(typeof dto.visaType).toBeDefined()
    expect(typeof dto.countryId).toBeDefined()
    expect(typeof dto.countryName).toBeDefined()
    expect(typeof dto.dateOfIssue).toBeDefined()
    expect(typeof dto.dateOfExpire).toBeDefined()
    expect(typeof dto.createdBy).toBeDefined()
    expect(typeof dto.updatedBy).toBeDefined()
    expect(typeof dto.createdDate).toBeDefined()
    expect(typeof dto.updatedDate).toBeDefined()
    expect(typeof dto.visaDetailsPath).toBeDefined()
    expect(typeof dto.visaDetailsData).toBeDefined()
    expect(typeof dto.visaThumbPicture).toBeDefined()
  })

  test('test functions on class', () => {
    expect(typeof EmployeeVisaDetailsDto.mapToDto).toBe('function')
    expect(typeof EmployeeVisaDetailsDto.mapFromDto).toBe('function')
  })

  test('test mapper', () => {
    const visaDetails = new EmployeeVisaDetails()
    visaDetails.id = BigInt(384)
    visaDetails.empId = BigInt(2013)
    visaDetails.empName = 'sample'
    visaDetails.visaTypeId = BigInt(11)
    visaDetails.visaType = 'type'
    visaDetails.countryId = BigInt(2)
    visaDetails.countryName = 'country'
    visaDetails.dateOfIssue = new Date()
    visaDetails.dateOfExpire = new Date()
    visaDetails.createdBy = 'created by'
    visaDetails.updatedBy = 'updated by'
    visaDetails.createdDate = new Date()
    visaDetails.updatedDate = new Date()

    const mapDto = EmployeeVisaDetailsDto.mapToDto(visaDetails)

    expect(mapDto.id).toEqual(Number(visaDetails.id))
    expect(mapDto.empId).toEqual(Number(visaDetails.empId))
    expect(mapDto.visaTypeId).toEqual(Number(visaDetails.visaTypeId))
    expect(mapDto.countryId).toEqual(Number(visaDetails.countryId))
  })
})
