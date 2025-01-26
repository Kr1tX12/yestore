import { ToastProps } from "@/components/ui/toast";
import { getWordEnding } from "@/lib/utils";

export const getBigFilesErrorToastParams = ({
  bigFiles,
}: {
  bigFiles: File[];
}) => {
  return {
    variant: "destructive",

    title: `${bigFiles.length} ${getWordEnding(bigFiles.length, ["файл", "файла", "файлов"])} не были загружены`,
    description:
      bigFiles.length === 1 ? (
        <p>
          <span className="text-primary">{bigFiles[0].name}</span> слишком
          большой. Максимальный размер файла - 50 МБ
        </p>
      ) : (
        <p>
          <span className="text-destructive-foreground/70">
            {bigFiles[0].name} {bigFiles.length === 2 ? "И" : ","}{" "}
            {bigFiles[1].name}
          </span>{" "}
          {bigFiles.length === 2
            ? " слишком большие."
            : ` и ещё ${bigFiles.length - 2} ${getWordEnding(bigFiles.length - 2, ["файл", "файла", "файлов"])} слишком большие`}
          . <br /> Максимальный размер 1 файла - 50МБ
        </p>
      ),
  } as ToastProps;
};
