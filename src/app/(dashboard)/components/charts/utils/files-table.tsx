import { FileType } from "@/components/fileSystems/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageIcon } from "lucide-react";
import React from "react";

const FilesTable = ({ table }: { table: Array<FileType> }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="sticky top-0">
          <TableHead>Файл</TableHead>
          <TableHead>Создан</TableHead>
          <TableHead className="text-right">Размер</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="flex items-center gap-2">
              <ImageIcon className="size-4" />
              {item.name}.{item.extension}
            </TableCell>
            <TableCell>{item.lastModified.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{item.size}GB</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;
