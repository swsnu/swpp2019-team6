import React from 'react';
import { shallow, mount } from 'enzyme';
import UserTravelOverviewList from './UserTravelOverviewList';

jest.mock('../../components/travel-overview/TravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewList">
        {props.travelList ? (
          <div>
            {props.travelList.map((travelOverviewItem, i) => (
              <div key={i} className="travelOverviewItem">
                {travelOverviewItem.head.title}
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


describe('SearchTravelOverviewList', () => {
  let userTravelOverviewList;

  beforeEach(() => {
    userTravelOverviewList = (
      <UserTravelOverviewList />
    );
  });

  it('should render.', () => {
    const component = mount(userTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
