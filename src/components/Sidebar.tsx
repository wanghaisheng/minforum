import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Link, Spacer } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import CategoryStore from 'stores/category';
import CustomIcon from './data/icon/icon';

type sidebarProps = {
  active: string;
  button: JSX.Element | string;
  fluid?: boolean;
  advert?: JSX.Element | string;
};

const Sidebar = observer((props: sidebarProps) => {
  const { active, button, fluid, advert } = props;
  const [{ categories, getCategories }] = useState(() => new CategoryStore());

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <aside>
      <div className={`sidenav ${fluid ? 'fluid' : ''} `}>
        {button}
        <Spacer h={2.5} />
        {categories.slice().map((item, key) => (
          <NextLink href={`/category/${item.slug}`} key={key}>
            <Link className={`link ${active === item.slug ? 'active' : ''}`}>
              <CustomIcon
                name={item.icon?.icon}
                type={item.icon?.type}
                size={25}
                color={item.color}
                style={{ position: 'relative', top: 4 }}
              />
              <span
                className="sidelink"
                style={{ color: active === item.slug ? item.color : '' }}
              >
                {item.title}
              </span>
            </Link>
          </NextLink>
        ))}

        {advert}
      </div>
    </aside>
  );
});

export default Sidebar;
