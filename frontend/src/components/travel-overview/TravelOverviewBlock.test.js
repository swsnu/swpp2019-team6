import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelOverviewBlock from './TravelOverviewBlock';


const temptravelOverviewItem = {
  title: 'Seoul Palace Tour',
  author: 'Alice',
  summary: 'Exciting time warp to Chosun Dyasty. Feel the vivid color of Korea.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: '/images/1.jpeg',
};

const emptytravelOverviewItem = {
  title: null,
  author: null,
  summary: null,
  period: null,
  likes: null,
  photo: null,
};


describe('TravelOverviewBlock', () => {
  let travelOverviewBlock;

  beforeEach(() => {
    travelOverviewBlock = (
      <TravelOverviewBlock
        travelOverviewItem={temptravelOverviewItem}
      />
    );
  });

  it('should render.', () => {
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(1);
  });

  it('should render empty content.', () => {
    const component = mount(<TravelOverviewBlock
      travelOverviewItem={emptytravelOverviewItem}
    />);
    expect(component.find('.MuiCardMedia-root').length).toBe(0);
  });

  it('should render nothing.', () => {
    const component = mount(<TravelOverviewBlock />);
    expect(component.find('.MuiCardMedia-root').length).toBe(0);
  });
});
