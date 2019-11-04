import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelOverviewList from './TravelOverviewList';


const temptravelList = [{
  title: 'Seoul Palace Tour',
  author: 'Alice',
  summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
},
{
  title: 'New York Tour',
  author: 'Bob',
  summary: 'IT\'S NEW YORK.',
  period: '2019.01.03 ~ 2019.10.15',
  likes: 30,
  photo: '/images/2.jpeg',
},
{
  title: 'Fantasy in Florence',
  author: 'Catherine',
  summary: 'Welcome!',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: '/images/3.jpeg',
}];

const emptytravelList = [];


describe('TravelOverviewList', () => {
  let travelOverviewList;

  beforeEach(() => {
    travelOverviewList = (
      <TravelOverviewList
        travelList={temptravelList}
      />
    );
  });

  it('should render.', () => {
    const component = mount(travelOverviewList);
    expect(component.find('.MuiGrid-item').length).toBe(3);
  });

  it('should render empty content.', () => {
    const component = mount(<TravelOverviewList
      travelList={emptytravelList}
    />);
    expect(component.find('.MuiGrid-item').length).toBe(0);
  });

  it('should render nothing.', () => {
    const component = mount(<TravelOverviewList />);
    expect(component.find('.MuiGrid-container').length).toBe(0);
  });
});
