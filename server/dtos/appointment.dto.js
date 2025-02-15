module.exports = class appointmentDto {
  id;
  pet_name;
  date;
  notes;
  user_id;
  user;
  rating;
  status;

  constructor(model) {
    this.id = model.id;
    this.pet_name = model.pet_name;
    this.date = model.date;
    this.notes = model.notes;
    this.user_id = model.user_id;
    this.user = model.user;
    this.rating = model.rating;
    this.status = model.status;
  }
};
