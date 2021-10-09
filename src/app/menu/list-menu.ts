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
  ];