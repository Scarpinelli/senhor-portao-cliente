import { layout } from '../env'

const theme = layout;

const Colors = {
    normal: {

        primary: '#1EB5EC',
        secondary: '#1F3C8C',
        yellow: '#FBB92B',
        purple: '#5D5FEF',
        bg1: '#FBFBFB',
        black: '#191D19',
        success: '#51D6B5',
        error: '#EC007F',
        warning: '#FBB92B',
        white: '#ffffff',
        muted: '#878787',   
    },
    professional: {

        primary: '#1EB5EC',
        secondary: '#066285',
        yellow: '#FBB92B',
        purple: '#5D5FEF',
        bg1: '#FBFBFB',
        black: '#191D19',
        success: '#51D6B5',
        error: '#EC007F',
        warning: '#FBB92B',
        white: '#ffffff',
        muted: '#878787',   

    }
    
}

const ThemeColors = layout == 'user' ? Colors.normal : Colors.professional;

export default ThemeColors;
