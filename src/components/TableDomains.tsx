import React, { useMemo } from "react";
import { Button, Table } from "antd";
import useFiles from "../hooks/useFiles";
import exportFile from "../utils/exportFile";
const columns = [
  {
    title: "Domínio",
    dataIndex: "domain",
    key: "domain",
  },
  {
    title: "Repetições",
    dataIndex: "repetitions",
    key: "repetitions",
  },
];

export default function TableDomains() {
  const [files] = useFiles();
  const dataSource = useMemo(() => {
    let uniqueDomains: { [domain: string]: { repetitions: number } } = {};
    Object.values(files).forEach(file => {
      file.emails.forEach(email => {
        const domain = email.split("@")[1];
        if (domain in uniqueDomains) {
          uniqueDomains[domain].repetitions++;
        } else {
          uniqueDomains[domain] = {
            repetitions: 1,
          };
        }
      });
    });
    return Object.entries(uniqueDomains).map(([domain, { repetitions }], index) => ({
      domain,
      repetitions,
      key: index,
    }));
  }, [files]);

  const handleExport = () => {
    exportFile("domain_list.txt", dataSource.map(entry => entry.domain).join("\n"));
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
