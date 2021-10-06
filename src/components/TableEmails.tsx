import React, { useMemo } from "react";
import { Button, Table } from "antd";
import useFiles from "../hooks/useFiles";
import exportFile from "../utils/exportFile";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Repetições",
    dataIndex: "repetitions",
    key: "repetitions",
  },
];

export default function TableEmails() {
  const [files] = useFiles();
  const dataSource = useMemo(() => {
    let uniqueEmails: { [email: string]: { repetitions: number } } = {};
    Object.values(files).forEach(file => {
      file.emails.forEach(email => {
        if (email in uniqueEmails) {
          uniqueEmails[email].repetitions++;
        } else {
          uniqueEmails[email] = {
            repetitions: 1,
          };
        }
      });
    });
    return Object.entries(uniqueEmails).map(([email, { repetitions }], index) => ({
      email,
      repetitions,
      key: index,
    }));
  }, [files]);

  const handleExport = () => {
    exportFile("email_list.txt", dataSource.map(entry => entry.email).join("\n"));
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      footer={() => (
        <Button onClick={handleExport} type="primary">
          Exportar Lista
        </Button>
      )}
    />
  );
}
