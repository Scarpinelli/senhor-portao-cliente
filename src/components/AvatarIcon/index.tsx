import React from 'react';
import { Container, Logo } from './styles';

import LogoIcon1 from '../../assets/images/logo-icon-variation-1.png';
import LogoIcon2 from '../../assets/images/logo-icon-variation-2.png';

interface IAvatar {
	type: any;
}

const AvatarIcon: React.FC<IAvatar> = ({ type }: any) => {
	return (
		<Container>
			<Logo source={type == 1 ? LogoIcon1 : LogoIcon2} resizeMode={'contain'} />
		</Container>
	);
};

export default AvatarIcon;
