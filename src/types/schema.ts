export interface Profile {
  username: string;
  unique_code: string;
  header: string;
  bio: string;
  email: string;
  phone: string;
  profilePictureUrl?: string;
  socialLinks: Array<{ platform: string; url: string }>;
  chosenLayout: string;
  themeColors: {
    bgColor: string;
    cardColor: string;
    textColor: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
  };
  effects: {
    blur: number;
    transparency: number;
  };
  careerData: Array<{
    id: string | number;
    role: string;
    company: string;
    year: string;
    description: string;
  }>;
  widgetStates: Array<{
    id: string;
    type: string;
    title: string;
    width: number | string;
    height: string;
    order: number;
    content: any;
  }>;
  mediaUrls: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}
