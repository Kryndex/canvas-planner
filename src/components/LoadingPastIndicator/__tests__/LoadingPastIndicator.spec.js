/*
 * Copyright (C) 2017 - present Instructure, Inc.
 *
 * This module is part of Canvas.
 *
 * This module and Canvas are free software: you can redistribute them and/or modify them under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * This module and Canvas are distributed in the hope that they will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import LoadingPastIndicator from '../index';
import {shallow} from 'enzyme';
jest.mock( '../../../utilities/scrollUtils');
import {animateSlideDown} from '../../../utilities/scrollUtils';

it('renders very little', () => {
  const wrapper = shallow(<LoadingPastIndicator />);
  expect(wrapper).toMatchSnapshot();
});

it('renders spinner while loading', () => {
  const wrapper = shallow(<LoadingPastIndicator loadingPast={true} />);
  expect(wrapper).toMatchSnapshot();
});

it('still renders loading even when no more items in the past', () => {
  const wrapper = shallow(<LoadingPastIndicator loadingPast={true} allPastItemsLoaded={true} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders TV when all past items loaded', () => {
  const wrapper = shallow(<LoadingPastIndicator allPastItemsLoaded={true} />);
  expect(wrapper).toMatchSnapshot();
});

it('should update only when props change', () => {
  const wrapper = shallow(<LoadingPastIndicator allPastItemsLoaded={false} loadingPast={false}/>);
  let shouldUpdate = wrapper.instance().shouldComponentUpdate({allPastItemsLoaded: false, loadingPast: false});
  expect(shouldUpdate).toBe(false);
  shouldUpdate = wrapper.instance().shouldComponentUpdate({allPastItemsLoaded: true, loadingPast: false});
  expect(shouldUpdate).toBe(true);
});

it('should run animation only when props transition to true', () => {
  const wrapper = shallow(<LoadingPastIndicator allPastItemsLoaded={false} loadingPast={false}/>);

  // we change a prop then call componentDidUpdate with the previous properties and
  // if either of these 2 props transitions from false -> true, componentDidUpdate should
  // run the animation by calling animateSlideDown. Any other change and it should not.
  wrapper.setProps({allPastItemsLoaded: false, loadingPast: true});
  wrapper.instance().componentDidUpdate({allPastItemsLoaded: false, loadingPast: false});
  expect(animateSlideDown).toHaveBeenCalledTimes(1);  // animateSlideDown was called. That's once.

  wrapper.setProps({allPastItemsLoaded: false, loadingPast: false});
  wrapper.instance().componentDidUpdate({allPastItemsLoaded: false, loadingPast: true});
  expect(animateSlideDown).toHaveBeenCalledTimes(1);  // animateSlideDown not called. Still only once.

  wrapper.setProps({allPastItemsLoaded: true, loadingPast: false});
  wrapper.instance().componentDidUpdate({allPastItemsLoaded: false, loadingPast: false});
  expect(animateSlideDown).toHaveBeenCalledTimes(2);  // allPastItemsLoaded trigger the animation. That's twice

  // no prop change. even though allPastItemsLoaded is true, animation should not run
  wrapper.instance().componentDidUpdate({allPastItemsLoaded: true, loadingPast: false});
  expect(animateSlideDown).toHaveBeenCalledTimes(2);
});
