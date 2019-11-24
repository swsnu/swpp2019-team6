import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import TravelDayBlock from './TravelDayBlock';
import TimePickerWrapper from '../common/TimePicker';
import '../../setupTests';

describe('<TravelDayBlock />', () => {
  let items;
  let index;
  let handleBlockInfo;

  beforeEach(() => {
    items = [
      {
        id: 'day-0',
        info: {
          datetime: new Date('2020-01-01T00:00:00'),
          expand: false,
          title: '',
        },
      },
    ];
    index = 0;
    handleBlockInfo = jest.fn();
  });

  it('should render without errors', () => {
    const component = shallow(<TravelDayBlock
      items={items}
      index={index}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperCard = component.find(Card);
    expect(wrapperCard.length).toBe(1);
  });

  it('should print datetime', () => {
    const component = shallow(<TravelDayBlock
      items={items}
      index={index}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperTypography = component.find(Typography);
    expect(wrapperTypography.at(0).text()).toBe('2020/1/1 (WED)');
  });

  it('should expand travel block', () => {
    const component = shallow(<TravelDayBlock
      items={items}
      index={index}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperIconButton = component.find(IconButton);
    wrapperIconButton.simulate('click');
    expect(handleBlockInfo).toHaveBeenCalledTimes(1);
  });

  it('should change travel description', () => {
    items[0].info.expand = true;
    const component = shallow(<TravelDayBlock
      items={items}
      index={index}
      handleBlockInfo={handleBlockInfo}
    />);
    const wrapperTextField = component.find(TextField);
    wrapperTextField.simulate('change', { target: { value: 'TEST' } });
    expect(handleBlockInfo).toHaveBeenCalledTimes(1);
  });
});
