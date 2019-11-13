import React from 'react';
import { shallow } from 'enzyme';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateTravel from './CreateTravel';
import '../../setupTests';


describe('<CreateTravel />', () => {
  it('should render without errors', () => {
    const component = shallow(<CreateTravel />);
    console.log(component.debug());
    const wrapperDragDropContext = component.find(DragDropContext);
    expect(wrapperDragDropContext.length).toBe(1);
  });
});
