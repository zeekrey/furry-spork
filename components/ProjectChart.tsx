import { TProjectExport } from "../types";
import { VictoryPie } from "victory";
import { styled } from "../stitches.config";

const Wrapper = styled("div", {
  width: 400
});

const ProjectChart: React.FunctionComponent<{
  data: { [key: string]: TProjectExport[] };
}> = ({ data }) => {
  // Bring prop to final data
  const resultSet = Object.entries(data).map(([id, entry]) => {
    const total = entry.reduce((acc, curr) => (acc += curr.amount), 0);

    return {
      x: id,
      y: total,
    };
  });

  return (
    <Wrapper>
      <VictoryPie
        colorScale={["#A259FF", "#F24E1E", "#FFC107", "#6497B1"]}
        innerRadius={90}
        data={resultSet}
        animate={{
          duration: 1000,
        }}
      />
    </Wrapper>
  );
};

export default ProjectChart;
