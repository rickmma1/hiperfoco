import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

export const Chart = ({ values }: { values: number[] }) => {
  const data = values.map((y, x) => ({ x, y }));
  return (
    <VictoryChart theme={VictoryTheme.material} height={220}>
      <VictoryAxis dependentAxis />
      <VictoryAxis />
      <VictoryLine data={data} style={{ data: { stroke: '#3b82f6' } }} />
    </VictoryChart>
  );
};
