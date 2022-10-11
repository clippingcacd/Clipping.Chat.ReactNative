import React, { useMemo } from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from './TabBar';
import EmojiCategory from './EmojiCategory';
import Footer from './Footer';
import styles from './styles';
import { categories, emojisByCategory } from './data';
import shortnameToUnicode from '../../lib/methods/helpers/shortnameToUnicode';
import log from '../../lib/methods/helpers/log';
import { useTheme } from '../../theme';
import { IEmoji, ICustomEmojis } from '../../definitions';
import { useAppSelector } from '../../lib/hooks';
import { IEmojiPickerProps, EventTypes } from './interfaces';
import { useFrequentlyUsedEmoji, addFrequentlyUsed } from './frequentlyUsedEmojis';
import { getEmojiText } from './helpers';

const EmojiPicker = ({
	onItemClicked,
	isEmojiKeyboard = false,
	searching = false,
	searchedEmojis = []
}: IEmojiPickerProps): React.ReactElement | null => {
	const { colors } = useTheme();
	const { frequentlyUsed, loaded } = useFrequentlyUsedEmoji();

	const allCustomEmojis: ICustomEmojis = useAppSelector(
		state => state.customEmojis,
		() => true
	);
	const customEmojis = useMemo(
		() =>
			Object.keys(allCustomEmojis)
				.filter(item => item === allCustomEmojis[item].name)
				.map(item => ({
					content: allCustomEmojis[item].name,
					name: allCustomEmojis[item].name,
					extension: allCustomEmojis[item].extension,
					isCustom: true
				})),
		[allCustomEmojis]
	);

	const handleEmojiSelect = (emoji: IEmoji) => {
		console.log('🚀 ~ file: index.tsx ~ line 45 ~ handleEmojiSelect ~ emoji', emoji);
		try {
			onItemClicked(EventTypes.EMOJI_PRESSED, getEmojiText(emoji));
			addFrequentlyUsed(emoji);
		} catch (e) {
			log(e);
		}
	};

	const renderCategory = (category: keyof typeof emojisByCategory, i: number, label: string) => {
		let emojis = [];
		if (i === 0) {
			emojis = frequentlyUsed;
		} else if (i === 1) {
			emojis = customEmojis;
		} else {
			emojis = emojisByCategory[category];
		}
		return <EmojiCategory emojis={emojis} onEmojiSelected={(emoji: IEmoji) => handleEmojiSelect(emoji)} tabLabel={label} />;
	};

	if (!loaded) {
		return null;
	}

	return (
		<View style={styles.emojiPickerContainer}>
			{searching ? (
				<EmojiCategory emojis={searchedEmojis} onEmojiSelected={(emoji: IEmoji) => handleEmojiSelect(emoji)} />
			) : (
				<ScrollableTabView
					renderTabBar={() => <TabBar />}
					contentProps={{
						keyboardShouldPersistTaps: 'always',
						keyboardDismissMode: 'none'
					}}
					style={{ backgroundColor: colors.focusedBackground }}
				>
					{categories.tabs.map((tab: any, i) =>
						i === 0 && frequentlyUsed.length === 0
							? null // when no frequentlyUsed don't show the tab
							: renderCategory(tab.category, i, tab.tabLabel)
					)}
				</ScrollableTabView>
			)}
			{isEmojiKeyboard && (
				<Footer
					onSearchPressed={() => onItemClicked(EventTypes.SEARCH_PRESSED)}
					onBackspacePressed={() => onItemClicked(EventTypes.BACKSPACE_PRESSED)}
				/>
			)}
		</View>
	);
};

export default EmojiPicker;
