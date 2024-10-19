import { COMMERCIAL, OTHER_SERVICES_AND_OTHER_ACTIVITIES } from "../../constants/instalation-subclass";
import dbClient from "../../src/dbClient";

export const createInstalationSubClass = async () => {
    await dbClient.clientInstalationSubClass.upsert({
      where: { name: 'Comercial' },
      update: {},
      create: {
        id: COMMERCIAL,
        name: 'Comercial',
      },
    });
  
    await dbClient.clientInstalationSubClass.upsert({
      where: { name: 'Comercial Trifásico' },
      update: {},
      create: {
        id: OTHER_SERVICES_AND_OTHER_ACTIVITIES,
        name: 'Comercial Trifásico',
      },
    });
}
  