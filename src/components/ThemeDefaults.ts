

const PeDefaults = {
    padding: 30, 
}

export const setMarginTop = (props: any, defaultValue: any) => {
    if (props.mt1) {
        return 5;
    } else if (props.mt2) {
        return 10;
    } else if (props.mt3) {
        return 15;
    } else if (props.mt4) {
        return 20;
    } else if (props.mt5) {
        return 25;
    } else if (props.mt6) {
        return 30;
    } else if (props.mt7) {
        return 35;
    } else if (props.mt8) {
        return 40;
    } else if (props.mt9) {
        return 45;
    } else if (props.mt10) {
        return 50;
    } else {
        return defaultValue;
    }
}

export const setMarginBottom = (props: any, defaultValue: any) => {
    if (props.mb1) {
        return 5;
    } else if (props.mb2) {
        return 10;
    } else if (props.mb3) {
        return 15;
    } else if (props.mb4) {
        return 20;
    } else if (props.mb5) {
        return 25;
    } else if (props.mb6) {
        return 30;
    } else if (props.mb7) {
        return 35;
    } else if (props.mb8) {
        return 40;
    } else if (props.mb9) {
        return 45;
    } else if (props.mb10) {
        return 50;
    } else {
        return defaultValue;
    }
}

export const setMarginLeft = (props: any, defaultValue: any) => {
    if (props.ml1) {
        return 5;
    } else if (props.ml2) {
        return 10;
    } else if (props.ml3) {
        return 15;
    } else if (props.ml4) {
        return 20;
    } else if (props.ml5) {
        return 25;
    } else if (props.ml6) {
        return 30;
    } else if (props.ml7) {
        return 35;
    } else if (props.ml8) {
        return 40;
    } else if (props.ml9) {
        return 45;
    } else if (props.ml10) {
        return 50;
    } else {
        return defaultValue;
    }
}

export const setMarginRight = (props: any, defaultValue: any) => {
    if (props.mr1) {
        return 5;
    } else if (props.mr2) {
        return 10;
    } else if (props.mr3) {
        return 15;
    } else if (props.mr4) {
        return 20;
    } else if (props.mr5) {
        return 25;
    } else if (props.mr6) {
        return 30;
    } else if (props.mr7) {
        return 35;
    } else if (props.mr8) {
        return 40;
    } else if (props.mr9) {
        return 45;
    } else if (props.mr10) {
        return 50;
    } else {
        return defaultValue;
    }
}

export const getHoraDeDateTime = (date: any) => {
    return ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2);
}

export const getDataDeDateTime = (date: any) => {
    return ('00' + date.getDate()).slice(-2) + '/' + ('00' + date.getMonth()).slice(-2) + '/' + date.getFullYear();
}


export default PeDefaults;
