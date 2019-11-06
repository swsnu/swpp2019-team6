import React from 'react';
import { shallow, mount } from 'enzyme';
import PopularTravelOverviewList from './PopularTravelOverviewList';

jest.mock('../../components/travel-overview/TravelOverviewList', () => {
  return jest.fn((props) => {
    return (
      <div className="travelOverviewList">
        {props.travelList ? (
          <div>
            {props.travelList.map((travelOverviewItem) => (
              <div key={travelOverviewItem.id} className="travelOverviewItem">
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


describe('PopularTravelOverviewList', () => {
  let popularTravelOverviewList;

  beforeEach(() => {
    popularTravelOverviewList = (
      <PopularTravelOverviewList />
    );
  });

  it('should render.', () => {
    const component = mount(popularTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
