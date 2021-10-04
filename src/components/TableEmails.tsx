import React, { useMemo } from "react";
import { Table } from "antd";
import useFiles from "../hooks/useFiles";

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

  return <Table columns={columns} dataSource={dataSource} />;
}
