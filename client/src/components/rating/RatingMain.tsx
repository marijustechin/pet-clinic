import { useState } from 'react';
import { Rating } from './Rating';
import AppointmentService from '../../services/AppointmentService';

interface RatingMainProps {
  enabled: boolean;
  itemId: string;
  currRating: number;
}

export const RatingMain = ({
  enabled,
  itemId,
  currRating,
}: RatingMainProps) => {
  const [rating, setRating] = useState(currRating);

  const handleRateSelect = async (value: number) => {
    // irasom i db
    try {
      await AppointmentService.updateAppointment(itemId, {
        rating: value,
      });
    } catch (e: unknown) {}
    // pakeiciam redux busena
    setRating(value);
  };

  return (
    <Rating
      count={5}
      value={rating}
      edit={enabled}
      onChange={(value) => handleRateSelect(value)}
    />
  );
};
