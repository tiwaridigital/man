import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './style.scss';

const CircleRating = ({ rating }) => {
  return (
    <div className="circleRating">
      {rating < 5 ? (
        <YellowGradientSVG />
      ) : rating < 7 ? (
        <OrangeGradientSVG />
      ) : (
        <GreenGradientSVG />
      )}
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        // styles={buildStyles({
        //   pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
        // })}
        styles={{
          path: {
            stroke: `url(#${
              rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green'
            })`,
            height: '100%',
          },
          trail: {
            stroke: '#2e2e2e',
          },
        }}
      />
    </div>
  );
};

export default CircleRating;

function OrangeGradientSVG() {
  const idCSS = 'orange';
  const gradientTransform = 'rotate(90)';
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="0.99%" stopColor="#f89e00" />
          <stop offset="100%" stopColor="#da2f68" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function GreenGradientSVG() {
  const idCSS = 'green';
  const gradientTransform = 'rotate(90)';
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="0.99%" stopColor="#8cc34e" />
          <stop offset="100%" stopColor="#00a96f" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function YellowGradientSVG() {
  const idCSS = 'red';
  const gradientTransform = 'rotate(90)';
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor="rgb(254, 240, 138)" />
          <stop offset="50%" stopColor="rgb(250, 204, 21)" />
          <stop offset="100%" stopColor="rgb(171, 138, 17)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
