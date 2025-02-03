import 'suneditor/dist/css/suneditor.min.css';
import { useRef, useState } from 'react';
import SunEditorCore from 'suneditor/src/lib/core';
import dynamic from 'next/dynamic';
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false
});
import { Translation, useTranslation } from './intl/translation';
import { Button, Popover, Spacer, Input, User, Loading } from '@geist-ui/core';
import { Emoji as Emoticon } from '@geist-ui/icons';
import { UserIcon } from 'hugeicons-react';
import Emoji from './data/emoji';
import UserStore from 'stores/user';
import { userProp } from 'interfaces/user';
import { observer } from 'mobx-react-lite';

type editorProp = {
  lang?: any;
  height?: string;
  value?: string;
  placeholder?: string;
  button?: JSX.Element;
  showEmoji?: boolean;
  mentionButton?: boolean;
  insertValue?: (value: any) => void;
  onChange?: (value: any) => void;
};

const Editor = (prop: editorProp) => {
  const editor = useRef<SunEditorCore>();
  const [modal, toggleModal] = useState(false);
  const [store] = useState(() => new UserStore());

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleEmoji = (val: string) => {
    editor.current.insertHTML(val);
  };

  const handleUser = (val: string) => {
    editor.current.insertHTML(val);
    toggleModal(false);
  };

  const handleSearch = async (val: string) => {
    val = val.trim();
    if (val.length) {
      val = val.replace('@', '');
      await store.searchUsers(val);
    } else {
      store.setUsers([]);
    }
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
        {prop.showEmoji && (
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
        {prop.mentionButton && (
          <>
            <Popover
              placement="topStart"
              visible={modal}
              content={
                <div
                  style={{
                    width: 230,
                    height: 200,
                    padding: 10,
                    overflow: 'auto'
                  }}
                >
                  <Input
                    width={'100%'}
                    placeholder={useTranslation({
                      lang: prop.lang,
                      value: 'Search user....'
                    })}
                    iconRight={store.loading && <Loading />}
                    onKeyUp={(e) => handleSearch(e.target.value)}
                  />
                  <Spacer />
                  <div>
                    {store?.users?.map((item: userProp) => (
                      <div
                        className="user-alone"
                        key={item.id}
                        onClick={() => handleUser(`@${item.username} &nbsp;`)}
                      >
                        <User
                          src={
                            item.photo
                              ? `/storage/${item.photo}`
                              : `/images/avatar.png`
                          }
                          name={item.name}
                        >
                          @{item.username}
                        </User>
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <Button
                auto
                icon={<UserIcon />}
                onClick={() => toggleModal(!modal)}
              >
                <Translation lang={prop.lang} value={'Mention user'} />
              </Button>
            </Popover>
            <Spacer inline />
          </>
        )}

        {prop.button}
      </div>
    </div>
  );
};

export default observer(Editor);
