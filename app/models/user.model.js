module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "users", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isSubscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      plan: {
        type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
