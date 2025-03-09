import { Box, Text } from 'npm:ink';
import React from 'npm:react';

interface TableData {
  id: string;
  [key: string]: unknown;
}

interface TableProps {
  data?: TableData[];
}

export const Table = (props?: TableProps) => {
  const data = props?.data ?? [];

  const header = Object.keys(data[0] ?? {}).map((key) => (
    <Box width='20%'>
      <Text>{key}</Text>
    </Box>
  ));

  const rows = data.map((d) => (
    <Box key={d.id}>
      {Object.values(d as Record<string, unknown>).map((value) => (
        <Box width='20%'>
          <Text>{value}</Text>
        </Box>
      ))}
    </Box>
  ));

  return (
    <Box flexDirection='column' width={80}>
      <Box>
        {header}
      </Box>

      {rows}
    </Box>
  );
};
