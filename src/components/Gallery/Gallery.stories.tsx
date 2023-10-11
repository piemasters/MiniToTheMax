import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './Gallery';

const meta: Meta<typeof Gallery> = {
  component: Gallery,
  argTypes: {
    gallery: {
      name: 'gallery',
      description: 'Gallery of images',
      // defaultValue: [],
      // control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          flexGrow: '1',
          margin: '0 auto',
          maxWidth: '750px',
          padding: ' 0 1rem',
          width: ' 100%',
        }}
      >
        <div>
          <h2>Gallery</h2>

          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    gallery: [
      {
        thumb: {
          layout: 'constrained',
          placeholder: {
            fallback:
              'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBAIF/8QAGAEAAwEBAAAAAAAAAAAAAAAAAgMEAAH/2gAMAwEAAhADEAAAAcumIF17z2ff2djxgbP/xAAbEAACAwADAAAAAAAAAAAAAAABAgAREgMTIf/aAAgBAQABBQLrzyL41xdIm9DZgczRotP/xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIQESL/2gAIAQMBAT8Bi+jawz//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/AR//xAAeEAEAAQIHAAAAAAAAAAAAAAABAgAREBIgITFBYf/aAAgBAQAGPwIJcUnuFyBJ73pWOW2n/8QAHRABAAICAgMAAAAAAAAAAAAAAQARITEQQWGRof/aAAgBAQABPyHoROcwBWjgrKDy2l7h7Ru6mSL8jiNU+Ig0B6n/2gAMAwEAAgADAAAAEBfAPf/EABkRAAMAAwAAAAAAAAAAAAAAAAABERAhQf/aAAgBAwEBPxCm/cVGdP/EABgRAQADAQAAAAAAAAAAAAAAAAABETFB/9oACAECAQE/EOKVCMf/xAAbEAEAAwEBAQEAAAAAAAAAAAABABEhQXFhof/aAAgBAQABPxAQ4FFprwmKiA85M9jMIQtf12NyeAXYXuS4rH0uPbEvojKjwRhnQx//2Q==',
          },
          images: {
            fallback: {
              src: '/static/32896a7a41504ec29190b45833b464a1/b9c41/blacksmith-step-09-01.jpg',
              srcSet:
                '/static/32896a7a41504ec29190b45833b464a1/fec1e/blacksmith-step-09-01.jpg 42w,\n/static/32896a7a41504ec29190b45833b464a1/ec058/blacksmith-step-09-01.jpg 85w,\n/static/32896a7a41504ec29190b45833b464a1/b9c41/blacksmith-step-09-01.jpg 169w,\n/static/32896a7a41504ec29190b45833b464a1/232c3/blacksmith-step-09-01.jpg 338w',
              sizes: '(min-width: 169px) 169px, 100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/32896a7a41504ec29190b45833b464a1/544ae/blacksmith-step-09-01.webp 42w,\n/static/32896a7a41504ec29190b45833b464a1/8f0cc/blacksmith-step-09-01.webp 85w,\n/static/32896a7a41504ec29190b45833b464a1/17578/blacksmith-step-09-01.webp 169w,\n/static/32896a7a41504ec29190b45833b464a1/424c4/blacksmith-step-09-01.webp 338w',
                type: 'image/webp',
                sizes: '(min-width: 169px) 169px, 100vw',
              },
            ],
          },
          width: 169,
          height: 169,
        },
        full: {
          layout: 'fullWidth',
          backgroundColor: '#580818',
          images: {
            fallback: {
              src: '/static/32896a7a41504ec29190b45833b464a1/26584/blacksmith-step-09-01.jpg',
              srcSet:
                '/static/32896a7a41504ec29190b45833b464a1/37bba/blacksmith-step-09-01.jpg 750w,\n/static/32896a7a41504ec29190b45833b464a1/97edb/blacksmith-step-09-01.jpg 1080w,\n/static/32896a7a41504ec29190b45833b464a1/d61e8/blacksmith-step-09-01.jpg 1366w,\n/static/32896a7a41504ec29190b45833b464a1/26584/blacksmith-step-09-01.jpg 1800w',
              sizes: '100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/32896a7a41504ec29190b45833b464a1/a66aa/blacksmith-step-09-01.webp 750w,\n/static/32896a7a41504ec29190b45833b464a1/2a327/blacksmith-step-09-01.webp 1080w,\n/static/32896a7a41504ec29190b45833b464a1/4fad6/blacksmith-step-09-01.webp 1366w,\n/static/32896a7a41504ec29190b45833b464a1/59a3b/blacksmith-step-09-01.webp 1800w',
                type: 'image/webp',
                sizes: '100vw',
              },
            ],
          },
          width: 1,
          height: 0.5622222222222223,
        },
      },
      {
        thumb: {
          layout: 'constrained',
          placeholder: {
            fallback:
              'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAQFAgP/xAAXAQEBAQEAAAAAAAAAAAAAAAACAQAD/9oADAMBAAIQAxAAAAGWzO0ioV6PyC58jT//xAAbEAACAgMBAAAAAAAAAAAAAAABAgARAwQSE//aAAgBAQABBQLUActjQnIAra/SOp6nmrS6lyp//8QAFxEAAwEAAAAAAAAAAAAAAAAAABAREv/aAAgBAwEBPwGm3//EABYRAAMAAAAAAAAAAAAAAAAAAAAQEf/aAAgBAgEBPwEr/8QAGxAAAgIDAQAAAAAAAAAAAAAAAAERIQIQMUH/2gAIAQEABj8CyTScWS6K4X6iXNEtb6z/xAAdEAADAAICAwAAAAAAAAAAAAAAAREhQTGRYXGB/9oACAEBAAE/IYmRlseOkRT2KWGjSf8ARFwNt4N1sTNb4GzxZ6MOOw//2gAMAwEAAgADAAAAEHvgA//EABgRAQEAAwAAAAAAAAAAAAAAAAERABAh/9oACAEDAQE/ELtMAHd//8QAFhEBAQEAAAAAAAAAAAAAAAAAARAR/9oACAECAQE/EFjCf//EAB0QAQADAQACAwAAAAAAAAAAAAEAESFBMVFhgZH/2gAIAQEAAT8QfKEUYr0xxVqXatqqbMZoMAK3A+cCjnhAEFK6NXvxOFmXa59MOBNFB0IPp+EUqHe+c//Z',
          },
          images: {
            fallback: {
              src: '/static/0d9b9b2ca1e115a0abc9aedbd57af448/b9c41/blacksmith-step-09-02.jpg',
              srcSet:
                '/static/0d9b9b2ca1e115a0abc9aedbd57af448/fec1e/blacksmith-step-09-02.jpg 42w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/ec058/blacksmith-step-09-02.jpg 85w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/b9c41/blacksmith-step-09-02.jpg 169w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/232c3/blacksmith-step-09-02.jpg 338w',
              sizes: '(min-width: 169px) 169px, 100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/0d9b9b2ca1e115a0abc9aedbd57af448/544ae/blacksmith-step-09-02.webp 42w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/8f0cc/blacksmith-step-09-02.webp 85w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/17578/blacksmith-step-09-02.webp 169w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/424c4/blacksmith-step-09-02.webp 338w',
                type: 'image/webp',
                sizes: '(min-width: 169px) 169px, 100vw',
              },
            ],
          },
          width: 169,
          height: 169,
        },
        full: {
          layout: 'fullWidth',
          backgroundColor: '#480818',
          images: {
            fallback: {
              src: '/static/0d9b9b2ca1e115a0abc9aedbd57af448/26584/blacksmith-step-09-02.jpg',
              srcSet:
                '/static/0d9b9b2ca1e115a0abc9aedbd57af448/37bba/blacksmith-step-09-02.jpg 750w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/97edb/blacksmith-step-09-02.jpg 1080w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/d61e8/blacksmith-step-09-02.jpg 1366w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/26584/blacksmith-step-09-02.jpg 1800w',
              sizes: '100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/0d9b9b2ca1e115a0abc9aedbd57af448/a66aa/blacksmith-step-09-02.webp 750w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/2a327/blacksmith-step-09-02.webp 1080w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/4fad6/blacksmith-step-09-02.webp 1366w,\n/static/0d9b9b2ca1e115a0abc9aedbd57af448/59a3b/blacksmith-step-09-02.webp 1800w',
                type: 'image/webp',
                sizes: '100vw',
              },
            ],
          },
          width: 1,
          height: 0.5622222222222223,
        },
      },
      {
        thumb: {
          layout: 'constrained',
          placeholder: {
            fallback:
              'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAMEAQIF/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAMEAQL/2gAMAwEAAhADEAAAAedZml4fqoh1vBksALv/xAAcEAACAgIDAAAAAAAAAAAAAAAAAQIRAxITISL/2gAIAQEAAQUC19Y04lmz5XCoOfew5MpH/8QAGREAAgMBAAAAAAAAAAAAAAAAAAECEBEi/9oACAEDAQE/AVPo1Uj/xAAVEQEBAAAAAAAAAAAAAAAAAAAQAf/aAAgBAgEBPwEh/8QAHBAAAAYDAAAAAAAAAAAAAAAAAAECESExECBx/9oACAEBAAY/AmE4Sk0w9g27pQ//xAAeEAACAgEFAQAAAAAAAAAAAAAAAREhkRAxQWGxwf/aAAgBAQABPyGq+ycpnROqr4Re0xZPA5UsTKCNwdQ//9oADAMBAAIAAwAAABDj33z/xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oACAEDAQE/ENhzkkzAwv/EABgRAAMBAQAAAAAAAAAAAAAAAAABERAh/9oACAECAQE/ELwjEz//xAAdEAEAAwACAwEAAAAAAAAAAAABABEhMUFRYZHw/9oACAEBAAE/ELnFPbna9wRavgsMSsZCyWOoOvewX8qORAO7gwK3nmdALxzm5ab8J//Z',
          },
          images: {
            fallback: {
              src: '/static/95f9c7b75652f9c5bb27b73ed2ce595b/b9c41/blacksmith-step-09-03.jpg',
              srcSet:
                '/static/95f9c7b75652f9c5bb27b73ed2ce595b/fec1e/blacksmith-step-09-03.jpg 42w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/ec058/blacksmith-step-09-03.jpg 85w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/b9c41/blacksmith-step-09-03.jpg 169w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/232c3/blacksmith-step-09-03.jpg 338w',
              sizes: '(min-width: 169px) 169px, 100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/95f9c7b75652f9c5bb27b73ed2ce595b/544ae/blacksmith-step-09-03.webp 42w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/8f0cc/blacksmith-step-09-03.webp 85w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/17578/blacksmith-step-09-03.webp 169w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/424c4/blacksmith-step-09-03.webp 338w',
                type: 'image/webp',
                sizes: '(min-width: 169px) 169px, 100vw',
              },
            ],
          },
          width: 169,
          height: 169,
        },
        full: {
          layout: 'fullWidth',
          backgroundColor: '#480808',
          images: {
            fallback: {
              src: '/static/95f9c7b75652f9c5bb27b73ed2ce595b/26584/blacksmith-step-09-03.jpg',
              srcSet:
                '/static/95f9c7b75652f9c5bb27b73ed2ce595b/37bba/blacksmith-step-09-03.jpg 750w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/97edb/blacksmith-step-09-03.jpg 1080w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/d61e8/blacksmith-step-09-03.jpg 1366w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/26584/blacksmith-step-09-03.jpg 1800w',
              sizes: '100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/95f9c7b75652f9c5bb27b73ed2ce595b/a66aa/blacksmith-step-09-03.webp 750w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/2a327/blacksmith-step-09-03.webp 1080w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/4fad6/blacksmith-step-09-03.webp 1366w,\n/static/95f9c7b75652f9c5bb27b73ed2ce595b/59a3b/blacksmith-step-09-03.webp 1800w',
                type: 'image/webp',
                sizes: '100vw',
              },
            ],
          },
          width: 1,
          height: 0.5622222222222223,
        },
      },
    ],
  },
};
