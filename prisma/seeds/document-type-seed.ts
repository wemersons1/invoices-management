import { CNPJ, CPF } from "../../constants/document-types";
import dbClient from "../../src/dbClient";

export const createDocumentType = async () => {
    await dbClient.documentType.upsert({
      where: { name: 'CPF' },
      update: {},
      create: {
        id: CPF,
        name: 'CPF',
      },
    });
  
    await dbClient.documentType.upsert({
        where: { name: 'CNPJ' },
        update: {},
        create: {
          id: CNPJ,
          name: 'CNPJ',
        },
    });
}
