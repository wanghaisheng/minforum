import { Themes } from '@geist-ui/core';

export const defaultTheme = Themes.createFromLight({
  type: 'minforum',
  palette: {
    accents_1: '#fafafa',
    accents_2: '#eaeaea',
    accents_3: '#999',
    accents_4: '#888',
    accents_5: '#666',
    accents_6: '#444',
    accents_7: '#333',
    accents_8: '#111',
    background: '#fff',
    foreground: '#000',
    selection: '#79ffe1',
    secondary: '#666',
    code: '#f81ce5',
    border: '#eaeaea',
    error: '#e00',
    errorLight: '#ff1a1a',
    errorLighter: '#f7d4d6',
    errorDark: '#c50000',
    success: '#0070f3',
    successLight: '#3291ff',
    successLighter: '#d3e5ff',
    successDark: '#0761d1',
    warning: '#f5a623',
    warningLight: '#f7b955',
    warningLighter: '#ffefcf',
    warningDark: '#ab570a',
    cyan: '#50e3c2',
    cyanLighter: '#aaffec',
    cyanLight: '#79ffe1',
    cyanDark: '#29bc9b',
    violet: '#7928ca',
    violetLighter: '#e3d7fc',
    violetLight: '#8a63d2',
    violetDark: '#4c2889',
    purple: '#f81ce5',
    alert: '#ff0080',
    magenta: '#eb367f',
    link: '#000'
  },
  expressiveness: {
    linkStyle: 'none',
    linkHoverStyle: 'none',
    dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
    scrollerStart: 'rgba(255, 255, 255, 1)',
    scrollerEnd: 'rgba(255, 255, 255, 0)',
    shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
    shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
    shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
    portalOpacity: 0.25
  },
  font: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
    prism:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,"Liberation Mono", "Courier New", monospace'
  }
});
