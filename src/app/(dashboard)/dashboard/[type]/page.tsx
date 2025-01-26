import GridFileSystem from "@/components/fileSystems/grid-file-system/GridFileSystem";
import FileSystemProvider from "@/components/fileSystems/providers/FileSystemProvider";
import { FolderType } from "@/components/fileSystems/types";
import { convertToFileType } from "@/components/fileSystems/utils";
import { Button } from "@/components/ui/button";
import Sort from "@/components/ui/sort";
import { getFiles } from "@/lib/actions/files.actions";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const filesPageTypes = ["images", "videos", "documents", "audio", "others"];
const Page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const type = (await params).type;

  if (!filesPageTypes.includes(type)) return notFound();

  const files = await getFiles();
  const convertedFiles = files.documents.map((file: any) => {
    return convertToFileType(file);
  });
  const rootFolder: FolderType = {
    name: "Home",
    id: "root",
    contents: convertedFiles,
  };

  return (
    <section className="my-16">
      <div className="flex justify-between mx-4">
        <div>
          <div className="flex gap-2 items-center text-4xl font-bold capitalize">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/files">
                <ChevronLeftIcon />
              </Link>
            </Button>
            {type}
          </div>
          <p className="text-sm ml-12 text-zinc-400">
            Всего: <span className="font-bold text-zinc-50">0GB</span>
          </p>
        </div>
        <div className="flex gap-2">
          <div>
            Сортировка: <Sort />
          </div>
        </div>
      </div>
      <div className="my-4 h-px bg-border" />
      <div>
        <FileSystemProvider>
          <GridFileSystem rootFolder={rootFolder} hideFirst />
        </FileSystemProvider>
      </div>
    </section>
  );
};

export default Page;
