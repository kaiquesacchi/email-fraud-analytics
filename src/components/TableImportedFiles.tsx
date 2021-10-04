import React from "react";
import { message, Table, Upload, Button } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import parser from "../utils/parser";
import useFiles from "../hooks/useFiles";

export default function TableImportedFiles() {
  /* ------------------------------------------- Hooks ------------------------------------------ */
  const [files, dispatchFiles] = useFiles();

  /* ----------------------------------------- Handlers ----------------------------------------- */
  const handleFileUpload = (file: RcFile) => {
    const reader = new FileReader();

    reader.onload = event => {
      // Parse file
      const emails = parser(file.name, event.target?.result as string);
      if (!emails) {
        message.error(`Extensão não suportada para arquivo: ${file.name}`);
        return;
      }

      // Add file to the parsed list
      dispatchFiles({
        type: "add",
        emails,
        fileName: file.name,
      });

      message.success(`Arquivo importado: ${file.name}`);
    };

    reader.readAsText(file);

    // Prevents upload to the web.
    return false;
  };

  const handleDeleteFile = (fileName: string) => {
    dispatchFiles({
      type: "remove",
      fileName,
    });
    message.info(`Arquivo '${fileName}' removido `);
  };

  /* --------------------------------------- Table config. -------------------------------------- */
  const columns = [
    {
      title: "Nome do Arquivo",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Número de e-mails registrados",
      dataIndex: "emailCount",
      key: "emailCount",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
        <Button shape="circle" icon={<DeleteOutlined />} onClick={() => handleDeleteFile(record.fileName)} />
      ),
    },
  ];

  const dataSource = Object.entries(files).map(([key, { emails }], index) => ({
    key: index,
    emailCount: emails.length,
    fileName: key,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      footer={() => (
        <Upload.Dragger accept=".csv,.xlsx,.txt" multiple beforeUpload={handleFileUpload} showUploadList={false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Clique ou arraste o arquivo para importar</p>
        </Upload.Dragger>
      )}
    />
  );
}
