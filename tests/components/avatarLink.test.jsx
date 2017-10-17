import React from 'react';
import {shallow} from 'enzyme';

import {Image} from 'semantic-ui-react';
import {Link} from '../../routes';

import AvatarLink from '../../components/avatarLink';


describe('avatar link', () => {

  let props;
  let sut;

  beforeEach(() => {
    props = {};
    sut = shallow(<AvatarLink {...props}/>);
  });

  it('should render nothing if user was not provided', () => {
    expect(sut.node).toBeNull()
  });

  describe('if user was provided', () => {
    let user;

    beforeEach(() => {
      user = {
        username: String(Math.random()),
        displayName: String(Math.random()),
        _json: {
          avatar_url: String(Math.random())
        }
      };
      sut.setProps({user});
    });

    it('should have a link', () => {
      expect(sut.find(Link).props()).toMatchObject({
        route: 'profile',
        params: {username: user.username}
      });
    });

    it('should have an image', () => {
      expect(sut.find(Image).props()).toMatchObject({
        height: 36,
        src: `${user._json.avatar_url}&size=72`,
        inline: true
      })
    });

    it('should display name', () => {
      expect(sut.find('a span').text()).toEqual(user.displayName)
    });
  })

});