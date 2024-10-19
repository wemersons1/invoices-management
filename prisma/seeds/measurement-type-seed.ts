import { ENERGY_KWH } from "../../constants/measurement-types";
import dbClient from "../../src/dbClient";


export const createMeasurementType = async () => {
    await dbClient.measurementType.upsert({
      where: { name: 'Energia kWh' },
      update: {},
      create: {
        id: ENERGY_KWH,
        name: 'Energia kWh',
      },
    });
}