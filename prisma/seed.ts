import dbClient from "../src/dbClient";
import { createDocumentType } from "./seeds/document-type-seed";
import { createInstalationClass } from "./seeds/instalation-class-seed";
import { createInstalationSubClass } from "./seeds/instalation-subclass-seed";
import { createInvoiceItemType } from "./seeds/invoice-item-type-seed";
import { createMeasurementType } from "./seeds/measurement-type-seed";
import { createTariffModality } from "./seeds/tariff-modality-seed";

async function main() {
  await createDocumentType();
  await createInstalationClass();
  await createInstalationSubClass();
  await createTariffModality();
  await createInvoiceItemType();
  await createMeasurementType();
}

main()
  .then(async () => {
    await dbClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await dbClient.$disconnect()
  })