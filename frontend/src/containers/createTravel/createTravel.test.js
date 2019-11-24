import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddIcon from '@material-ui/icons/Add';

import CreateTravel from './CreateTravel';
import TravelHeaderBlockEdit from '../../components/travelblock/TravelHeaderBlockEdit';
import TravelTransportationBlockEdit from '../../components/travelblock/TravelTransportationBlockEdit';
import TravelCustomBlockEdit from '../../components/travelblock/TravelCustomBlockEdit';
import TravelActivityBlockEdit from '../../components/travelblock/TravelActivityBlockEdit';
import TravelDayBlock from '../../components/travelblock/TravelDayBlock';
import DatePickerWrapper from '../../components/common/DatePicker';
import '../../setupTests';

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    dragHandleProps: {},
    innerRef: jest.fn(),
  }, {
    isDragging: true,
  }),
  DragDropContext: ({ children }) => children,
}));

describe('<CreateTravel />', () => {
  it('should render restaurant without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'restaurant-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          point: '',
        },
      },
    ];
    const component = mount(<CreateTravel items={items} />);
    const wrapperTravelActivityBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelActivityBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render transportation without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'transportation-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          startPoint: '',
          endPoint: '',
        },
      },
    ];
    const component = mount(<CreateTravel items={items} />);
    const wrapperTravelTransportationBlockEdit = component.find(TravelTransportationBlockEdit);
    expect(wrapperTravelTransportationBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render activity without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'activity-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          point: '',
        },
      },
    ];
    const component = mount(<CreateTravel items={items} />);
    const wrapperTravelActivityBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelActivityBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render hotel without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'hotel-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          point: '',
        },
      },
    ];
    const component = mount(<CreateTravel items={items} />);
    const wrapperTravelActivityBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelActivityBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });

  it('should render custom without errors', () => {
    const items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T09:00:00'),
          description: '',
          expand: true,
        },
      },
      {
        id: 'custom-1',
        info: {
          startTime: new Date('2030-01-01T09:00:00'),
          endTime: new Date('2030-01-01T09:00:00'),
          description: '',
          expand: false,
          title: '',
        },
      },
    ];
    const component = mount(<CreateTravel items={items} />);
    const wrapperTravelCustomBlockEdit = component.find(TravelCustomBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
    const wrapperTravelDayBlock = component.find(TravelDayBlock);
    expect(wrapperTravelDayBlock.length).toBe(1);
  });
});
