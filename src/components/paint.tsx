import React from 'react';
import { css } from '@emotion/core';
import { PaintDetails } from '../types/app.types';

const Paint = ({ name, type, color, hex, gradient, stroke }: PaintDetails) => {
  const paintStyles = css`
    height: 50px;
    width: 50px;
    display: inline-block;
  `;

  let gradientSection = null;
  const gradients = [];
  if (gradient) {
    for (const g of gradient) {
      gradients.push(
        <stop
          offset={`${g.offset}%`}
          stopColor={g.color}
          stopOpacity="1"
          key={g.offset}
        />
      );
    }
    if (type === 'contrast') {
      gradientSection = (
        <defs>
          <linearGradient
            y1="0%"
            x1="100%"
            x2="0%"
            y2="0%"
            id={`${type}_gradient_${hex.substring(1, 7)}`}
          >
            {gradients}
          </linearGradient>
        </defs>
      );
    } else {
      gradientSection = (
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(25 32) scale(39)"
            id={`${type}_gradient_${hex.substring(1, 7)}`}
          >
            {gradients}
          </radialGradient>
        </defs>
      );
    }
  }

  return (
    <div data-testid="paint" css={paintStyles}>
      <svg viewBox="-1 0 52 62" xmlns="http://www.w3.org/2000/svg">
        <path
          d={
            type === 'spray'
              ? 'M37.0579 14.6557C35.9063 13.9672 34.7548 13.377 33.4986 12.7869C33.3939 12.7869 33.2893 12.6885 33.2893 12.5902C32.3471 11.0164 31.3003 9.44262 30.0441 7.96721C29.8347 7.67213 29.5207 7.37705 29.3113 7.18033C29.1019 6.98361 28.7879 6.88525 28.4738 6.78689C28.3691 6.78689 28.3691 6.78689 28.2645 6.78689C26.3802 6.78689 24.4959 6.78689 22.6116 6.78689L22.7163 6.68852C22.8209 6.39344 22.9256 6.09836 22.9256 5.80328C22.9256 4.13115 22.9256 2.36066 22.9256 0.688525C22.9256 0.295082 22.7163 0.0983607 22.2975 0C21.9835 0 21.7741 0 21.4601 0C20.9366 0.0983607 20.5179 0 19.9945 0H17.6915C17.5868 0 17.4821 0 17.3774 0C16.5399 0.0983607 15.5978 0.0983607 14.7603 0.196721C14.4463 0.196721 14.2369 0.491803 14.1322 0.688525C14.1322 0.885246 14.1322 0.983607 14.1322 1.18033C14.1322 2.85246 14.1322 4.52459 14.1322 6.19672C14.1322 6.29508 14.1322 6.39344 14.1322 6.4918C14.1322 6.68852 14.2369 6.78689 14.4463 6.88525C12.6667 6.88525 10.9917 6.88525 9.21212 6.88525C8.68871 6.88525 8.26997 7.08197 7.95592 7.37705C6.28099 9.2459 4.92011 11.3115 3.76859 13.4754C3.66391 13.5738 3.55923 13.6721 3.45455 13.7705C2.61708 14.2623 1.67493 14.8525 0.732782 15.3443C0.209366 15.541 0 16.0328 0 16.5246C0 16.623 0 16.7213 0 16.7213C0 28.4262 0 43.9672 0 55.6721C0 55.6721 5.65289 60 19.0523 60C32.4518 60 38 55.7705 38 55.7705V15.7377C37.8953 15.1475 37.4766 14.8525 37.0579 14.6557Z'
              : 'M34.9927 3.31021C34.0377 1.87791 29.0583 0.923096 24.4199 0.923096C19.7814 0.923096 16.0844 2.00071 14.3927 3.31021C8.73112 4.94709 5.1841 8.56187 4.63841 11.5628C4.09271 14.5638 0 46.0055 0 48.7337C0 51.4618 4.50198 61.6923 25.3066 61.6923C46.1112 61.6923 49.9311 51.3254 49.9993 48.7337C50.0675 46.142 45.0198 10.7444 45.0198 10.7444C44.2695 5.76553 35.6748 3.37842 34.9927 3.31021Z'
          }
          fill={
            gradient ? `url(#${type}_gradient_${hex.substring(1, 7)})` : hex
          }
          stroke={stroke ? stroke : undefined}
          strokeWidth={stroke ? 1 : undefined}
          strokeMiterlimit={stroke ? 5 : undefined}
          strokeLinecap={stroke ? 'round' : undefined}
          strokeLinejoin={stroke ? 'round' : undefined}
          shapeRendering={stroke ? '#geometricPrecision' : undefined}
        />
        {gradientSection}
      </svg>
    </div>
  );
};

export default Paint;
