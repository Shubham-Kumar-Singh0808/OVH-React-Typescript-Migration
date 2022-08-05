/* eslint-disable import/named */
import { classes, AutoMap } from '@automapper/classes'
import {
  createMapper,
  createMap,
  Converter,
  forMember,
  convertUsing,
} from '@automapper/core'
import { EmployeeVisaDetails } from '../types/MyProfile/PersonalInfoTab/personalInfoTypes'

const mapper = createMapper({ strategyInitializer: classes() })

export const bigintToNumber: Converter<bigint, number> = {
  convert(source) {
    return Number(source)
  },
}

export const dateToString: Converter<Date, string> = {
  convert(source) {
    return source.toLocaleDateString('fr', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  },
}

export const numberToBigInt: Converter<number, bigint> = {
  convert(source) {
    return BigInt(source)
  },
}

export const stringToDate: Converter<string, Date> = {
  convert(source) {
    return new Date(source)
  },
}

export class EmployeeVisaDetailsDto {
  @AutoMap()
  id?: number

  @AutoMap()
  empId?: number

  @AutoMap()
  empName: string

  @AutoMap()
  visaTypeId?: number

  @AutoMap()
  visaType?: string

  @AutoMap()
  countryId?: number

  @AutoMap()
  countryName?: string

  @AutoMap()
  dateOfIssue?: string

  @AutoMap()
  dateOfExpire?: string

  @AutoMap()
  createdBy?: string

  @AutoMap()
  updatedBy?: string

  @AutoMap()
  createdDate?: string

  @AutoMap()
  updatedDate?: string

  @AutoMap()
  visaDetailsPath?: string

  @AutoMap()
  visaDetailsData?: string

  @AutoMap()
  visaThumbPicture?: string

  mapToDto(source: EmployeeVisaDetails): EmployeeVisaDetailsDto {
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

    return mapper.map(source, EmployeeVisaDetails, EmployeeVisaDetailsDto)
  }

  mapFromDto(source: EmployeeVisaDetailsDto): EmployeeVisaDetails {
    createMap(
      mapper,
      EmployeeVisaDetailsDto,
      EmployeeVisaDetails,
      forMember(
        (data) => data.id,
        convertUsing(numberToBigInt, (source) => source.id),
      ),
      forMember(
        (data) => data.empId,
        convertUsing(numberToBigInt, (source) => source.empId),
      ),
      forMember(
        (data) => data.visaTypeId,
        convertUsing(numberToBigInt, (source) => source.visaTypeId),
      ),
      forMember(
        (data) => data.countryId,
        convertUsing(numberToBigInt, (source) => source.countryId),
      ),
      forMember(
        (data) => data.dateOfIssue,
        convertUsing(stringToDate, (source) => source.dateOfIssue),
      ),
      forMember(
        (data) => data.dateOfExpire,
        convertUsing(stringToDate, (source) => source.dateOfExpire),
      ),
      forMember(
        (data) => data.createdDate,
        convertUsing(stringToDate, (source) => source.createdDate),
      ),
      forMember(
        (data) => data.updatedDate,
        convertUsing(stringToDate, (source) => source.updatedDate),
      ),
    )

    return mapper.map(source, EmployeeVisaDetailsDto, EmployeeVisaDetails)
  }

  // testMapping() {
  //   createMap(
  //     mapper,
  //     EmployeeVisaDetails,
  //     EmployeeVisaDetailsDto,
  //     forMember(
  //       (data) => data.id,
  //       convertUsing(bigintToNumber, (source) => source.id),
  //     ),
  //     forMember(
  //       (data) => data.empId,
  //       convertUsing(bigintToNumber, (source) => source.empId),
  //     ),
  //     forMember(
  //       (data) => data.visaTypeId,
  //       convertUsing(bigintToNumber, (source) => source.visaTypeId),
  //     ),
  //     forMember(
  //       (data) => data.countryId,
  //       convertUsing(bigintToNumber, (source) => source.countryId),
  //     ),
  //     forMember(
  //       (data) => data.dateOfIssue,
  //       convertUsing(dateToString, (source) => source.dateOfIssue),
  //     ),
  //     forMember(
  //       (data) => data.dateOfExpire,
  //       convertUsing(dateToString, (source) => source.dateOfExpire),
  //     ),
  //     forMember(
  //       (data) => data.createdDate,
  //       convertUsing(dateToString, (source) => source.createdDate),
  //     ),
  //     forMember(
  //       (data) => data.updatedDate,
  //       convertUsing(dateToString, (source) => source.updatedDate),
  //     ),
  //     // forMember((data) => data.empName, ignore()),
  //     // forMember((data) => data.countryName, ignore()),
  //     // forMember((data) => data.createdBy, ignore()),
  //   )

  //   const visaDetails = new EmployeeVisaDetails()
  //   visaDetails.id = BigInt(1)
  //   visaDetails.empId = BigInt(1)
  //   visaDetails.empName = 'sample'
  //   visaDetails.visaTypeId = BigInt(1)
  //   visaDetails.visaType = 'type'
  //   visaDetails.countryId = BigInt(1)
  //   visaDetails.countryName = 'country'
  //   visaDetails.dateOfIssue = new Date()
  //   visaDetails.dateOfExpire = new Date()
  //   visaDetails.createdBy = 'created by'
  //   visaDetails.updatedBy = 'updated by'
  //   visaDetails.createdDate = new Date()
  //   visaDetails.updatedDate = new Date()
  //   visaDetails.visaDetailsPath = null
  //   visaDetails.visaDetailsData = null
  //   visaDetails.visaThumbPicture = null

  //   return mapper.map(visaDetails, EmployeeVisaDetails, EmployeeVisaDetailsDto)
  // }
}
