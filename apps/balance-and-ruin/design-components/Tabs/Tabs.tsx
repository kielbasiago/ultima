import { Tab } from "@headlessui/react";
import { TabLabel } from "../TabLabel/TabLabel";

type TabsProps = {
  onChange: (tab: any) => void;
  selected: any;
  tabs: any[];
};

export const Tabs = ({ onChange, selected, tabs }: TabsProps) => {
  return (
    <div>
      <Tab.Group onChange={(idx) => onChange(tabs[idx])}>
        <Tab.List className="p-5">
          {tabs.map((tab) => (
            <TabLabel key={tab.id} selected={selected?.id === tab.id}>
              {tab.label}
            </TabLabel>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map(({ content, id }) => (
            <Tab.Panel key={`tab-panel-${id}`}>{content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
