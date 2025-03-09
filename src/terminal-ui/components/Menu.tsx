import { Box, render, Text } from 'npm:ink';
import { Tab, Tabs } from 'npm:ink-tab';
import React, { useState } from 'npm:react';

const TabExample = (props: {}) => {
  const [activeTabName, setActiveTabName] = useState(null);

  // the handleTabChange method get two arguments:
  // - the tab name
  // - the React tab element
  const handleTabChange = (name: string, activeTab: string) => {
    // set the active tab name to do what you want with the content
    setActiveTabName(name);
  };

  return (
    <Box flexDirection='column'>
      <Box>
        <Text>
          {activeTabName === 'foo' && 'Selected tab is "foo"'}
          {activeTabName === 'bar' && 'Selected tab is "bar"'}
          {activeTabName === 'baz' && 'Selected tab is "baz"'}
        </Text>
      </Box>

      <Tabs onChange={handleTabChange}>
        <Tab name='foo'>Foo</Tab>
        <Tab name='bar'>Bar</Tab>
        <Tab name='baz'>Baz</Tab>
      </Tabs>
    </Box>
  );
};

render(<TabExample />);
