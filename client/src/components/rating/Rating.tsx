import React, { useState } from 'react';
import { IRatingProps } from '../../types/rating';
import { EmptyStar } from './EmptyStar';
import { FullStar } from './FullStar';
import { HalfStar } from './HalfStar';

export const Rating: React.FC<IRatingProps> = ({
  count,
  value,
  color = '#6D28D9',
  hoverColor = '#7C3AED',
  activeColor = '#A78BFA',
  size = 30,
  edit = false,
  isHalf = true,
  onChange,
  emptyIcon = <EmptyStar />,
  halfIcon = <HalfStar />,
  fullIcon = <FullStar />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseMove = (index: number) => {
    if (!edit) {
      return;
    }
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!edit) {
      return;
    }
    setHoverValue(undefined);
  };

  const handleClick = (index: number) => {
    if (!edit) {
      return;
    }
    if (onChange) {
      onChange(index + 1);
    }
  };

  const stars = [];

  for (let i = 0; i < count; i++) {
    let star;
    if (isHalf && value - i > 0 && value - i < 1) {
      star = halfIcon;
    } else if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        star = fullIcon;
      }
    }

    stars.push(
      <div
        key={i}
        style={{ cursor: 'pointer' }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {React.cloneElement(star, {
          size: size,
          color:
            i <= Number(hoverValue)
              ? hoverColor
              : i < value
              ? activeColor
              : color,
        })}
      </div>
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
};
