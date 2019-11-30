import React from 'react';
import { shallow, mount } from 'enzyme';
import RecentTravelOverviewList from './RecentTravelOverviewList';

jest.mock('../../components/travel-overview/TravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewList">
        {props.travelList ? (
          <div>
            {props.travelList.map((travelOverviewItem, i) => (
              <div key={i} className="travelOverviewItem">
                {travelOverviewItem.title}
              </div>
            ))}
          </div>
        ) : (
          'No results were found'
        )}
      </div>
    );
  });
});


describe('RecentTravelOverviewList', () => {
  let recentTravelOverviewList;

  beforeEach(() => {
    recentTravelOverviewList = (
      <RecentTravelOverviewList />
    );
  });

  it('should render.', () => {
    const component = mount(recentTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
