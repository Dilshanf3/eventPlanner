// ProfileImageScreen.test.tsx

import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native'; // Import NavigationContainer
import ProfileImageScreen from '../../src/screens/Auth/EditProfileImage/EditProfileImageScreen';

describe('<ProfileImageScreen />', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <ProfileImageScreen />
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
