import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import Header from '../components/header';
import Footer from '../components/footer';
import theme from '../styles/theme';
import '../styles/index.scss';

interface Props {
  location?: Location;
  title?: string;
  children?: any;
}

const Layout = ({ children }: Props) => {
  const Container = styled.div`
    margin: 0 auto;
    max-width: 750px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  const Content = styled.div`
    flex-grow: 1;
  `;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Content>
          <Header />
          {children}
        </Content>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
