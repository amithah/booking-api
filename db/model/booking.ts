import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface BookingAttributes {
  id: number;
  name: string;
  jobAddress: string;
  venueSize: number;
  isWorkFromHome: boolean;
  staffs: any[];
  groomingPolicy: string;
  entryInstructions: string;
}

export interface BookingInput extends Optional<BookingAttributes, 'id'> {}
export interface BookingOutput extends Required<BookingAttributes> {}

class Booking extends Model<BookingAttributes, BookingInput> implements BookingAttributes {
  public id!: number;
  public name!: string;
  public jobAddress!: string;  // Corrected from slug
  public venueSize!: number;
  public isWorkFromHome!: boolean;
  public staffs!: any[];
  public groomingPolicy!: string;
  public entryInstructions!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venueSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isWorkFromHome: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    staffs: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    groomingPolicy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entryInstructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'Booking',  
  }
);

export default Booking;
