import React from 'react';

import { themes } from '../../lib/constants';
import ServerItemComponent, { IServerItem } from '.';
import { ThemeContext, TSupportedThemes } from '../../theme';

export default {
	title: 'ServerItem'
};

const defaultItem = {
	name: 'Clipping.Chat',
	id: 'https://cacd.clipping.chat/',
	iconURL: 'https://cacd.clipping.chat/assets/tile_310_square.png'
};

const ServerItem = ({
	item,
	theme = 'light',
	onPress = () => alert('Press'),
	onLongPress,
	hasCheck
}: {
	item?: Partial<IServerItem['item']>;
	theme?: TSupportedThemes;
	onPress?: IServerItem['onPress'];
	onLongPress?: IServerItem['onLongPress'];
	hasCheck?: IServerItem['hasCheck'];
}) => (
	<ThemeContext.Provider
		value={{
			theme,
			colors: themes[theme]
		}}
	>
		<ServerItemComponent item={{ ...defaultItem, ...item }} onPress={onPress} onLongPress={onLongPress} hasCheck={hasCheck} />
	</ThemeContext.Provider>
);

export const Content = () => (
	<>
		<ServerItem hasCheck />
		<ServerItem
			item={{
				name: 'Super Long Server Name in Rocket.Chat',
				id: 'https://superlongservername.tologintoasuperlongservername/'
			}}
		/>
		<ServerItem
			item={{
				id: 'https://stable.rocket.chat/'
			}}
		/>
	</>
);

export const Touchable = () => (
	<>
		<ServerItem onLongPress={() => alert('Long Press')} />
	</>
);

export const Themes = () => (
	<>
		<ServerItem theme={'light'} />
		<ServerItem theme={'dark'} />
		<ServerItem theme={'black'} />
	</>
);
