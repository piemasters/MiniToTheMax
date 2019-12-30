import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/index.scss';
import styled from '@emotion/styled';

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
    <Container>
      <Content>
        <Header />
        {children}
      </Content>
      <Footer />
    </Container>
  );
};

export default Layout;
