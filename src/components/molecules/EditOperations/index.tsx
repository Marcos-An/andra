"use client";
import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Selection } from "@/components/atoms/Selection";
import {
  operationItemType,
  operationalListItemsType,
} from "@/types/operational";
import {
  CustomOption,
  financialOptions,
  operationTypeOptions,
} from "@/utils/selectOptions";
import { FormEvent, useState } from "react";

interface props {
  closeDialog: () => void;
  handleSave: (operationalList: operationalListItemsType[]) => void;
  editItem: operationItemType;
}

export const EditOperations = ({
  handleSave,
  closeDialog,
  editItem,
}: props) => {
  const [description, setDescription] = useState(editItem.nmNatOperacao);
  const [operationType, setOperationType] = useState<CustomOption>(
    operationTypeOptions.find(
      (o) => o.label === editItem.alias_tpEstoque
    ) as CustomOption
  );
  const [financial, setFinancial] = useState<CustomOption>(
    financialOptions.find(
      (o) => o.label === editItem.alias_tpFinanceiro
    ) as CustomOption
  );

  const save = (event: FormEvent) => {
    event.preventDefault();

    const newItem = {
      idLista: 1,
      nmNatOperacao: description,
      tpEstoque: operationType.value,
      tpFinanceiro: financial.value,
      id: editItem.id,
    };

    const operationalList = [newItem];

    handleSave(operationalList);
  };

  return (
    <>
      <form onSubmit={save} className="flex flex-col w-full gap-2">
        <div className="flex flex-col  border-gray-300 mb-3">
          <Input
            label="Descrição"
            required
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <Selection
            label="Tipo de operação"
            options={operationTypeOptions}
            defaultOption={operationType}
            onSelect={(value) => setOperationType(value)}
          />
          <Selection
            label="Financeiro"
            options={financialOptions}
            defaultOption={financial}
            onSelect={(value) => setFinancial(value)}
          />
        </div>

        <Button type="submit" fullWidth>
          Salvar Operações
        </Button>
      </form>
      <Button variant="ghost" fullWidth onClick={closeDialog}>
        Cancelar
      </Button>
    </>
  );
};
