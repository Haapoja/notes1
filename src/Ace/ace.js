import React from 'react'
import AceEditor from 'react-ace'

export default function ReduxAce (props) {
  const {
    input,
    theme = 'github',
    mode = 'html',
    fontSize = 14,
    tabSize = 2,
    width = '1000px',
    height = '500px',
    ...custom
  } = props
  return (
    <AceEditor
      theme={theme}
      mode={mode}
      fontSize={fontSize}
      tabSize={tabSize}
      width={width}
      height={height}
      editorProps={{$blockScrolling: true}}
      {...input}
      {...custom}
    />
  )
}

