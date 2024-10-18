import { CPF, CNPJ } from "../constants/document-types";
import { BIPHASIC_COMMERCIAL, THREE_PHASE_COOMERCIAL } from "../constants/instalation-class";
import { COMMERCIAL, OTHER_SERVICES_AND_OTHER_ACTIVITIES } from "../constants/instalation-subclass";
import dbClient from "../src/dbClient";

async function main() {
  await createDocumentType();
  await createInstalationClass();
  await createInstalationSubClass();
  await createTariffModality();
}

async function createDocumentType() {
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

async function createInstalationClass() {
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

async function createInstalationSubClass() {
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

async function createTariffModality() {
  await dbClient.clientInstalationTariffModality.upsert({
    where: { name: 'Comercial' },
    update: {},
    create: {
      id: COMMERCIAL,
      name: 'Comercial',
    },
  });
}

main()
  .then(async () => {
    await dbClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await dbClient.$disconnect()
  })