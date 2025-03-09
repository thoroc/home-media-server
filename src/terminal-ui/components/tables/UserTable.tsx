import { faker } from 'npm:@faker-js/faker';
import { Box, Text } from 'npm:ink';
import React from 'npm:react';
import { Styles } from '../../types.ts';

const fakeUsers = Array.from({ length: 10 })
  .fill(true)
  .map((_, index) => ({
    id: index,
    name: faker.internet.username(),
    email: faker.internet.email(),
  }));

type User = {
  id: number;
  name: string;
  email: string;
};

interface UserTableProps {
  users?: User[];
  styles?: Styles;
}

export const UserTable = (props?: UserTableProps) => {
  const users = props?.users ?? fakeUsers;
  const borderStyle = props?.styles?.borderStyle ?? 'single';
  const justifyContent = props?.styles?.justifyContent ?? 'flex-start';

  return (
    <Box flexDirection='column' width='100%'>
      {/* remove all margin and padding */}
      <Box>
        <Box
          justifyContent={justifyContent}
          borderStyle={borderStyle}
          width='10%'
        >
          <Text>ID</Text>
        </Box>

        <Box
          justifyContent={justifyContent}
          borderStyle={borderStyle}
          width='50%'
        >
          <Text>Name</Text>
        </Box>

        <Box
          justifyContent={justifyContent}
          borderStyle={borderStyle}
          width='40%'
        >
          <Text>Email</Text>
        </Box>
      </Box>

      {users.map((user) => (
        <Box key={user.id}>
          <Box
            justifyContent={justifyContent}
            borderStyle={borderStyle}
            width='10%'
          >
            <Text>{user.id}</Text>
          </Box>

          <Box
            justifyContent={justifyContent}
            borderStyle={borderStyle}
            width='50%'
          >
            <Text>{user.name}</Text>
          </Box>

          <Box
            justifyContent={justifyContent}
            borderStyle={borderStyle}
            width='40%'
          >
            <Text>{user.email}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
