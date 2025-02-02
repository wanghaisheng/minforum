import { Extension } from 'interfaces/extension';
import registry from 'extensions/registry.json';

export default async function loadExtensions(): Promise<Extension[]> {
  // Validate registry structure
  if (!registry?.extensions || !Array.isArray(registry.extensions)) {
    console.error(
      'Invalid registry.json structure: "extensions" must be an array.'
    );
    return [];
  }

  // Filter and validate active extensions
  const activeExtensions = registry.extensions.filter((item) => {
    if (typeof item.path !== 'string' || typeof item.active !== 'boolean') {
      console.error('Invalid extension in registry:', item);
      return false;
    }
    return item.active;
  });

  const extensions: Extension[] = [];

  for (const extension of activeExtensions) {
    // Dynamically resolve extension paths
    const extensionPath = `extensions/${extension.path}/index`;

    let extensionModule;
    try {
      // Dynamically import the extension module
      extensionModule = await import(`${extensionPath}`);
    } catch (error) {
      console.error(
        `Failed to load extension at path "${extension.path}":`,
        error
      );
      continue;
    }

    // Validate the module's default export
    if (
      !extensionModule.default ||
      typeof extensionModule.default.name !== 'string' ||
      typeof extensionModule.default.initialize !== 'function'
    ) {
      console.error(
        `Extension at path "${extension.path}" is missing required properties.`
      );
      continue;
    }

    extensions.push({
      name: extensionModule.default.name,
      initialize: extensionModule.default.initialize
    });
  }

  return extensions;
}
