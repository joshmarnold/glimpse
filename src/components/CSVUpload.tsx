import { uploadLeadsCSV } from "@/services/db/leads";
import type { Lead } from "@/types";
import { Button, Flex } from "@radix-ui/themes";
import { useRef, useState } from "react";

export function CSVUpload({ setData, setTotalCount }: {
    setData: (data: Lead[]) => void;
    setTotalCount: (count: number) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const { error, data } = await uploadLeadsCSV(file);

    if (error) {
      console.error("Upload error:", error);
      return;
    }
    if (!data) {
      console.error("No data returned from upload");
      return;
    }

    setData(data.slice(0, 10));
    setTotalCount(data.length);
    fileInputRef.current!.value = "";
    setFileName(null);
  };

  return (
    <Flex gap="1" align="center">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Button onClick={handleClick}>Upload CSV</Button>
      {fileName && (
        <span className="text-sm text-muted-foreground">{fileName}</span>
      )}
    </Flex>
  );
}
