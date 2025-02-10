function modelRelations(sequelize) {
  const { user, role, user_secret, token, appointment } = sequelize.models;

  // useris
  user.belongsTo(role, { foreignKey: "role_id" });
  user.hasOne(user_secret, { foreignKey: "user_id", onDelete: "CASCADE" });
  user.hasMany(appointment, { foreignKey: "user_id", onDelete: "CASCADE" });
  user.hasOne(token, { foreignKey: "user_id", onDelete: "CASCADE" });

  user_secret.belongsTo(user, { foreignKey: "user_id" });
  token.belongsTo(user, { foreignKey: "user_id" });

  // role
  role.hasMany(user, { foreignKey: "role_id" });

  // patiekalai
  // category.hasMany(menu_item, { foreignKey: "category_id" });
  // menu_item.belongsTo(category, { foreignKey: "category_id" });
  // menu_item.hasMany(order_items, { foreignKey: "menu_item_id" });
  // order_items.belongsTo(menu_item, { foreignKey: "menu_item_id" });

  // uzsakymai
  appointment.belongsTo(user, { foreignKey: "user_id" });
  // order.hasOne(order_status, { foreignKey: "order_id" });
  // order_status.belongsTo(order, { foreignKey: "order_id" });
  // order.hasMany(order_items, { foreignKey: "order_id" });
  // order_items.belongsTo(order, { foreignKey: "order_id" });
}

module.exports = { modelRelations };
