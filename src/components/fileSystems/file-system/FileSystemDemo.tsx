"use client";


const FileSystemDemo = ({
  className,
  height,
}: {
  className?: string;
  height?: number;
}) => {
  console.log(className);
  // return (
  //   <FileSystemProvider>
  //     <DefaultCardWrapper
  //       title="Моё облако"
  //       className={className}
  //       height={height}
  //     >
  //       <FileSystem
  //         rootFolder={rootFolder}
  //         hideFirst={true}
  //         height={height}
  //         openFolders
  //       />
  //     </DefaultCardWrapper> 
  //   </FileSystemProvider>
  // );
};

export default FileSystemDemo;
