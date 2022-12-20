import { Tab } from "@headlessui/react";
import { TabLabel } from "../TabLabel/TabLabel";

type TabsProps = {
  onChange: (tab: any) => void;
  selected: any;
  tabs: any[];
};

export const Tabs = ({ onChange: baseOnChange, selected, tabs }: TabsProps) => {
  const onChange = (tab: any) => {
    baseOnChange(tab);
  };

  return (
    <main className={"lg:w-10/12  m-auto"}>
      <Tab.Group onChange={(idx) => onChange(tabs[idx])}>
        <div className="flex justify-center items-center">
          <Tab.List className="p-5">
            {tabs.map((tab) => (
              <TabLabel key={tab.id} selected={selected?.id === tab.id}>
                {tab.label}
              </TabLabel>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels tabIndex={-1}>
          {tabs.map(({ content, id }) => (
            <Tab.Panel tabIndex={-1} key={`tab-panel-${id}`}>
              {content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};
