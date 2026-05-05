import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1 text-gray-700 font-medium'>{label}</label>}
      
      <Controller
      name={name || "content"}
      control={control}
      render={({field: {onChange, value}}) => (
        <Editor
        apiKey='b47kpjg06fursa8nwcyg69qqc1hool1x02uelz92vibiv4a2'
        value={value || defaultValue}
        onEditorChange={onChange}
        init={{
            height: 400,
            menubar: false,
            skin: "oxide-dark",
            content_css: "dark",
            plugins: [
                "lists",
                "link",
                "image",
                "code"
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #1e293b; color: #f1f5f9; }"
        }}
        />
      )}
      />

    </div>
  )
}
