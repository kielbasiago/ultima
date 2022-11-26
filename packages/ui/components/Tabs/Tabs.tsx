import { Tab } from "@headlessui/react";
import { cva, VariantProps } from "cva";
import { TabItem, TabItemProps } from "../TabItem/TabItem";

type TabItem = TabItemProps["item"];

type TabsProps = {
  onChange: (tab: TabItem) => void;
  selected: TabItem;
  tabs: TabItem[];
};

export const Tabs = ({ onChange, selected, tabs }: TabsProps) => {
  return (
    <Tab.Group onChange={(idx) => onChange(tabs[idx])}>
      <Tab.List className="">
        {tabs.map((tab) => (
          <TabItem key={tab.id} item={tab} selected={selected?.id === tab.id}>
            {tab.label}
          </TabItem>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ content, id }) => (
          <Tab.Panel key={`tab-panel-${id}`}>{content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
