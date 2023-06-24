export interface CustomOption {
  label: string;
  value: number;
}

export const operationTypeOptions: CustomOption[] = [
  { label: "Nenhum", value: 0 },
  { label: "Saída", value: 1 },
  { label: "Entrada", value: 2 },
];

export const financialOptions: CustomOption[] = [
  { label: "Nenhum", value: 0 },
  { label: "Receber", value: 1 },
  { label: "Pagar", value: 2 },
];
