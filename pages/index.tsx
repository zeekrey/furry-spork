import { styled, Box } from "../stitches.config";
import Image from "next/image";
import useSWR from "swr";
import { useState, useCallback } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { groupBy, fetcher } from "../utils";

import Layout from "../components/Layout";
import MenuBar from "../components/MenuBar";
import Filter from "../components/Filter";
import ProjectContainer from "../components/Project";
import Footer from "../components/Footer";
import FallbackImage from "../public/fallback.png";
import Button from "../components/Button";
import ProjectChart from "../components/ProjectChart";

import { TGateway, TProject, TProjectExport, TUser } from "../types";

const APIPATH = "http://178.63.13.157:8090/mock-api/api";

const Wrapper = styled("div", {
  display: "flex",
  flex: 1,
});

const Home = () => {
  const [resultSet, setResultSet] = useState<
    undefined | { [key: string]: TProjectExport[] }
  >(undefined);
  const [selectedProject, setSelectedProject] = useState<undefined | string>(
    undefined
  );
  const [selectedGateway, setSelectedGateway] = useState<undefined | string>(
    undefined
  );
  const [fromDate, setFromDate] = useState("2021-01-27");
  const [toDate, setToDate] = useState("2021-10-27");

  // Get all users
  const { data: users }: { data?: { data: TUser[] } } = useSWR(
    `${APIPATH}/users`,
    fetcher
  );
  // Get all projects
  const { data: projects }: { data?: { data: TProject[] } } = useSWR(
    `${APIPATH}/projects`,
    fetcher
  );
  // Get all gateways
  const { data: gateways }: { data?: { data: TGateway[] } } = useSWR(
    `${APIPATH}/gateways`,
    fetcher
  );

  // Calc the total over all projects. useCallback to prevent rerunning unless resultSet changes.
  const total = useCallback(
    () =>
      resultSet
        ? Object.entries(resultSet).reduce((acc, [id, curr]) => {
            const subTotal = curr.reduce(
              (_acc, _curr) => (_acc += _curr.amount),
              0
            );
            return (acc += subTotal);
          }, 0)
        : 0,
    [resultSet]
  );

  const generateReport = async () => {
    const response = await fetch(`${APIPATH}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromDate,
        to: toDate,
        projectId: selectedProject,
        gatewayId: selectedGateway,
      }),
    });

    const { data } = await response.json();

    if (selectedGateway) setResultSet(groupBy(data, "projectId"));
    else setResultSet(groupBy(data, "gatewayId"));
  };

  return (
    <Wrapper>
      <MenuBar />
      <Box
        css={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "$4",
          paddingLeft: "0",
        }}
      >
        <Box
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Box as="h1" css={{ textAlign: "left", margin: 0 }}>
              Reports
            </Box>
            <div>Easily generate a report of your transactions</div>
          </Box>
          <Box css={{ display: "flex", gap: "$2" }}>
            {projects?.data.length && (
              <Filter
                id="projectFilter"
                name="projectFilter"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {[
                  { projectId: "", name: "All projects" },
                  ...projects.data,
                ].map(({ projectId, name }) => (
                  <option key={projectId} value={projectId}>
                    {projectId} {name}
                  </option>
                ))}
              </Filter>
            )}
            {gateways?.data.length && (
              <Filter
                id="gatewayFilter"
                name="gatewayFilter"
                value={selectedGateway}
                onChange={(e) => setSelectedGateway(e.target.value)}
              >
                {[
                  { gatewayId: "", name: "All gateways" },
                  ...gateways.data,
                ].map(({ gatewayId, name }) => (
                  <option key={gatewayId} value={gatewayId}>
                    {name}
                  </option>
                ))}
              </Filter>
            )}
            <Filter
              as="input"
              value={fromDate}
              type="date"
              id="fromDate"
              name="fromDate"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFromDate(e.target.value)
              }
            />
            <Filter
              as="input"
              value={toDate}
              type="date"
              id="toDate"
              name="toDate"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToDate(e.target.value)
              }
            />
            <Button onClick={generateReport}>Generate report</Button>
          </Box>
        </Box>
        {!resultSet ? (
          <Box
            css={{
              display: "grid",
              placeContent: "center",
              textAlign: "center",
              padding: "0 25% ",
              flex: 1,
            }}
          >
            <h1>No reports</h1>
            <strong>
              Currently you have no data for the reports to be generated. Once
              you start generating traffic through the Balance application the
              reports will be shown.
            </strong>
            <Box>
              <Image src={FallbackImage} alt="fallback image" />
            </Box>
          </Box>
        ) : (
          <Box
            css={{
              flex: 1,
              marginTop: "$4",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Box
              css={{
                background: "$blueLight",
                borderRadius: 10,
                padding: "$4",
                flex: 1,
              }}
            >
              <Box
                as="h2"
                css={{
                  margin: 0,
                  paddingBottom: "$4",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Filter names
              </Box>
              <Accordion.Root type="single" collapsible>
                {Object.entries(resultSet).map(([projectId, data]) => (
                  <ProjectContainer
                    key={projectId}
                    project={{ id: projectId, data: data }}
                  />
                ))}
              </Accordion.Root>
            </Box>
            {(selectedProject || selectedGateway) && (
              <Box css={{ flex: 1, display: "grid", placeContent: "center" }}>
                <ProjectChart data={resultSet} />
              </Box>
            )}
          </Box>
        )}
        <Box
          css={{
            marginTop: "$4",
            padding: "$4",
            background: "$blueLight",
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "19px",
          }}
        >
          TOTAL:{" "}
          {new Intl.NumberFormat("en-EN", {
            style: "currency",
            currency: "USD",
          }).format(total())}
        </Box>
        <Footer />
      </Box>
    </Wrapper>
  );
};

Home.layout = Layout;

export default Home;
