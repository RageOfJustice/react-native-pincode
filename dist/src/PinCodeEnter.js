var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import PinCode, { PinStatus } from "./PinCode";
import TouchID from "react-native-touch-id";
import * as Keychain from "react-native-keychain";
import { PinResultStatus } from "../index";
import delay from "./delay";
class PinCodeEnter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.keyChainResult = undefined;
        this.endProcess = (pinCode) => __awaiter(this, void 0, void 0, function* () {
            if (!!this.props.endProcessFunction) {
                this.props.endProcessFunction(pinCode);
            }
            else {
                if (this.props.handleResult) {
                    this.props.handleResult(pinCode);
                }
                this.setState({ pinCodeStatus: PinResultStatus.initial });
                this.props.changeInternalStatus(PinResultStatus.initial);
                const pinAttemptsStr = yield AsyncStorage.getItem(this.props.pinAttemptsAsyncStorageName);
                let pinAttempts = +pinAttemptsStr;
                const pin = this.props.storedPin || this.keyChainResult;
                if (pin === pinCode) {
                    this.setState({ pinCodeStatus: PinResultStatus.success });
                    AsyncStorage.multiRemove([
                        this.props.pinAttemptsAsyncStorageName,
                        this.props.timePinLockedAsyncStorageName
                    ]);
                    this.props.changeInternalStatus(PinResultStatus.success);
                    if (!!this.props.finishProcess)
                        this.props.finishProcess(pinCode);
                }
                else {
                    pinAttempts++;
                    if (+pinAttempts >= this.props.maxAttempts &&
                        !this.props.disableLockScreen) {
                        yield AsyncStorage.setItem(this.props.timePinLockedAsyncStorageName, new Date().toISOString());
                        this.setState({ locked: true, pinCodeStatus: PinResultStatus.locked });
                        this.props.changeInternalStatus(PinResultStatus.locked);
                    }
                    else {
                        yield AsyncStorage.setItem(this.props.pinAttemptsAsyncStorageName, pinAttempts.toString());
                        this.setState({ pinCodeStatus: PinResultStatus.failure });
                        this.props.changeInternalStatus(PinResultStatus.failure);
                    }
                    if (this.props.onFail) {
                        yield delay(1500);
                        this.props.onFail(pinAttempts);
                    }
                }
            }
        });
        this.state = { pinCodeStatus: PinResultStatus.initial, locked: false };
        this.endProcess = this.endProcess.bind(this);
        this.launchTouchID = this.launchTouchID.bind(this);
    }
    componentWillMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.props.storedPin) {
                const result = yield Keychain.getInternetCredentials(this.props.pinCodeKeychainName);
                this.keyChainResult = result.password || undefined;
            }
        });
    }
    componentDidMount() {
        if (!this.props.touchIDDisabled)
            this.triggerTouchID();
    }
    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevProps.pinStatusExternal !== this.props.pinStatusExternal) {
            this.setState({ pinCodeStatus: this.props.pinStatusExternal });
        }
        if (prevProps.touchIDDisabled && !this.props.touchIDDisabled) {
            this.triggerTouchID();
        }
    }
    triggerTouchID() {
        TouchID.isSupported()
            .then(() => {
            setTimeout(() => {
                this.launchTouchID();
            });
        })
            .catch((error) => {
            console.warn("TouchID error", error);
        });
    }
    launchTouchID() {
        return __awaiter(this, void 0, void 0, function* () {
            const optionalConfigObject = {
                imageColor: '#e00606',
                imageErrorColor: '#ff0000',
                sensorDescription: 'Touch sensor',
                sensorErrorDescription: 'Failed',
                cancelText: 'Cancel',
                fallbackLabel: 'Show Passcode',
                unifiedErrors: false,
                passcodeFallback: false
            };
            try {
                yield TouchID.authenticate(this.props.touchIDSentence, Object.assign({}, optionalConfigObject, { title: this.props.touchIDTitle })).then((success) => {
                    this.endProcess(this.props.storedPin || this.keyChainResult);
                });
            }
            catch (e) {
                console.warn("TouchID error", e);
            }
        });
    }
    render() {
        const pin = this.props.storedPin ||
            (this.keyChainResult && this.keyChainResult);
        return (<View style={this.props.styleContainer
            ? this.props.styleContainer
            : styles.container}>
        <PinCode endProcess={this.endProcess} sentenceTitle={this.props.title} subtitle={this.props.subtitle} status={PinStatus.enter} previousPin={pin} emptyColumnComponent={this.props.emptyColumnComponent} pinCodeStatus={this.state.pinCodeStatus} buttonNumberComponent={this.props.buttonNumberComponent || null} passwordLength={this.props.passwordLength || 4} iconButtonDeleteDisabled={this.props.iconButtonDeleteDisabled} passwordComponent={this.props.passwordComponent || null} titleAttemptFailed={this.props.titleAttemptFailed || "Incorrect PIN Code"} titleConfirmFailed={this.props.titleConfirmFailed || "Your entries did not match"} subtitleError={this.props.subtitleError || "Please try again"} colorPassword={this.props.colorPassword || undefined} colorPasswordError={this.props.colorPasswordError || undefined} numbersButtonOverlayColor={this.props.numbersButtonOverlayColor || undefined} buttonDeleteComponent={this.props.buttonDeleteComponent || null} titleComponent={this.props.titleComponent || null} subtitleComponent={this.props.subtitleComponent || null} getCurrentLength={this.props.getCurrentLength} styleButtonCircle={this.props.styleButtonCircle} buttonDeleteText={this.props.buttonDeleteText} styleTextButton={this.props.styleTextButton} styleCircleHiddenPassword={this.props.styleCircleHiddenPassword} styleCircleSizeEmpty={this.props.styleCircleSizeEmpty} styleCircleSizeFull={this.props.styleCircleSizeFull} styleRowButtons={this.props.styleRowButtons} styleColumnButtons={this.props.styleColumnButtons} styleEmptyColumn={this.props.styleEmptyColumn} styleViewTitle={this.props.styleViewTitle} styleTextTitle={this.props.styleTextTitle} styleTextSubtitle={this.props.styleTextSubtitle} styleContainer={this.props.styleContainerPinCode} styleColumnDeleteButton={this.props.styleColumnDeleteButton} styleDeleteButtonColorShowUnderlay={this.props.styleDeleteButtonColorShowUnderlay} styleDeleteButtonColorHideUnderlay={this.props.styleDeleteButtonColorHideUnderlay} styleDeleteButtonIcon={this.props.styleDeleteButtonIcon} styleDeleteButtonSize={this.props.styleDeleteButtonSize} styleColorTitle={this.props.styleColorTitle} styleColorTitleError={this.props.styleColorTitleError} styleColorSubtitle={this.props.styleColorSubtitle} styleColorSubtitleError={this.props.styleColorSubtitleError} styleDeleteButtonText={this.props.styleDeleteButtonText} styleColorButtonTitle={this.props.styleColorButtonTitle} styleColorButtonTitleSelected={this.props.styleColorButtonTitleSelected} pinCodeVisible={this.props.pinCodeVisible} textPasswordVisibleFamily={this.props.textPasswordVisibleFamily} textPasswordVisibleSize={this.props.textPasswordVisibleSize}/>
      </View>);
    }
}
export default PinCodeEnter;
let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
