"use client";
import api from "@/axios/api";
import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Subtitle, Title } from "@/components/atoms/Text";
import { SuccessNotification } from "@/components/atoms/Toast";
import { CreateOperations } from "@/components/molecules/CreateOperations";
import Dialog, { DialogHandlers } from "@/components/molecules/Dialog";
import { EditOperations } from "@/components/molecules/EditOperations";
import { useDebounce } from "@/hooks/useDebounce";
import {
  operationItemType,
  operationalListItemsType,
} from "@/types/operational";
import { RemoveSpecialCharacters } from "@/utils/format";
import {
  MagnifyingGlass,
  PencilSimple,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 500);

  const [opretations, setOperations] = useState<operationItemType[]>([]);
  const [itemSelected, setItemSelected] = useState<operationItemType>(
    {} as operationItemType
  );

  const dialogCreateRef = useRef<DialogHandlers>(null);
  const dialogEditRef = useRef<DialogHandlers>(null);
  const dialogDeleteRef = useRef<DialogHandlers>(null);

  const headers = ["ID", "Descrição", "Estoque", "Financeiro", "Ações"];

  const getItems = (value: string) => {
    api
      .post("/natoperacao/pesquisar", {
        nmNatOperacao: [
          {
            operandoTipo: "0",
            operandoValor: value,
            operador: "2",
          },
        ],
      })
      .then((res) => {
        if (!res.data.retorno) {
          setOperations([]);
          return;
        }
        setOperations(res.data.retorno);
      });
  };

  useEffect(() => {
    getItems(debouncedValue);
  }, [debouncedValue]);

  const createOperationalItem = (
    operationalList: operationalListItemsType[]
  ) => {
    api.post("/natoperacao/incluir", { lista: operationalList }).then((res) => {
      dialogCreateRef.current?.handleModal();
      SuccessNotification("Operações salvas com sucesso!");
      getItems("");
    });
  };

  const editOperationalItem = (operationalList: operationalListItemsType[]) => {
    api.put("/natoperacao/alterar", { lista: operationalList }).then((res) => {
      dialogEditRef.current?.handleModal();
      SuccessNotification("Operaçãos salva com sucesso!");
      getItems("");
    });
  };

  const removeOperationalItem = () => {
    api
      .delete("/natoperacao/excluir", {
        lista: [{ idLista: 1, id: itemSelected.id }],
      } as any)
      .then((res) => {
        dialogDeleteRef.current?.handleModal();
        SuccessNotification("Operações deletada com sucesso!");
        getItems("");
      });
  };

  return (
    <div>
      <Title>Tela de listagem</Title>
      <br />
      <div className="flex flex-col md:items-center md:justify-between sm:flex-row sm:items-baseline">
        <Button onClick={() => dialogCreateRef.current?.handleModal()}>
          <Plus /> Incluir operação
        </Button>

        <div className="lg:w-1/4 md:w-2/6 ">
          <Input
            placeholder="Pesquisar"
            appendIcon={<MagnifyingGlass />}
            onChange={({ target }) => setSearch(target.value)}
            value={search}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left mt-8">
          <thead>
            <tr className="border-b">
              {headers.map((header) => (
                <th
                  key={header}
                  className={`py-6 px-2 ${
                    header === "Ações" && "text-right pr-6"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {opretations.map((operation) => (
              <tr key={operation.id} className="border-b border-gray-300">
                <td className="py-7 pr-5">{operation.id}</td>
                <td className="pr-5">{operation.nmNatOperacao}</td>
                <td>{RemoveSpecialCharacters(operation.alias_tpEstoque)}</td>
                <td>{RemoveSpecialCharacters(operation.alias_tpFinanceiro)}</td>
                <td className="justify-self-end pr-2">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setItemSelected(operation);
                        dialogEditRef.current?.handleModal();
                      }}
                    >
                      <PencilSimple />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red hover:bg-red hover:bg-opacity-10"
                      onClick={() => {
                        setItemSelected(operation);
                        dialogDeleteRef.current?.handleModal();
                      }}
                    >
                      <TrashSimple />
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog ref={dialogCreateRef} title="Adicionando Operação">
        <CreateOperations handleSave={createOperationalItem} />
      </Dialog>

      <Dialog ref={dialogEditRef} title="Adicionando Operação">
        <EditOperations
          closeDialog={() => dialogEditRef.current?.handleModal()}
          handleSave={editOperationalItem}
          editItem={itemSelected}
        />
      </Dialog>

      <Dialog ref={dialogDeleteRef}>
        <div className="text-center">
          <Title size="lg">Excluindo Operação</Title>
          <br />
          <Subtitle>
            Esta ação exluirá a operação:{" "}
            <strong>{itemSelected.nmNatOperacao}</strong>
          </Subtitle>
          <br />
          <hr className="border-gray-400" />
          <br />
          <Button
            className="bg-red mb-3"
            fullWidth
            onClick={removeOperationalItem}
          >
            EXCLUIR <TrashSimple />
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={() => dialogDeleteRef.current?.handleModal()}
          >
            Cancelar
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
