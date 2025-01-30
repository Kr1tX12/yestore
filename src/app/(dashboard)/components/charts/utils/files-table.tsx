import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import React from "react";
import { FileType } from "../../../../../../types";

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
              {item.name}
            </TableCell>
            <TableCell>{formatDateTime(item.lastModified)}</TableCell>
            <TableCell className="text-right">{item.size}GB</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;
