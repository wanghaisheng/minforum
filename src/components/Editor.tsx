import { memo } from 'react';
import dynamic from 'next/dynamic';
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
});
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Mention from './Mention';

type editorProp = {
  height?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
};

const Editor = (prop: editorProp) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <SunEditor
        lang="es"
        height={prop.height}
        placeholder={prop.placeholder ? prop.placeholder : 'Type here....'}
        setOptions={{
          resizingBar: false,
          // plugins: [Mention],
          buttonList: [
            [
              'formatBlock',
              'bold',
              'underline',
              'italic',
              'strike',
              'blockquote',
              'showBlocks',
              {
                name: 'mention',
                dataDisplay: 'command',
                title: 'Mention',
                buttonClass: '',
                innerHTML:
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z"/></svg>'
              },
              'fontColor',
              'hiliteColor',
              'align',
              'list',
              'table',
              'link',
              'image',
              'video',
              'removeFormat'
            ]
          ]
        }}
        defaultValue={prop.value}
        onChange={prop.onChange}
      />
    </div>
  );
};

export default memo(Editor);
