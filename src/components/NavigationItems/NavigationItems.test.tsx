import React from 'react';
import { NavLink } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    it('should render 0 <NavLink /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavLink)).toHaveLength(0);
    });
});