module.exports = (sequelize, Sequelize, DataTypes) => {
  const Fyers = sequelize.define(
    "fyers", // Model name
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
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
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

  return Fyers;
};
