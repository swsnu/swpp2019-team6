import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchTravelOverviewList from './SearchTravelOverviewList';


const tempTravelList = [{
  title: 'A',
  author: 'Alice',
  summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
},
{
  title: 'B',
  author: 'Bob',
  summary: 'IT\'S NEW YORK.',
  period: '2019.01.03 ~ 2019.10.15',
  likes: 30,
  photo: '/images/2.jpeg',
},
{
  title: 'C',
  author: 'Catherine',
  summary: 'Welcome!',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: '/images/3.jpeg',
},
{
  title: 'D',
  author: 'Alice',
  summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
},
{
  title: 'E',
  author: 'Bob',
  summary: 'IT\'S NEW YORK.',
  period: '2019.01.03 ~ 2019.10.15',
  likes: 30,
  photo: '/images/2.jpeg',
},
{
  title: 'F',
  author: 'Catherine',
  summary: 'Welcome!',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: '/images/3.jpeg',
}];

const emptytravelList = [];

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
