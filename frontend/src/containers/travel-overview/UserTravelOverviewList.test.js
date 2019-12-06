import React from 'react';
import { shallow, mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import UserTravelOverviewList from './UserTravelOverviewList';

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


describe('UserTravelOverviewList', () => {
  it('should render when no plan', () => {
    const component = shallow(<UserTravelOverviewList.WrappedComponent />);
    expect(component.find(Typography).at(0).text()).toBe('Make your first plan for a travel!');
  });
});
