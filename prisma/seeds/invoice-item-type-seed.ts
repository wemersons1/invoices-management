import {
    ELECTRICITY,    
    ENERGY_SCEE_WIDHOUT_ICMS,
    COMPENSATED_ENERGY_GDI,
    MUNICIPAL_PUBLIC_LIGHTING_CONTRIBUTION,
    COMPENSATION_FOR_DAMAGES 
 } from "../../constants/invoice-items-type";
import dbClient from "../../src/dbClient";

export const createInvoiceItemType = async () => {
    await dbClient.invoiceItemType.upsert({
      where: { name: 'Energia Elétrica' },
      update: {},
      create: {
        id: ELECTRICITY,
        name: 'Energia Elétrica',
      },
    });
  
    await dbClient.invoiceItemType.upsert({
      where: { name: 'Energia SCEE s/ ICMS' },
      update: {},
      create: {
        id: ENERGY_SCEE_WIDHOUT_ICMS,
        name: 'Energia SCEE s/ ICMS',
      },
    });
  
    await dbClient.clientInstalationTariffModality.upsert({
      where: { name: 'Energia compensada GD I' },
      update: {},
      create: {
        id: COMPENSATED_ENERGY_GDI,
        name: 'Energia compensada GD I',
      },
    });
  
    await dbClient.clientInstalationTariffModality.upsert({
      where: { name: 'Contrib Ilum Publica Municipal' },
      update: {},
      create: {
        id: MUNICIPAL_PUBLIC_LIGHTING_CONTRIBUTION,
        name: 'Contrib Ilum Publica Municipal',
      },
    });
  
    await dbClient.clientInstalationTariffModality.upsert({
      where: { name: 'Ressarcimento de Danos' },
      update: {},
      create: {
        id: COMPENSATION_FOR_DAMAGES,
        name: 'Ressarcimento de Danos',
      },
    });
}
  