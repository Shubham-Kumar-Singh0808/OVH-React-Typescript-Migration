import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw, ContentState, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface ITextEditorProps {
  value: string
  setFieldValue: (val: string) => void
}

export const OTextEditor = ({ value, setFieldValue }: ITextEditorProps) => {
  const prepareDraft = (value: string) => {
    const draft = htmlToDraft(value)
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
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
