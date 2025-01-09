import { Link, Tooltip } from '@geist-ui/core';
import NextLink from 'next/link';
import {
  Activity,
  Archive,
  AlertTriangle,
  Users,
  Layers,
  Settings,
  BarChart2,
  FileText
} from '@geist-ui/icons';
import { useTranslation, Translation } from 'components/intl/Translation';

type sidebarProps = {
  active: string;
  lang: string;
  role: string;
};

const Sidebar = (props: sidebarProps) => {
  const { active, lang, role } = props;

  const Admin = () => (
    <>
      <NextLink href="/admin">
        <Link className={`link ${active === 'dashboard' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Dashboard' })}
            placement="right"
          >
            <Activity
              className="icon"
              color={active === 'dashboard' ? '#000' : '#999'}
            />
          </Tooltip>
          <span className="sidelink">
            <Translation lang={lang} value="Dashboard" />
          </span>
        </Link>
      </NextLink>
      <NextLink href="/admin/analytics">
        <Link className={`link ${active === 'analytics' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Analytics' })}
            placement="right"
          >
            <BarChart2
              className="icon"
              color={active === 'analytics' ? '#000' : '#999'}
            />
          </Tooltip>
          <span className="sidelink">
            <Translation lang={lang} value="Analytics" />
          </span>
        </Link>
      </NextLink>
      <NextLink href="/admin/users">
        <Link className={`link ${active === 'users' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Users' })}
            placement="right"
          >
            <Users
              className="icon"
              color={active === 'users' ? '#000' : '#999'}
            />
          </Tooltip>
          <span className="sidelink">
            <Translation lang={lang} value="Users" />
          </span>
        </Link>
      </NextLink>

      <NextLink href="/admin/discussions">
        <Link className={`link ${active === 'discussions' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Discussions' })}
            placement="right"
          >
            <Archive
              className="icon"
              color={active === 'discussions' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Discussions" />
          </span>
        </Link>
      </NextLink>

      <NextLink href="/admin/reports">
        <Link
          href="/admin/reports"
          className={`link ${active === 'reports' ? 'active' : ''}`}
        >
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Reports' })}
            placement="right"
          >
            <AlertTriangle
              className="icon"
              color={active === 'reports' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Reports" />
          </span>
        </Link>
      </NextLink>

      <NextLink href="/admin/categories">
        <Link className={`link ${active === 'categories' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Categories' })}
            placement="right"
          >
            <Layers
              className="icon"
              color={active === 'categories' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Categories" />
          </span>
        </Link>
      </NextLink>

      <NextLink href="/admin/themes">
        <Link className={`link ${active === 'themes' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Themes' })}
            placement="right"
          >
            <FileText
              className="icon"
              color={active === 'themes' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Themes" />
          </span>
        </Link>
      </NextLink>
      <NextLink href="/admin/settings">
        <Link className={`link ${active === 'settings' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Settings' })}
            placement="right"
          >
            <Settings
              className="icon"
              color={active === 'settings' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Settings" />
          </span>
        </Link>
      </NextLink>
    </>
  );

  const Moderator = () => (
    <>
      <NextLink href="/admin">
        <Link className={`link ${active === 'dashboard' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Dashboard' })}
            placement="right"
          >
            <Activity
              className="icon"
              color={active === 'dashboard' ? '#000' : '#999'}
            />
          </Tooltip>
          <span className="sidelink">
            <Translation lang={lang} value="Dashboard" />
          </span>
        </Link>
      </NextLink>

      <NextLink href="/admin/discussions">
        <Link className={`link ${active === 'discussions' ? 'active' : ''}`}>
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Discussions' })}
            placement="right"
          >
            <Archive
              className="icon"
              color={active === 'discussions' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Discussions" />
          </span>
        </Link>
      </NextLink>

      <NextLink href="/admin/reports">
        <Link
          href="/admin/reports"
          className={`link ${active === 'reports' ? 'active' : ''}`}
        >
          <Tooltip
            text={useTranslation({ lang: lang, value: 'Reports' })}
            placement="right"
          >
            <AlertTriangle
              className="icon"
              color={active === 'reports' ? '#000' : '#999'}
            />
          </Tooltip>

          <span className="sidelink">
            <Translation lang={lang} value="Reports" />
          </span>
        </Link>
      </NextLink>
    </>
  );

  return (
    <aside className="for-admin">
      <div className="sidenav">
        {role === 'admin' ? <Admin /> : <Moderator />}
      </div>
    </aside>
  );
};

export default Sidebar;
