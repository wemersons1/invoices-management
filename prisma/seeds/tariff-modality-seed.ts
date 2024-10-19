import { COMMERCIAL } from "../../constants/instalation-subclass";
import dbClient from "../../src/dbClient";

export const createTariffModality = async () => {
    await dbClient.clientInstalationTariffModality.upsert({
      where: { name: 'Comercial' },
      update: {},
      create: {
        id: COMMERCIAL,
        name: 'Comercial',
      },
    });
}