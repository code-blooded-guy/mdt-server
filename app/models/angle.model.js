module.exports = (sequelize, Sequelize, DataTypes) => {
  const Angle = sequelize.define(
    "angle", // Model name
    {
      // Model attributes
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      accessToken: {
        allowNull: false,
        type: DataTypes.TEXT("long"),
      },
      refreshToken: {
        allowNull: false,
        type: DataTypes.TEXT("long"),
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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

  return Angle;
};
