
// ユーザー
export type User = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description: string;
};

// 建材
export type Product = {
  id: number;
  displayName: string;
  name: string;
  description: string;
  imageUrl?: string;
  price: number|string;
  owner: User;
};

// APIコンテキスト
export type ApiContext = {
  apiRootUrl: string;
};
