"use client";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Selection } from "@/components/atoms/Selection";
import { operationItemType } from "@/types/operational";

import { RemoveSpecialCharacters } from "@/utils/format";
import { PencilSimple } from "@phosphor-icons/react";
import { useCallback, useState } from "react";

interface props {
  headers: string[];
  opretations: any[];
  selectedOperations: operationItemType[];
  selectOperation: (isChecked: boolean, operation: operationItemType) => void;
  onEdit: (operation: operationItemType) => void;
}

export default function Table({
  headers,
  opretations,
  selectedOperations,
  selectOperation,
  onEdit,
}: props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState({ label: "5", value: 5 });

  const itemsOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
  ];

  const startIndex = currentPage * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  const currentItems = useCallback(() => {
    return opretations.slice(startIndex, endIndex);
  }, [opretations, startIndex, endIndex]);

  const isSelected = (operation: operationItemType) => {
    return selectedOperations.some((op) => op.id === operation.id);
  };

  const totalPages = Math.ceil(opretations.length / itemsPerPage.value);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              {headers.map((header) => (
                <th
                  key={header}
                  className={`pb-6 pt-3 px-2 ${
                    header === "Ações" && "text-right pr-6"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {opretations.length > 0 ? (
              currentItems().map((operation) => (
                <tr key={operation.id} className="border-b border-gray-300">
                  <td className="py-7 pr-5">{operation.id}</td>
                  <td className="pr-5">{operation.nmNatOperacao}</td>
                  <td>{RemoveSpecialCharacters(operation.alias_tpEstoque)}</td>
                  <td>
                    {RemoveSpecialCharacters(operation.alias_tpFinanceiro)}
                  </td>
                  <td className="justify-self-end pr-2">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        className="mr-2"
                        onClick={() => onEdit(operation)}
                      >
                        <PencilSimple />
                        Editar
                      </Button>
                      <Checkbox
                        isChecked={isSelected(operation)}
                        onChange={(e) => {
                          selectOperation(e.target.checked, operation);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center p-12">
                  <p className="mx-auto">Nenhum item encontrado.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-8 gap-5">
        <p>Items por página</p>
        <Selection
          options={itemsOptions}
          defaultOption={itemsPerPage}
          onSelect={(value) => setItemsPerPage(value)}
        />
        <ul className="flex gap-2 cursor-pointer">
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className={`w-10 p-[.7rem] border border-gray-400 rounded flex items-center justify-center -mt-1 ${
                  currentPage === index ? "bg-green border-none" : ""
                }`}
                onClick={() => handlePageChange(index)}
              >
                <span className="text-sm">{index + 1}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
