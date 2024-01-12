import React from 'react';
import './style.scss';
import { useState } from 'react';
import LeftNavigation from '../../../public/assets/icons/LeftNavigation';
import RightNavigation from '../../../public/assets/icons/RightNavigation';

const SwitchTabs = ({ data, onTabChange, navigation }) => {
  // eslint-disable-next-line react/jsx-key
  data = [<LeftNavigation />, <RightNavigation />];
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  //to set which tab is active and onTabChange -> for getting data according to active tab -> like day/week based or movies/shows
  const activeTab = (tab, idx) => {
    setLeft(idx * 100);
    setTimeout(() => {
      setSelectedTab(idx);
    }, 300);
    onTabChange(tab, idx);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, idx) => {
          return (
            <span
              key={idx}
              className={`tabItem ${selectedTab === idx ? 'active' : ''}`}
              onClick={() => {
                activeTab(tab, idx);
                navigation(idx === 0 ? 'left' : 'right');
              }}
            >
              {tab}
            </span>
          );
        })}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
