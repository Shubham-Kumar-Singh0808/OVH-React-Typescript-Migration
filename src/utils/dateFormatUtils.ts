export const localeDateFormat = (date: string): string => {
  if (date) {
    const deviceLocale: string =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language

    const tempDate = date
    const dateParts: string[] | string = date ? tempDate.split('/') : ''
    const newDate = date
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date()

    return newDate.toLocaleDateString(deviceLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } else {
    return ''
  }
}

export const reformatDate = (date: string): Date => {
  const dateParts: string[] | string = date ? date.split('/') : ''
  return date
    ? new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0]),
      )
    : new Date()
}

const format1 = 'yyyy/mm/dd'
const format2 = 'dd/mm/yyyy'
const format3 = 'dd/mm/yyyy'
const format4 = 'dd.mm.yyyy'
const format5 = 'd. m. yyyy'
const format6 = 'mm/dd/yyyy'
const format7 = 'yyyy-mm-dd'
const format8 = 'mm/dd/yyyy'
export const dateFormatPerLocale = [
  { label: 'af-ZA', format: format1 },
  { label: 'am-ET', format: 'd/M/yyyy' },
  { label: 'ar-AE', format: format2 },
  { label: 'ar-BH', format: format2 },
  { label: 'ar-DZ', format: format3 },
  { label: 'ar-EG', format: format2 },
  { label: 'ar-IQ', format: format2 },
  { label: 'ar-JO', format: format2 },
  { label: 'ar-KW', format: format2 },
  { label: 'ar-LB', format: format2 },
  { label: 'ar-LY', format: format2 },
  { label: 'ar-MA', format: format3 },
  { label: 'ar-OM', format: format2 },
  { label: 'ar-QA', format: format2 },
  { label: 'ar-SA', format: 'dd/MM/yy' },
  { label: 'ar-SY', format: format2 },
  { label: 'ar-TN', format: format3 },
  { label: 'ar-YE', format: format2 },
  { label: 'arn-CL', format: format3 },
  { label: 'as-IN', format: format3 },
  { label: 'az-Cyrl-AZ', format: format4 },
  { label: 'az-Latn-AZ', format: format4 },
  { label: 'ba-RU', format: 'dd.MM.yy' },
  { label: 'be-BY', format: format4 },
  { label: 'bg-BG', format: 'dd.M.yyyy' },
  { label: 'bn-BD', format: 'dd-MM-yy' },
  { label: 'bn-IN', format: 'dd-MM-yy' },
  { label: 'bo-CN', format: 'yyyy/M/d' },
  { label: 'br-FR', format: format2 },
  { label: 'bs-Cyrl-BA', format: 'd.M.yyyy' },
  { label: 'bs-Latn-BA', format: 'd.M.yyyy' },
  { label: 'ca-ES', format: format2 },
  { label: 'co-FR', format: format2 },
  { label: 'cs-CZ', format: 'd.M.yyyy' },
  { label: 'cy-GB', format: format2 },
  { label: 'da-DK', format: format3 },
  { label: 'de-AT', format: format4 },
  { label: 'de-CH', format: format4 },
  { label: 'de-DE', format: format4 },
  { label: 'de-LI', format: format4 },
  { label: 'de-LU', format: format4 },
  { label: 'dsb-DE', format: format5 },
  { label: 'dv-MV', format: 'dd/MM/yy' },
  { label: 'el-GR', format: 'd/M/yyyy' },
  { label: 'en', format: format2 },
  { label: 'en-029', format: format6 },
  { label: 'en-AU', format: 'd/MM/yyyy' },
  { label: 'en-BZ', format: format2 },
  { label: 'en-CA', format: format2 },
  { label: 'en-GB', format: format2 },
  { label: 'en-IE', format: format2 },
  { label: 'en-IN', format: format2 },
  { label: 'en-JM', format: format2 },
  { label: 'en-MY', format: 'd/M/yyyy' },
  { label: 'en-NZ', format: 'd/MM/yyyy' },
  { label: 'en-PH', format: format8 },
  { label: 'en-SG', format: 'd/M/yyyy' },
  { label: 'en-TT', format: format2 },
  { label: 'en-US', format: format8 },
  { label: 'en-ZA', format: format1 },
  { label: 'en-ZW', format: format8 },
  { label: 'es-AR', format: format2 },
  { label: 'es-BO', format: format2 },
  { label: 'es-CL', format: format3 },
  { label: 'es-CO', format: format2 },
  { label: 'es-CR', format: format2 },
  { label: 'es-DO', format: format2 },
  { label: 'es-EC', format: format2 },
  { label: 'es-ES', format: format2 },
  { label: 'es-GT', format: format2 },
  { label: 'es-HN', format: format2 },
  { label: 'es-MX', format: format2 },
  { label: 'es-NI', format: format2 },
  { label: 'es-PA', format: format6 },
  { label: 'es-PE', format: format2 },
  { label: 'es-PR', format: format2 },
  { label: 'es-PY', format: format2 },
  { label: 'es-SV', format: format2 },
  { label: 'es-US', format: format8 },
  { label: 'es-UY', format: format2 },
  { label: 'es-VE', format: format2 },
  { label: 'et-EE', format: 'd.MM.yyyy' },
  { label: 'eu-ES', format: format1 },
  { label: 'fa-IR', format: format6 },
  { label: 'fi-FI', format: 'd.M.yyyy' },
  { label: 'fil-PH', format: format8 },
  { label: 'fo-FO', format: format3 },
  { label: 'fr-BE', format: 'd/MM/yyyy' },
  { label: 'fr-CA', format: format7 },
  { label: 'fr-CH', format: format4 },
  { label: 'fr-FR', format: format2 },
  { label: 'fr-LU', format: format2 },
  { label: 'fr-MC', format: format2 },
  { label: 'fy-NL', format: 'd-M-yyyy' },
  { label: 'ga-IE', format: format2 },
  { label: 'gd-GB', format: format2 },
  { label: 'gl-ES', format: 'dd/MM/yy' },
  { label: 'gsw-FR', format: format2 },
  { label: 'gu-IN', format: 'dd-MM-yy' },
  { label: 'ha-Latn-NG', format: 'd/M/yyyy' },
  { label: 'he-IL', format: format2 },
  { label: 'hi-IN', format: format3 },
  { label: 'hr-BA', format: 'd.M.yyyy.' },
  { label: 'hr-HR', format: 'd.M.yyyy' },
  { label: 'hsb-DE', format: format5 },
  { label: 'hu-HU', format: 'yyyy. MM. dd.' },
  { label: 'hy-AM', format: format4 },
  { label: 'id-ID', format: format2 },
  { label: 'ig-NG', format: 'd/M/yyyy' },
  { label: 'ii-CN', format: 'yyyy/M/d' },
  { label: 'is-IS', format: 'd.M.yyyy' },
  { label: 'it-CH', format: format4 },
  { label: 'it-IT', format: format2 },
  { label: 'iu-Cans-CA', format: 'd/M/yyyy' },
  { label: 'iu-Latn-CA', format: 'd/MM/yyyy' },
  { label: 'ja-JP', format: format1 },
  { label: 'ka-GE', format: format4 },
  { label: 'kk-KZ', format: format4 },
  { label: 'kl-GL', format: format3 },
  { label: 'km-KH', format: format7 },
  { label: 'kn-IN', format: 'dd-MM-yy' },
  { label: 'ko-KR', format: 'yyyy. MM. dd' },
  { label: 'kok-IN', format: format3 },
  { label: 'ky-KG', format: 'dd.MM.yy' },
  { label: 'lb-LU', format: format2 },
  { label: 'lo-LA', format: format2 },
  { label: 'lt-LT', format: 'yyyy.MM.dd' },
  { label: 'lv-LV', format: 'yyyy.MM.dd.' },
  { label: 'mi-NZ', format: format2 },
  { label: 'mk-MK', format: format4 },
  { label: 'ml-IN', format: 'dd-MM-yy' },
  { label: 'mn-MN', format: 'yy.MM.dd' },
  { label: 'mn-Mong-CN', format: 'yyyy/M/d' },
  { label: 'moh-CA', format: format8 },
  { label: 'mr-IN', format: format3 },
  { label: 'ms-BN', format: format2 },
  { label: 'ms-MY', format: format2 },
  { label: 'mt-MT', format: format2 },
  { label: 'nb-NO', format: format4 },
  { label: 'ne-NP', format: format8 },
  { label: 'nl-BE', format: 'd/MM/yyyy' },
  { label: 'nl-NL', format: 'd-M-yyyy' },
  { label: 'nn-NO', format: format4 },
  { label: 'nso-ZA', format: format1 },
  { label: 'oc-FR', format: format2 },
  { label: 'or-IN', format: 'dd-MM-yy' },
  { label: 'pa-IN', format: 'dd-MM-yy' },
  { label: 'pl-PL', format: format4 },
  { label: 'prs-AF', format: 'dd/MM/yy' },
  { label: 'ps-AF', format: 'dd/MM/yy' },
  { label: 'pt-BR', format: 'd/M/yyyy' },
  { label: 'pt-PT', format: format3 },
  { label: 'qut-GT', format: format2 },
  { label: 'quz-BO', format: format2 },
  { label: 'quz-EC', format: format2 },
  { label: 'quz-PE', format: format2 },
  { label: 'rm-CH', format: format2 },
  { label: 'ro-RO', format: format4 },
  { label: 'ru-RU', format: format4 },
  { label: 'rw-RW', format: format8 },
  { label: 'sa-IN', format: format3 },
  { label: 'sah-RU', format: 'MM.dd.yyyy' },
  { label: 'se-FI', format: 'd.M.yyyy' },
  { label: 'se-NO', format: format4 },
  { label: 'se-SE', format: format7 },
  { label: 'si-LK', format: format7 },
  { label: 'sk-SK', format: format5 },
  { label: 'sl-SI', format: 'd.M.yyyy' },
  { label: 'sma-NO', format: format4 },
  { label: 'sma-SE', format: format7 },
  { label: 'smj-NO', format: format4 },
  { label: 'smj-SE', format: format7 },
  { label: 'smn-FI', format: 'd.M.yyyy' },
  { label: 'sms-FI', format: 'd.M.yyyy' },
  { label: 'sq-AL', format: format7 },
  { label: 'sr-Cyrl-BA', format: 'd.M.yyyy' },
  { label: 'sr-Cyrl-CS', format: 'd.M.yyyy' },
  { label: 'sr-Cyrl-ME', format: 'd.M.yyyy' },
  { label: 'sr-Cyrl-RS', format: 'd.M.yyyy' },
  { label: 'sr-Latn-BA', format: 'd.M.yyyy' },
  { label: 'sr-Latn-CS', format: 'd.M.yyyy' },
  { label: 'sr-Latn-ME', format: 'd.M.yyyy' },
  { label: 'sr-Latn-RS', format: 'd.M.yyyy' },
  { label: 'sv-FI', format: 'd.M.yyyy' },
  { label: 'sv-SE', format: format7 },
  { label: 'sw-KE', format: format8 },
  { label: 'syr-SY', format: format2 },
  { label: 'ta-IN', format: format3 },
  { label: 'te-IN', format: 'dd-MM-yy' },
  { label: 'tg-Cyrl-TJ', format: 'dd.MM.yy' },
  { label: 'th-TH', format: 'd/M/yyyy' },
  { label: 'tk-TM', format: 'dd.MM.yy' },
  { label: 'tn-ZA', format: format1 },
  { label: 'tr-TR', format: format4 },
  { label: 'tt-RU', format: format4 },
  { label: 'tzm-Latn-DZ', format: format3 },
  { label: 'ug-CN', format: 'yyyy-M-d' },
  { label: 'uk-UA', format: format4 },
  { label: 'ur-PK', format: format2 },
  { label: 'uz-Cyrl-UZ', format: format4 },
  { label: 'uz-Latn-UZ', format: 'dd/MM yyyy' },
  { label: 'vi-VN', format: format2 },
  { label: 'wo-SN', format: format2 },
  { label: 'xh-ZA', format: format1 },
  { label: 'yo-NG', format: 'd/M/yyyy' },
  { label: 'zh-CN', format: 'yyyy/M/d' },
  { label: 'zh-HK', format: 'd/M/yyyy' },
  { label: 'zh-MO', format: 'd/M/yyyy' },
  { label: 'zh-SG', format: 'd/M/yyyy' },
  { label: 'zh-TW', format: 'yyyy/M/d' },
  { label: 'zu-ZA', format: format1 },
]

export const commonDateFormat = 'L'

export const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
