import { CCol, CFormLabel } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React from 'react'
import { TextWhite } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { newAchievementLabelClass } from '../../AchievementConstants'
import AchievementEntryContainer from '../AchievementTypeList/AchievementEntryContainer'

const AchieverDescription = ({
  showEditor,
  achievementDescription,
  descriptionHandler,
}: {
  showEditor: boolean
  achievementDescription: string
  descriptionHandler: (value: string) => void
}): JSX.Element => {
  return (
    <>
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
    </>
  )
}

export default AchieverDescription
