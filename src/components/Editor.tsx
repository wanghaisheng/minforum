import 'suneditor/dist/css/suneditor.min.css';
import { useRef } from 'react';
import SunEditorCore from 'suneditor/src/lib/core';
import dynamic from 'next/dynamic';
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
});
import { useTranslation } from './intl/Translation';
import { Button, Popover, Spacer } from '@geist-ui/core';
import { Emoji as Emoticon } from '@geist-ui/icons';
import Emoji from './data/emoji';

type editorProp = {
  lang?: any;
  height?: string;
  value?: string;
  placeholder?: string;
  button?: JSX.Element;
  insertValue?: (value: any) => void;
  onChange?: (value: any) => void;
};

const Editor = (prop: editorProp) => {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleEmoji = (val: string) => {
    editor.current.insertHTML(val);
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <SunEditor
        lang={prop.lang === 'cn' ? 'zh_cn' : prop.lang}
        height={prop.height}
        placeholder={
          prop.placeholder
            ? prop.placeholder
            : useTranslation({ lang: prop.lang, value: 'Type here...' })
        }
        setOptions={{
          resizingBar: false,
          buttonList: [
            [
              'formatBlock',
              'bold',
              'underline',
              'italic',
              'strike',
              'blockquote',
              'showBlocks',
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
        getSunEditorInstance={getSunEditorInstance}
        onChange={(val) => prop.onChange(val)}
      />
      <Spacer />
      <div>
        {prop.button && (
          <Popover
            placement="left"
            content={
              <Emoji
                width={300}
                height={300}
                onPick={handleEmoji}
                lang={prop.lang}
              />
            }
          >
            <span className="emoji-clicker desktop">
              <Emoticon />
            </span>
          </Popover>
        )}

        {prop.button}
      </div>
    </div>
  );
};

export default Editor;
