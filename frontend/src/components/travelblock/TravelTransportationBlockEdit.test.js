import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import TravelTransportationBlockEdit from './TravelTransportationBlockEdit';
import TravelBlockCloseButton from '../common/TravelBlockCloseButton';
import TravelBlockExpandButton from '../common/TravelBlockExpandButton';
import TimePickerWrapper from '../common/TimePicker';
import '../../setupTests';

describe('<TravelTransportationBlockEdit />', () => {
  let items;
  let index;
  let handleRemove;
  let handleBlockInfo;

  beforeEach(() => {
    items = [
      {
        id: 'transportation-0',
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
    index = 0;
    handleRemove = jest.fn();
    handleBlockInfo = jest.fn();
  });

  it('should render without errors', () => {
    const component = shallow(<TravelTransportationBlockEdit
      items={items}
      index={index}
      handleRemove={handleRemove}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });

  it('should change start Time', () => {
    const component = shallow(<TravelTransportationBlockEdit
      items={items}
      index={index}
      handleRemove={handleRemove}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperTimePicker = component.find(TimePickerWrapper);
    wrapperTimePicker.at(0).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    expect(handleBlockInfo).toHaveBeenCalledTimes(1);
  });

  it('should change end Time', () => {
    const component = shallow(<TravelTransportationBlockEdit
      items={items}
      index={index}
      handleRemove={handleRemove}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperTimePicker = component.find(TimePickerWrapper);
    wrapperTimePicker.at(1).simulate('change', { target: { value: '2000-01-01T00:00:00' } });
    expect(handleBlockInfo).toHaveBeenCalledTimes(1);
  });

  it('should close travel block', () => {
    const component = mount(<TravelTransportationBlockEdit
      items={items}
      index={index}
      handleRemove={handleRemove}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperIconButton = component.find(TravelBlockCloseButton);
    wrapperIconButton.simulate('click');
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('should expand travel block', () => {
    const component = mount(<TravelTransportationBlockEdit
      items={items}
      index={index}
      handleRemove={handleRemove}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperIconButton = component.find(TravelBlockExpandButton);
    wrapperIconButton.simulate('click');
    expect(handleBlockInfo).toHaveBeenCalledTimes(1);
  });

  it('should change travel description', () => {
    items[0].info.expand = true;
    const component = shallow(<TravelTransportationBlockEdit
      items={items}
      index={index}
      handleRemove={handleRemove}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperTextField = component.find(TextField);
    wrapperTextField.simulate('change', { target: { value: 'TEST' } });
    expect(handleBlockInfo).toHaveBeenCalledTimes(1);
  });
});
