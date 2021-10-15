export interface MenuItem {
    name : string,
    fullName : string,
    item : number
  }

export const MENU_ITENS : MenuItem[] = [
    {
      name : 'uuid',
      fullName : 'Generate UUID',
      item : 1
    },
    {
      name : 'cpf',
      fullName : 'Generate CPF',
      item : 2
    },
    {
      name : 'cnpj',
      fullName : 'Generate CNPJ',
      item : 3
    },
    {
      name : 'base64',
      fullName : 'Base64',
      item : 4
    },
    {
      name : 'md5',
      fullName : 'MD5',
      item : 5
    },
    {
      name : 'jwt',
      fullName : 'JWT',
      item : 6
    },
  ];