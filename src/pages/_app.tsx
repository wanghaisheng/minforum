import 'styles/custom.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { useEffect, useState, useMemo, Suspense } from 'react';
import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline, Loading, Themes } from '@geist-ui/core';
import useAnalytics from 'components/Analytics';
import { defaultTheme } from 'themes';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SettingsStore from 'stores/settings';
import ThemeStore from 'stores/theme';
import { themeProp } from 'interfaces/theme';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [theme, setTheme] = useState<any>(null);
  const [themeSlug, setThemeSlug] = useState<any>('');
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const themeStore = useMemo(() => new ThemeStore(), []);
  const settingsStore = useMemo(() => new SettingsStore(), []);

  useEffect(() => {
    fetchTheme();
  }, [settingsStore, themeStore]);

  const fetchTheme = async () => {
    try {
      // Get the theme from cookies or settings
      const settings: any = await settingsStore.getSettings();

      const themeSlug = settings?.data?.theme;
      setThemeSlug(themeSlug);

      if (themeSlug) {
        const fetchedTheme: themeProp = await themeStore.getTheme(themeSlug);

        let _theme =
          fetchedTheme && fetchedTheme?.code
            ? JSON.parse(fetchedTheme?.code)
            : {};

        _theme && setTheme(_theme);
      }
    } catch (error) {
      console.error('Failed to fetch theme:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    }
  };

  // Create custom theme

  if (loading && theme === null) {
    return <Suspense fallback={<Loading />}></Suspense>;
  } else if (theme?.palette) {
    const { palette, expressiveness, font } = theme;
    const customTheme = palette
      ? Themes.createFromLight({
          type: themeSlug,
          palette,
          expressiveness,
          font: { sans: font }
        })
      : defaultTheme;

    return (
      <GeistProvider
        themes={[customTheme, defaultTheme]}
        themeType={customTheme ? themeSlug : 'min-forum'}
      >
        <CssBaseline />
        {useAnalytics()}
        <GoogleOAuthProvider
          clientId={
            settingsStore?.settings?.socialAccount?.google || 'no-client-id'
          }
        >
          <Component {...pageProps} key={router.asPath} />
        </GoogleOAuthProvider>
      </GeistProvider>
    );
  }
};

export default App;
