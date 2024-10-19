import { BIPHASIC_COMMERCIAL, THREE_PHASE_COOMERCIAL } from "../../constants/instalation-class";
import dbClient from "../../src/dbClient";

export const createInstalationClass = async () => {
    await dbClient.clientInstalationClass.upsert({
      where: { name: 'Comercial Bifásico' },
      update: {},
      create: {
        id: BIPHASIC_COMMERCIAL,
        name: 'Comercial Bifásico',
      },
    });
  
    await dbClient.clientInstalationClass.upsert({
      where: { name: 'Comercial Trifásico' },
      update: {},
      create: {
        id: THREE_PHASE_COOMERCIAL,
        name: 'Comercial Trifásico',
      },
    });
}