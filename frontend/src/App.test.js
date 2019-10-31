import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

const mockStore = getMockStore({
  state: 'empty',
});

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} store={mockStore} />
      </Provider>
    );
  });

  it('should render.', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });
});
