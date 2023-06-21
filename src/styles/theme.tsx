export interface Theme {
  colors: {
    text: string;
    textSecondary: string;
    textLight: string;
    hyperlink: string;
    hyperlinkActive: string;
    muted: string;
    lightgrey: string;
    lightgreyHover: string;
    primary: string;
    primaryDark: string;
    backgroundTransparent: string;
  };
}

export const appTheme: Theme = {
  colors: {
    text: '#000',
    textSecondary: '#666',
    textLight: 'rgba(255, 255, 255, 0.9)',
    hyperlink: '#4f61ee',
    hyperlinkActive: '#0231e9',
    muted: '#999',
    lightgrey: '#ececec',
    lightgreyHover: '#e4e4e4',
    primary: '#eb1d23',
    primaryDark: '#cb070c',
    backgroundTransparent: 'rgba(0, 0, 0, 0.7)',
  },
};

export default appTheme;
