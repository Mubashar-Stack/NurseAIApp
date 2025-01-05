import { StyleSheet } from 'react-native'
import { Fonts } from '@app/blueprints';

const mainStyle = (color: any) => StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: color.primaryColor,
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalTopView: {
        flexDirection: 'row',
        width: '94%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    textField: {
        fontFamily: Fonts.Roboto_Medium,
        color: color.textColor,
        fontSize: 16,
    },
    subText: {
        color: color.textColor,
        fontSize: 14,
    },
    textView: {
        width: '99%',
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 16,
        backgroundColor: color.Tertiary,
        paddingHorizontal: 10,
        height: 52,
        alignItems: 'center', justifyContent: 'space-between'
    },
    inputText: {
        fontSize: 14,
        fontWeight: '400',
        color: color.textColor,
        width: '90%',
        fontFamily: Fonts.Roboto_Light
    },
    errorText: {
        color: color.errorText,
        fontSize: 12,
        marginTop: 4,
        fontFamily: Fonts.Roboto_Light
    },
    mainView: {
        flex: 1,
        backgroundColor: color.backgroundColor,
        margin: 0,
        height: '100%',
    },
    headerView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14,
    },
    subView: {
        flex: 1,
        padding: 20,
    },
    text: {
        color: color.textColor,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
        fontFamily: Fonts.Roboto_Medium
    },
    inputFieldView: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: color.secondaryColor,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    headerText: {
        textAlign: 'center',
        // width: '100%',
        color: color.secondaryColor,
        fontSize: 22,
        // paddingVertical: 20

    },
    progressBar: {
        width: '50%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerBtn: {
        height: 52,
        width: '100%',
        backgroundColor: color.primaryColor,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
        marginVertical: 40,
        borderRadius: 8,
        justifyContent: 'center',

    },
    signBtn: {
        height: 52,
        width: '70%',
        borderRadius: 10,
        backgroundColor: color.primaryColor,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
        justifyContent: 'center',

    },
    footerBtnTxt: {
        color: color.secondaryColor,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: Fonts.Roboto_Bold
    },
    mainConatainer: {
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 10,
    },
    listView: {
        flexDirection: 'row',
        borderBottomColor: color.textColor,
        borderBottomWidth: 0.2,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1,
    },
    loadingIndicator: {
        position: 'absolute',
        left: 120,
        top: 300,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.Quinary,
        height: '15%',
        width: '30%',
        borderRadius: 30,
        alignSelf: 'center'
    },
    modalContainer: {
        backgroundColor: 'rgba(238, 238, 237, 0.70)',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    ModalContainer: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 1,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.25,
        backgroundColor: 'white'
    },
    SignUptext: {
        fontSize: 12,
        fontFamily: Fonts.Roboto_Bold
        // color: COLORS.primaryColor,
    },
    imagePlaceholder: {
        width: '100%',
        height: '50%',
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    dividerLine: {
        flex: 1,
        margin: 6,
        height: 2,
        backgroundColor: color.textColor,
    },
});
export default mainStyle