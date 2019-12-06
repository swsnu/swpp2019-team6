import React from 'react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import SearchTravelOverviewList from './SearchTravelOverviewList';

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


describe('SearchTravelOverviewList', () => {
  it('should render tag result', () => {
    const component = mount(<SearchTravelOverviewList tag="TEST" />);
    expect(component.find(Typography).at(0).text()).toBe('Results for #TEST');
  });

  it('should render no result', () => {
    const component = mount(<SearchTravelOverviewList />);
    expect(component.find(Typography).at(0).text()).toBe('No search tag');
  });
});
