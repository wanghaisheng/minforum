import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Card, Text, Grid, Link, Spacer } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/navbar';
import CategoryStore from 'stores/category';
import { Translation, translation } from 'components/intl/translation';
import useSettings from 'components/settings';
import CustomIcon from 'components/data/icon/icon';

const Category = observer(() => {
  const settings = useSettings();
  const [{ categories, getCategories }] = useState(() => new CategoryStore());

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar
        title={translation({
          lang: settings?.language,
          value: 'Categories'
        })}
        description="Categories"
      />
      <div className="page-container top-100">
        <h2>
          <Translation lang={settings?.language} value="Categories" />
        </h2>
        <div className="category-grid">
          {categories
            ?.slice()
            ?.sort(
              (a: any, b: any) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((item) => (
              <div key={item.id}>
                <NextLink href={`/category/${item.slug}`}>
                  <Link href={`/category/${item.slug}`} width="100%">
                    <Card
                      type={'default'}
                      width="100%"
                      style={{ background: item.color }}
                      className="text-category"
                    >
                      <Text h4 my={0}>
                        <CustomIcon
                          name={item?.icon?.icon}
                          type={item?.icon?.type}
                          color="#fff"
                          size={30}
                          style={{
                            position: 'relative',
                            top: 5,
                            paddingRight: 10
                          }}
                        />
                        {item.title}
                      </Text>
                      <Text p>{item.description}</Text>
                    </Card>
                  </Link>
                </NextLink>
              </div>
            ))}
        </div>
        <Spacer h={5} />
      </div>
    </div>
  );
});

export default Category;
