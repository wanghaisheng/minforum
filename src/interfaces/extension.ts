export interface extensionProp {
  id?: string;
  title?: string;
  slug?: string;
  version?: string;
  author?: string;
  contact?: string;
  error?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Extension {
  name?: string;
  initialize?: () => void;
}

export interface ExtensionRegistry {
  name: string;
  path: string;
}
