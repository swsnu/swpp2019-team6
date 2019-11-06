import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchTravelOverviewList from './SearchTravelOverviewList';

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


describe('SearchTravelOverviewList', () => {
  let searchTravelOverviewList;

  beforeEach(() => {
    searchTravelOverviewList = (
      <SearchTravelOverviewList
        tag="hello"
      />
    );
  });

  it('should render.', () => {
    const component = mount(searchTravelOverviewList);
    expect(component.find('.travelOverviewList').length).toBe(1);
  });
});
