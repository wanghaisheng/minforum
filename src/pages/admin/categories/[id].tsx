import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Spacer,
  Text,
  Select,
  Input,
  Textarea,
  Toggle,
  Popover
} from '@geist-ui/core';
import toast, { Toaster } from 'react-hot-toast';
import { ChromePicker } from 'react-color';
import { useRouter } from 'next/router';
import AdminNavbar from 'components/admin/navbar';
import Sidebar from 'components/admin/sidebar';
import Auth from 'components/admin/auth';
import CategoryStore from 'stores/category';
import UserStore from 'stores/user';
import { translation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';
import CustomIcon from 'components/data/icon/icon';
import IconWidget from 'components/data/icon/widget';

const EditCategory = observer(() => {
  const token = useToken();
  const router = useRouter();
  const settings = useSettings();
  const { id } = router.query;
  const [showColor, toggleColor] = useState(false);
  const [visible, setVisible] = useState(false);

  const [{ users, getModerators }] = useState(() => new UserStore());

  const [{ loading, category, setCategory, getCategory, updateCategory }] =
    useState(() => new CategoryStore());
  const { title, description, color, authRequired, moderator, icon } = category;

  useEffect(() => {
    getModerators();
    let _id: any = id;
    router.isReady ? getCategory(_id) : null;
  }, [router, token?.id]);

  const changeHandler = (next) => {
    setVisible(next);
  };

  const save = async () => {
    if (!title || title.length < 3) {
      toast.error(
        translation({
          lang: settings?.language,
          value: 'Title is too short. Minimum of 3 characters.'
        })
      );
    } else if (!description) {
      toast.error(
        translation({
          lang: settings?.language,
          value: 'Description is required'
        })
      );
    } else {
      setCategory({
        ...category,
        color: color ? color : '#000000',
        authRequired: authRequired ? authRequired : false,
        moderator: moderator ? moderator : []
      });

      await updateCategory(category).then((res: any) => {
        if (res.success) {
          toast.success(
            translation({
              lang: settings?.language,
              value: 'Category updated successfully'
            })
          );
        } else {
          toast.error(
            translation({
              lang: settings?.language,
              value: 'Unable to update category. Please try again!'
            })
          );
        }
      });
    }
  };

  return (
    <Auth roles={['admin']}>
      <Toaster />
      <AdminNavbar
        title={translation({
          lang: settings?.language,
          value: 'Edit category'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Edit category'
        })}
      />

      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="categories"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <div className="boxed">
            <h3>
              <Translation lang={settings?.language} value="Edit category" />
            </h3>
            <Spacer />
            <Text>
              <Translation lang={settings?.language} value="Color" />
            </Text>

            <div
              onClick={() => toggleColor(!showColor)}
              className="custom-badge with-border large"
              style={{ '--category-color': '#fff' } as React.CSSProperties}
            >
              <div
                className="inner"
                style={
                  {
                    '--category-inner-color': color ? color : '#000000'
                  } as React.CSSProperties
                }
              >
                &nbsp;
              </div>
            </div>
            {showColor ? (
              <div style={{ position: 'absolute', marginTop: -15, zIndex: 5 }}>
                <ChromePicker
                  color={color}
                  onChange={(val) => {
                    setCategory({ ...category, ...{ color: val.hex } });
                  }}
                />
              </div>
            ) : (
              ''
            )}

            <Text>
              <Translation lang={settings?.language} value="Icon" />
            </Text>
            <Popover
              hideArrow
              visible={visible}
              onVisibleChange={changeHandler}
              content={
                <IconWidget
                  width={350}
                  height={300}
                  lang={settings?.language}
                  onPick={(val) => {
                    setCategory({ ...category, ...{ icon: val } });
                    setVisible(false);
                  }}
                />
              }
              width={'100%'}
            >
              <Button icon={<CustomIcon name={icon?.icon} type={icon?.type} />}>
                Change icon
              </Button>
            </Popover>
            <Text>
              <Translation lang={settings?.language} value="Title" />
            </Text>
            <Input
              width={'100%'}
              value={title}
              onChange={(e) =>
                setCategory({ ...category, ...{ title: e.target.value } })
              }
            />
            <Text>
              <Translation lang={settings?.language} value="Description" />
            </Text>
            <Textarea
              width={'100%'}
              value={description}
              onChange={(e) =>
                setCategory({ ...category, ...{ description: e.target.value } })
              }
            />
            <Spacer />
            {/* <Text>
              <Translation lang={settings?.language} value="Moderators" />
            </Text>
            <Select
              placeholder={translation({
                lang: settings?.language,
                value: 'Choose one or more'
              })}
              multiple
              value={moderator}
              width={'100%'}
              onChange={(val) => setCategory({ ...category, moderator: val })}
            >
              {users.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select> */}
            <Text>
              <Toggle
                type="secondary"
                checked={authRequired}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    ...{ authRequired: e.target.checked }
                  })
                }
                mb={'5px'}
              />
              <Text small>
                {' '}
                &nbsp;
                <Translation
                  lang={settings?.language}
                  value="Authentication required"
                />
              </Text>
            </Text>
            <Button
              loading={loading}
              type="secondary-light"
              width="100%"
              onClick={save}
            >
              <Translation lang={settings?.language} value="Save" />
            </Button>
          </div>
        </main>
      </div>
    </Auth>
  );
});

export default EditCategory;
