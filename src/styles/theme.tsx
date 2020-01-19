export interface Theme {
  colors: {
    text: string;
    muted: string;
  };
}

const appTheme: Theme = {
  colors: {
    text: '#000',
    muted: '#999',
  },
};

export default appTheme;
