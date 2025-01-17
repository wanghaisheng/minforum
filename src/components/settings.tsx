import { useState, useEffect } from 'react';
import SettingsStore from 'stores/settings';

const useSettings = () => {
  const [settingsStore] = useState(() => new SettingsStore());

  useEffect(() => {
    settingsStore.getSettings();
  }, [settingsStore]);

  return settingsStore.settings;
};

// Wrap the component that uses this hook with `observer`
export default useSettings;
