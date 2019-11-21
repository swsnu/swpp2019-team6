import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddIcon from '@material-ui/icons/Add';
import CreateTravel, { getItems } from './CreateTravel';
import TravelTransportationBlockEdit from '../../components/travelblock/TravelTransportationBlockEdit';
import TravelCustomBlockEdit from '../../components/travelblock/TravelCustomBlockEdit';
import TravelActivityBlockEdit from '../../components/travelblock/TravelActivityBlockEdit';
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
    const component = mount(<CreateTravel items={[{ id: 'restaurant-0' }]} />);
    const wrapperTravelActivityBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelActivityBlockEdit.length).toBe(1);
  });

  it('should render transportation without errors', () => {
    const component = mount(<CreateTravel items={[{ id: 'transportation-0' }]} />);
    const wrapperTravelTransportationBlockEdit = component.find(TravelTransportationBlockEdit);
    expect(wrapperTravelTransportationBlockEdit.length).toBe(1);
  });

  it('should render activity without errors', () => {
    const component = mount(<CreateTravel items={[{ id: 'activity-0' }]} />);
    const wrapperTravelActivityBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelActivityBlockEdit.length).toBe(1);
  });

  it('should render hotel without errors', () => {
    const component = mount(<CreateTravel items={[{ id: 'hotel-0' }]} />);
    const wrapperTravelActivityBlockEdit = component.find(TravelActivityBlockEdit);
    expect(wrapperTravelActivityBlockEdit.length).toBe(1);
  });

  it('should render custom without errors', () => {
    const component = mount(<CreateTravel items={[{ id: 'custom-0' }]} />);
    const wrapperTravelCustomBlockEdit = component.find(TravelCustomBlockEdit);
    expect(wrapperTravelCustomBlockEdit.length).toBe(1);
  });

  it('should change add icon when dragging', () => {
    const component = mount(<CreateTravel />);
    const wrapperAddIcon = component.find(AddIcon);
    expect(wrapperAddIcon.length).toBe(5);
  });
});
