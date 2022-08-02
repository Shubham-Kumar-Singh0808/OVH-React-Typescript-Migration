import { ContentState, EditorState, convertToRaw } from 'draft-js'
import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { TextEditorProps } from '../../types/commonTypes'

export const OTextEditor = ({
  value,
  setFieldValue,
}: TextEditorProps): JSX.Element => {
  const prepareDraft = (value: string) => {
    const draft = htmlToDraft(value)
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks)
    return EditorState.createWithContent(contentState)
  }

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty(),
  )

  const onEditorStateChange = (editorState: EditorState) => {
    const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setFieldValue(forFormik)
    setEditorState(editorState)
  }
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="custom-wrapper"
        editorClassName="custom-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}
