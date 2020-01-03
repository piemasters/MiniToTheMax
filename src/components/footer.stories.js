import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Footer from './footer';

export default {
  title: 'Footer',
};

export const toStorybook = () => <Footer />;

toStorybook.story = {
  name: 'default',
};
