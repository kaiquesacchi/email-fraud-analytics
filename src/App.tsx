import React from "react";
import { Row, Col, Layout, Tabs } from "antd";
import TableImportedFiles from "./components/TableImportedFiles";
import TableEmails from "./components/TableEmails";
import TableDomains from "./components/TableDomains";

function App() {
  return (
    <Layout>
      <Layout.Content style={{ padding: "30px", minHeight: "100vh" }}>
        <Tabs defaultActiveKey="files">
          <Tabs.TabPane tab="Arquivos Importados" key="files">
            <Row justify="center">
              <Col span={24}>
                <TableImportedFiles />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="E-mails" key="emails">
            <Row justify="center">
              <Col span={24}>
                <TableEmails />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Domínios" key="domains">
            <Row justify="center">
              <Col span={24}>
                <TableDomains />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Layout.Content>
    </Layout>
  );
}

export default App;
