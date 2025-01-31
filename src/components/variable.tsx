import { useState, useEffect } from 'react';
import SettingsStore from 'stores/settings';

const useVariable = (key: string) => {
  const [settingsStore]: any = useState(() => new SettingsStore());
  const [variable, setVariable] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      await settingsStore.getSettings();
      const variableObject = settingsStore.settings?.extensionVariables?.find(
        (item) => item.key === key
      );
      setVariable(variableObject ? variableObject.value : null);
    };

    fetchSettings();
  }, [settingsStore, key]);

  return variable;
};

export default useVariable;
