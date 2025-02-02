'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortTypes = [
  {
    label: "Сначала новые",
    value: "$createdAt-desc",
  },
  {
    label: "Сначала старые",
    value: "$createdAt-asc",
  },
  {
    label: "По имени (А-Я)",
    value: "name-asc",
  },
  {
    label: "По имени (Я-А)",
    value: "name-desc",
  },
  {
    label: "Сначала большие",
    value: "size-desc",
  },
  {
    label: "Сначала маленькие",
    value: "size-asc",
  },
];
const Sort = () => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const sort = params.get('sort') || "$createdAt-desc";

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };
  return (
    <Select onValueChange={handleSort} value={sort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className="gap-2" >
        <SelectValue placeholder={sort} />
      </SelectTrigger>
      <SelectContent>
        {sortTypes.map((item) => (
          <SelectItem key={item.label} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
