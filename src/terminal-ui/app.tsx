import { useApp, useInput } from 'npm:ink';
import { Item } from 'npm:ink-select-input/build/SelectInput';
import React, { useState } from 'npm:react';
import { ContentPane } from './components/ContentPane.tsx';
import { MainLayout } from './components/Layout.tsx';
import { SideBar } from './components/SideBar.tsx';
import { UserTable } from './components/tables/UserTable.tsx';

const App = () => {
  const navItems: Item<string>[] = [
    { label: 'Pane 1', value: 'pane_one' },
    { label: 'Pane 2', value: 'pane_two' },
    { label: 'Exit', value: 'exit' },
  ];

  const [currentNavItem, setCUrrentNavItem] = useState(navItems[0]);
  const { exit } = useApp();

  useInput((input, _key) => {
    if (input === 'q') {
      exit();
    }
  });

  const onNavItemSlected = (item: Item<string>) => {
    if (item.value === 'exit') {
      exit();
    } else {
      setCUrrentNavItem(item);
    }
  };

  const contentPaneOne = ContentPane({
    title: 'Pane 1',
    content: "I'm the first content area",
  });
  const contentPaneTwo = ContentPane({
    title: 'Pane 2',
    content: UserTable(),
  });

  return (
    <MainLayout>
      <SideBar navItems={navItems} onSelect={onNavItemSlected} />
      {currentNavItem?.value === 'pane_one' && contentPaneOne}
      {currentNavItem?.value === 'pane_two' && contentPaneTwo}
      {/* <Content /> */}
    </MainLayout>
  );
};

export default App;
