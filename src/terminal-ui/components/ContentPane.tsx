import { Box, Text } from 'npm:ink';
import BigText from 'npm:ink-big-text';
import Gradient from 'npm:ink-gradient';
import React from 'npm:react';

interface ContentPaneProps {
  title?: string;
  content?: string | typeof Box;
}

export const ContentPane = (props: ContentPaneProps) => {
  const title = props.title ?? 'Pane 1';
  let content: string | typeof Box;

  if (typeof props.content === 'string') {
    content = <Text>{props.content ?? 'I am the content area'}</Text>;
  } else {
    content = <Box>{props.content}</Box>;
  }

  return (
    <Box
      borderStyle='single'
      height='100%'
      width='100%'
      flexDirection='column'
      paddingLeft={4}
      paddingRight={4}
    >
      <Gradient name='retro'>
        <BigText text={title} />
      </Gradient>
      {content}
    </Box>
  );
};
