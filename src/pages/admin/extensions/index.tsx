import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  Button,
  Spacer,
  Text,
  Loading,
  Pagination,
  Modal,
  Input,
  Link,
  Toggle
} from '@geist-ui/core';
import {
  ChevronRightCircle,
  ChevronLeftCircle,
  Upload,
  Trash2
} from '@geist-ui/icons';
import toast, { Toaster } from 'react-hot-toast';
import AdminNavbar from 'components/admin/Navbar';
import SearchHeading from 'components/SearchHeading';
import Sidebar from 'components/admin/Sidebar';
import Auth from 'components/admin/Auth';
import ExtensionStore from 'stores/extension';
import { useTranslation, Translation } from 'components/intl/Translation';
import useToken from 'components/Token';
import useSettings from 'components/settings';
import { useRouter } from 'next/router';

const Extensions = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const [modal, toggleModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const router = useRouter();
  const [
    {
      loading,
      total,
      page,
      limit,
      extensions,
      setPage,
      getExtensions,
      uploadExtension,
      updateExtension,
      removeExtension
    }
  ] = useState(() => new ExtensionStore());

  useEffect(() => {
    getExtensions();
  }, [token?.id]);

  const toggleRemove = (id: string, action: boolean) => {
    setId(id);
    toggleDeleteModal(action);
  };

  const handleDelete = async () => {
    await removeExtension({ id }).then((res: any) => {
      if (res.success) {
        router.reload();
      }
    });
  };

  const handleUpdate = async (id: string, active: boolean) => {
    await updateExtension({ id, active }).then((res: any) => {
      if (res.success) {
        router.reload();
      }
    });
  };

  const validateExtension = () => {
    const regex = /^[a-z0-9-]+$/;
    return regex.test(name);
  };

  const handleUpload = async (id: string) => {
    let t = toast.loading(
      useTranslation({
        lang: settings?.language,
        value: 'Uploading extension....'
      })
    );

    let upload: any = document.querySelector(id);

    let formData = new FormData();
    formData.append('file', upload.files[0]);

    await uploadExtension(formData, name)
      .then(async (res: any) => {
        if (res?.success) {
          let _upload: any = document.querySelector(id);
          _upload.value = '';

          toast.dismiss(t);
          toast.success(
            useTranslation({
              lang: settings?.language,
              value: 'Extension uploaded successfully!'
            })
          );

          router.reload();
        } else {
          let _upload: any = document.querySelector(id);
          _upload.value = '';

          toast.dismiss(t);
          toast.error(res.message, {
            duration: 3000
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const paginate = (val: number) => {
    setPage(val);
    getExtensions();
  };

  const renderStatus = (value: boolean) => {
    return (
      <Translation
        lang={settings?.language}
        value={value === true ? 'Active' : 'Inactive'}
      />
    );
  };

  const renderAction = (value: string, rowData: any) => {
    return (
      <>
        <span style={{ position: 'relative', top: -5 }}>
          <Toggle
            scale={3}
            checked={rowData.active}
            onChange={() => handleUpdate(rowData.id, !rowData.active)}
          />
        </span>
        <Spacer inline />
        <Button
          type="error-light"
          auto
          scale={0.5}
          onClick={() => toggleRemove(rowData.id, true)}
          icon={<Trash2 />}
        />
      </>
    );
  };

  return (
    <Auth roles={['admin']}>
      <Toaster />
      <Modal
        visible={deleteModal}
        disableBackdropClick
        onClose={() => toggleDeleteModal(false)}
      >
        <Modal.Content>
          <Text h3>
            <Translation
              lang={settings?.language}
              value="Are you sure you want to delete this extension?"
            />
          </Text>
          <Spacer h={2} />
          <div className="column auto">
            <div>
              <Button
                loading={loading}
                width={'100%'}
                onClick={() => toggleDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="error-light"
                width={'100%'}
                loading={loading}
                onClick={() => handleDelete()}
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
      <Modal
        visible={modal}
        disableBackdropClick
        onClose={() => toggleModal(false)}
      >
        <Modal.Content>
          <h3>
            <Translation lang={settings?.language} value="Add extension" />
          </h3>

          <Input
            scale={1.5}
            width={'100%'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <Translation
              lang={settings?.language}
              value="Extension slug name"
            />
          </Input>
          <Text small style={{ color: '#666' }}>
            <Translation
              lang={settings.language}
              value="Note: The name for the extension should be unique, written in
            lowercase, with no spaces—only hyphens are allowed."
            />
          </Text>
          <Spacer h={2} />

          <div className="column auto">
            <div>
              <Button
                loading={loading}
                width={'100%'}
                onClick={() => toggleModal(false)}
              >
                Cancel
              </Button>
            </div>
            <div>
              {validateExtension() === true ? (
                <Button
                  auto
                  width={'100%'}
                  type="secondary-light"
                  icon={<Upload />}
                  loading={loading}
                >
                  <input
                    type="file"
                    className="file-upload"
                    id="file"
                    accept="application/zip"
                    onChange={() => handleUpload('#file')}
                  />
                  <Translation
                    lang={settings?.language}
                    value="Upload extension"
                  />
                </Button>
              ) : (
                <Button
                  auto
                  width={'100%'}
                  type="secondary-light"
                  icon={<Upload />}
                  loading={loading}
                  onClick={() =>
                    toast.error(
                      useTranslation({
                        lang: settings?.language,
                        value: 'Extension name is required'
                      })
                    )
                  }
                >
                  <Translation
                    lang={settings?.language}
                    value="Upload extension"
                  />
                </Button>
              )}
            </div>
          </div>
        </Modal.Content>
      </Modal>
      <AdminNavbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Extensions'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Extensions'
        })}
      />

      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="extensions"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <SearchHeading
            title={`${useTranslation({
              lang: settings?.language,
              value: 'Extensions'
            })} (${extensions.length})`}
            withoutSearch
          />

          <Button
            type="secondary"
            auto
            scale={0.7}
            icon={<Upload />}
            onClick={() => toggleModal(true)}
          >
            <Translation lang={settings?.language} value="Upload extension" />
          </Button>
          <Spacer inline />
          {/* <Link
            target="_blank"
            href="https://discuss.minforum.org/d/how-to-create-an-extension"
            icon
            color
          >
            <Translation lang={settings?.language} value="Help" />
          </Link> */}

          <Spacer />
          <Table width={'100%'} data={extensions}>
            <Table.Column
              prop="title"
              label={useTranslation({
                lang: settings?.language,
                value: 'Title'
              })}
            />
            <Table.Column
              prop="active"
              label={useTranslation({
                lang: settings?.language,
                value: 'Status'
              })}
              render={renderStatus}
            />
            <Table.Column
              prop="action"
              label={useTranslation({
                lang: settings?.language,
                value: 'Action'
              })}
              render={renderAction}
            />
          </Table>

          {loading ? (
            <Text>
              <Loading>
                <Translation lang={settings?.language} value="Loading" />
              </Loading>
            </Text>
          ) : (
            ''
          )}

          {total >= limit ? (
            <div className="pagination">
              <Pagination
                count={Math.round(total / limit)}
                initialPage={page}
                limit={limit}
                onChange={paginate}
              >
                <Pagination.Next>
                  <ChevronRightCircle />
                </Pagination.Next>
                <Pagination.Previous>
                  <ChevronLeftCircle />
                </Pagination.Previous>
              </Pagination>
            </div>
          ) : (
            ''
          )}
        </main>
      </div>
    </Auth>
  );
});

export default Extensions;
