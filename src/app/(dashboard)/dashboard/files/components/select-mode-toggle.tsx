import { useSelected } from "@/components/fileSystems/grid-file-system/context/SelectedContext";
import { useSingleSelected } from "@/components/fileSystems/grid-file-system/context/SingleSelectedContext";
import { Toggle } from "@/components/ui/toggle";
import { GroupIcon } from "lucide-react";
import React from "react";

const SelectModeToggle = () => {
  const { selected, setSelected } = useSelected();
  const { setSingleSelected} = useSingleSelected()

  const onPressedChange = (value: boolean) => {
    setSelected(value ? [] : null);
    setSingleSelected(null);
  } 

  return (
    <Toggle
      pressed={selected !== null}
      onPressedChange={onPressedChange}
    >
      <GroupIcon />
    </Toggle>
  );
};

export default SelectModeToggle;
