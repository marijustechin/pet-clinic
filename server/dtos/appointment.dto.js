module.exports = class appointmentDto {
  id;
  pet_name;
  date;
  time;
  notes;
  user_id;

  constructor(model) {
    this.id = model.id;
    this.pet_name = model.pet_name;
    this.date = model.date;
    this.time = model.time;
    this.notes = model.notes;
    this.user_id = model.user_id;
  }
};
