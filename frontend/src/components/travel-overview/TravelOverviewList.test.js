import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import TravelOverviewList from './TravelOverviewList';


const tempTravelList = [{
  title: 'Curabitur gravida arcu ac tortor dignissim',
  author: 'iluvswpp',
  summary: 'Habitasse platea dictumst quisque sagittis. Mattis aliquam faucibus purus in massa tempor nec feugiat.',
  period: '2019.10.01 ~ 2019.10.04',
  likes: 57,
  photo: null,
  is_public: false,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'Quis viverra nibh cras pulvinar mattis',
  author: 'iluvswpp',
  summary: 'Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Pellentesque pulvinar pellentesque habitant morbi tristique.',
  period: '2019.01.03 ~ 2019.10.15',
  likes: 30,
  photo: null,
  is_public: true,
  allow_comment: true,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'Velit aliquet sagittis id consectetur purus ut',
  author: 'iluvswpp',
  summary: 'Eget mauris pharetra et ultrices neque ornare. Faucibus et molestie ac feugiat sed lectus vestibulum.',
  period: '2019.07.29 ~ 2019.08.01',
  likes: 19,
  photo: null,
  is_public: true,
  allow_comment: false,
  is_forked: false,
  collaborators: ['iluvswpp'],
},
{
  title: 'Ultricies lacus sed turpis tincidunt',
  author: 'iluvswpp',
  summary: 'Pharetra magna ac placerat vestibulum lectus. Pretium viverra suspendisse potenti nullam ac..',
  period: '2019.03.04 ~ 2019.03.08',
  likes: 7,
  photo: null,
  is_public: false,
  allow_comment: false,
  is_forked: true,
  collaborators: ['iluvswpp', 'Alice', 'George'],
},
];

const emptyTravelList = [];


describe('TravelOverviewList', () => {
  let travelOverviewList;

  // beforeEach(() => {
  //   travelOverviewList = (
  //     <TravelOverviewList
  //       travelList={tempTravelList}
  //     />
  //   );
  // });

  it('should render. - is_mypage: false', () => {
    travelOverviewList = (
      <MemoryRouter initialEntries={['/user/1']}>
        <TravelOverviewList
          travelList={tempTravelList}
          is_mypage={false}
        />
      </MemoryRouter>
    );
    const component = mount(travelOverviewList);
    expect(component.find('button').length).toBe(4);
  });

  it('should render. - is_mypage: true', () => {
    travelOverviewList = (
      <MemoryRouter initialEntries={['/user/1']}>
        <TravelOverviewList
          travelList={tempTravelList}
          is_mypage
        />
      </MemoryRouter>

    );
    const component = mount(travelOverviewList);
    expect(component.find('button').length).toBe(17);
  });


  it('should render empty content.', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/user/1']}>
        <TravelOverviewList
          travelList={emptyTravelList}
        />
      </MemoryRouter>,
    );
    expect(component.find('.MuiGrid-item').length).toBe(0);
  });

  it('should render nothing.', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/user/1']}>
        <TravelOverviewList />
      </MemoryRouter>,
    );
    expect(component.find('.MuiGrid-container').length).toBe(0);
  });
});
