import { KWH } from "../../constants/unit-measurement";
import dbClient from "../../src/dbClient";

export const createTariffModality = async () => {
    await dbClient.clientInstalationTariffModality.upsert({
      where: { name: 'kWh' },
      update: {},
      create: {
        id: KWH,
        name: 'kWh',
      },
    });
}