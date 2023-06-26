"use client";
import api from "@/axios/api";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import Input from "@/components/atoms/Input";
import { Subtitle, Title } from "@/components/atoms/Text";
import { SuccessNotification } from "@/components/atoms/Toast";
import { CreateOperations } from "@/components/molecules/CreateOperations";
import Dialog, { DialogHandlers } from "@/components/molecules/Dialog";
import { EditOperations } from "@/components/molecules/EditOperations";
import Table from "@/components/molecules/Table";
import { useDebounce } from "@/hooks/useDebounce";
import {
  operationItemType,
  operationalListItemsType,
} from "@/types/operational";
import { MagnifyingGlass, Plus, TrashSimple } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 500);

  const [opretations, setOperations] = useState<operationItemType[]>([]);
  const [itemSelected, setItemSelected] = useState<operationItemType>(
    {} as operationItemType
  );
  const [selectedOperations, setSelectedOperations] = useState<
    operationItemType[]
  >([]);

  const dialogCreateRef = useRef<DialogHandlers>(null);
  const dialogEditRef = useRef<DialogHandlers>(null);
  const dialogDeleteRef = useRef<DialogHandlers>(null);

  const headers = ["ID", "Descrição", "Estoque", "Financeiro", "Ações"];

  useEffect(() => {
    getItems(debouncedValue);
  }, [debouncedValue]);

  const selectItemToEdit = (operation: operationItemType) => {
    setItemSelected(operation);
    dialogEditRef.current?.handleModal();
  };

  const isAllItemsSelected = useCallback(() => {
    if (selectedOperations.length) {
      return true;
    }
    return false;
  }, [selectedOperations]);

  const selectOperation = (
    isChecked: boolean,
    operation: operationItemType
  ) => {
    if (!isChecked) {
      const selectedOperationsFiltred = selectedOperations.filter(
        (op) => op.id !== operation.id
      );
      setSelectedOperations([...selectedOperationsFiltred]);
      return;
    }

    setSelectedOperations([...selectedOperations, operation]);
  };

  const handleSelectAll = () => {
    if (selectedOperations.length) {
      setSelectedOperations([]);
      return;
    }
    setSelectedOperations([...opretations]);
  };

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

  const removeOperationalItems = () => {
    const listToRemove = selectedOperations.map((op) => {
      return {
        idLista: 1,
        id: op.id,
      };
    });

    api
      .delete("/natoperacao/excluir", {
        data: {
          lista: [...listToRemove],
        },
      })
      .then((res) => {
        dialogDeleteRef.current?.handleModal();
        SuccessNotification("Operações deletada com sucesso!");
        setSelectedOperations([]);
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

      <div className="flex justify-end w-full h-14 py-2 mt-8 cursor-pointer">
        {selectedOperations.length ? (
          <Button
            variant="ghost"
            className="text-red hover:bg-red hover:bg-opacity-10 mr-4"
            onClick={() => dialogDeleteRef.current?.handleModal()}
          >
            <TrashSimple weight="bold" />
            Excluir
          </Button>
        ) : null}
        <Checkbox
          showClearIcon
          isChecked={isAllItemsSelected()}
          onChange={handleSelectAll}
        />
      </div>

      <Table
        headers={headers}
        opretations={opretations}
        selectOperation={selectOperation}
        selectedOperations={selectedOperations}
        onEdit={selectItemToEdit}
      />

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
          <Title size="lg">Excluindo operações</Title>
          <br />
          <Subtitle>
            Esta ação exluirá <strong>{selectedOperations.length}</strong>{" "}
            operações
          </Subtitle>
          <br />
          <hr className="border-gray-400" />
          <br />
          <Button
            className="bg-red mb-3"
            fullWidth
            onClick={() => {
              console.log("delete");
              removeOperationalItems();
            }}
          >
            EXCLUIR
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
