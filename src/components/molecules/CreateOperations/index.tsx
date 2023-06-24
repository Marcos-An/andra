"use client";
import api from "@/axios/api";
import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Selection } from "@/components/atoms/Selection";
import { Subtitle, Title } from "@/components/atoms/Text";
import { operationalListItemsType } from "@/types/operational";
import { financialOptions, operationTypeOptions } from "@/utils/selectOptions";
import { FormEvent, useState } from "react";

export const CreateOperations = ({
  handleSave,
}: {
  handleSave: (operationalList: operationalListItemsType[]) => void;
}) => {
  const [description, setDescription] = useState("");
  const [operationType, setOperationType] = useState(operationTypeOptions[0]);
  const [financial, setFinancial] = useState(financialOptions[1]);
  const [operationalList, setOperationalList] = useState<
    operationalListItemsType[]
  >([]);

  const addItem = (event: FormEvent) => {
    event.preventDefault();

    const newItem = {
      idLista: operationalList.length + 1,
      nmNatOperacao: description,
      tpEstoque: operationType.value,
      tpFinanceiro: financial.value,
    };

    setOperationalList([...operationalList, newItem]);

    setDescription("");
    setOperationType(operationTypeOptions[0]);
    setFinancial(financialOptions[1]);
  };

  return (
    <>
      <form onSubmit={addItem} className="flex flex-col w-full gap-2">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-2 border-b border-gray-300 mb-3">
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

        {operationalList.length ? (
          <div>
            <Subtitle>Itens a serem adicionados</Subtitle>
            {operationalList.map((operation) => (
              <div
                key={operation.idLista}
                className="py-4 border-b border-gray-400 w-full flex flex-col gap-2"
              >
                <Title size="md">{operation.nmNatOperacao}</Title>

                <Subtitle>
                  Tipo de estoque:{" "}
                  <strong>
                    {
                      operationTypeOptions.find(
                        (item) => item.value === operation.tpEstoque
                      )?.label
                    }
                  </strong>
                </Subtitle>
                <Subtitle>
                  Tipo de Financeiro:{" "}
                  <strong>
                    {
                      financialOptions.find(
                        (item) => item.value === operation.tpFinanceiro
                      )?.label
                    }
                  </strong>
                </Subtitle>
              </div>
            ))}
          </div>
        ) : null}
        <br />
        <Button variant="ghost" type="submit" className="text-blue">
          + Adicionar Nova Operação
        </Button>
      </form>
      <br />

      {operationalList.length ? (
        <Button onClick={() => handleSave(operationalList)} fullWidth>
          Salvar Operações
        </Button>
      ) : null}
    </>
  );
};
