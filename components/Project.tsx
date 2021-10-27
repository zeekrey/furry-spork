import { styled, keyframes } from "../stitches.config";
import type { TProjectExport } from "../types";
import * as Accordion from "@radix-ui/react-accordion";

const open = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const close = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const AccordionContent = styled(Accordion.Content, {
  '&[data-state="open"]': { animation: `${open} 300ms ease-out` },
  '&[data-state="closed"]': { animation: `${close} 300ms ease-out` },
});

const Wrapper = styled(Accordion.Item, {
  paddingBottom: "$2",
});

const CardHeader = styled(Accordion.Trigger, {
  all: "unset",
  background: "White",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: 10,
  cursor: "pointer",

  h3: {
    margin: 0,
    padding: "$4",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
  },

  div: {
    padding: "$4",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
  },
});

const Table = styled("table", {
  width: "100%",
  padding: "$3",
  borderSpacing: 0,

  tr: {
    "&:nth-child(odd)": {
      background: "white",
    },
  },

  td: {
    padding: "$2",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "164.4%",

    color: "$blueDark",
    textAlign: "center",

    "&:first-of-type": {
      textAlign: "left",
    },

    "&:last-of-type": {
      textAlign: "right",
    },
  },
});

const ProjectContainer: React.FunctionComponent<{
  project: { id: string; data: TProjectExport[] };
}> = ({ project }) => {
  const { id, data } = project;

  // Calculate total
  const total = data.reduce((acc, curr) => (acc += curr.amount), 0);

  return (
    <Wrapper value={id}>
      <Accordion.Header asChild>
        <CardHeader>
          <h3>{id}</h3>
          <div>
            TOTAL:{" "}
            {new Intl.NumberFormat("en-EN", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </div>
        </CardHeader>
      </Accordion.Header>
      <AccordionContent>
        <Table>
          <tr>
            <td>Date</td>
            <td>Gateway</td>
            <td>Transaction ID</td>
            <td>Amount</td>
          </tr>
          {data.map((entry) => (
            <tr key={entry.created}>
              <td>{entry.created}</td>
              <td>{entry.gatewayId}</td>
              <td>{entry.paymentId}</td>
              <td>
                {new Intl.NumberFormat("en-EN", {
                  style: "currency",
                  currency: "USD",
                }).format(entry.amount)}
              </td>
            </tr>
          ))}
        </Table>
      </AccordionContent>
    </Wrapper>
  );
};

export default ProjectContainer;
