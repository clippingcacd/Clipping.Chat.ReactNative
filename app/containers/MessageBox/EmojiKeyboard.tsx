import React from 'react';
import { View } from 'react-native';
import { KeyboardRegistry } from 'react-native-ui-lib/keyboard';
import { Provider } from 'react-redux';

import store from '../../lib/store';
import EmojiPicker from '../EmojiPicker';
import styles from './styles';
import {useTheme} from '../../theme'
import { EventTypes } from '../EmojiPicker/interfaces';

const EmojiKeyboard = () => {
	const onItemClicked = (eventType: EventTypes, emoji: string | undefined) => {
		KeyboardRegistry.onItemSelected('EmojiKeyboard', { eventType, emoji });
	};

	const {colors} = useTheme()

	return (
		<Provider store={store}>
			<View
				style={[styles.emojiKeyboardContainer, { borderTopColor: colors.borderColor }]}
				testID='messagebox-keyboard-emoji'
			>
				<EmojiPicker onItemClicked={onItemClicked} />
			</View>
		</Provider>
	);
};

KeyboardRegistry.registerKeyboard('EmojiKeyboard', () => EmojiKeyboard);
