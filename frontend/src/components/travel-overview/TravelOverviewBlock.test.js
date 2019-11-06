import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelOverviewBlock from './TravelOverviewBlock';


const temptravelOverviewItem = {
  title: 'Ultricies lacus sed turpis tincidunt',
  author: 'iluvswpp',
  summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
  period: '2019.03.04 ~ 2019.03.08',
  likes: 7,
  photo: null,
  is_public: true,
  allow_comment: true,
  is_forked: true,
  collaborators: ['iluvswpp', 'Alice', 'George'],
};

const temptravelOverviewItem2 = {
  title: 'Ultricies lacus sed turpis tincidunt',
  author: 'iluvswpp',
  summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
  period: '2019.03.04 ~ 2019.03.08',
  likes: 7,
  photo: null,
  is_public: false,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
};

const emptytravelOverviewItem = {
  title: null,
  author: null,
  summary: null,
  period: null,
  likes: null,
  photo: null,
  is_public: null,
  allow_comment: null,
  is_forked: null,
  collaborators: null,
};


describe('TravelOverviewBlock', () => {
  let travelOverviewBlock;

  // beforeEach(() => {
  //   travelOverviewBlock = (
  //     <TravelOverviewBlock
  //       travelOverviewItem={temptravelOverviewItem}
  //       is_mypage={false}
  //     />
  //   );
  // });

  it('should render - is_mypage: false.', () => {
    travelOverviewBlock = (
      <TravelOverviewBlock
        travelOverviewItem={temptravelOverviewItem}
        is_mypage={false}
      />
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(1);
  });

  it('should render - is_mypage: true / with collaborators', () => {
    travelOverviewBlock = (
      <TravelOverviewBlock
        travelOverviewItem={temptravelOverviewItem}
        is_mypage
      />
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(4);
  });


  it('should render - is_mypage: true. without collaborators', () => {
    travelOverviewBlock = (
      <TravelOverviewBlock
        travelOverviewItem={temptravelOverviewItem2}
        is_mypage
      />
    );
    const component = mount(travelOverviewBlock);
    expect(component.find('button').length).toBe(4);
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
