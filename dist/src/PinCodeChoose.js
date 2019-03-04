var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
import { StyleSheet, View } from "react-native";
import PinCode, { PinStatus } from "./PinCode";
import * as Keychain from "react-native-keychain";
class PinCodeChoose extends React.PureComponent {
    constructor(props) {
        super(props);
        this.endProcessCreation = (pinCode, isErrorValidation) => {
            this.setState({
                pinCode: isErrorValidation ? "" : pinCode,
                status: isErrorValidation ? PinStatus.choose : PinStatus.confirm
            });
        };
        this.endProcessConfirm = (pinCode) => __awaiter(this, void 0, void 0, function* () {
            if (pinCode === this.state.pinCode) {
                if (this.props.storePin) {
                    this.props.storePin(pinCode);
                }
                else {
                    yield Keychain.setInternetCredentials(this.props.pinCodeKeychainName, this.props.pinCodeKeychainName, pinCode);
                }
                if (!!this.props.finishProcess)
                    this.props.finishProcess(pinCode);
            }
            else {
                this.setState({ status: PinStatus.choose });
            }
        });
        this.cancelConfirm = () => {
            this.setState({ status: PinStatus.choose });
        };
        this.state = { status: PinStatus.choose, pinCode: "" };
    }
    render() {
        return (<View style={this.props.styleContainer
            ? this.props.styleContainer
            : styles.container}>
        {this.state.status === PinStatus.choose && (<PinCode endProcess={this.endProcessCreation} sentenceTitle={this.props.titleChoose} status={PinStatus.choose} subtitle={this.props.subtitleChoose} buttonNumberComponent={this.props.buttonNumberComponent || null} passwordLength={this.props.passwordLength || 4} passwordComponent={this.props.passwordComponent || null} validationRegex={this.props.validationRegex} emptyColumnComponent={this.props.emptyColumnComponent} titleValidationFailed={this.props.titleValidationFailed || "PIN code unsafe"} subtitleError={this.props.subtitleError || "Please try again"} colorPassword={this.props.colorPassword || undefined} colorPasswordError={this.props.colorPasswordError || undefined} numbersButtonOverlayColor={this.props.numbersButtonOverlayColor || undefined} buttonDeleteComponent={this.props.buttonDeleteComponent || null} titleComponent={this.props.titleComponent || null} subtitleComponent={this.props.subtitleComponent || null} styleButtonCircle={this.props.styleButtonCircle} iconButtonDeleteDisabled={this.props.iconButtonDeleteDisabled} getCurrentLength={this.props.getCurrentLength} styleTextButton={this.props.styleTextButton} styleCircleHiddenPassword={this.props.styleCircleHiddenPassword} styleCircleSizeEmpty={this.props.styleCircleSizeEmpty} styleCircleSizeFull={this.props.styleCircleSizeFull} styleRowButtons={this.props.styleRowButtons} buttonDeleteText={this.props.buttonDeleteText} styleColumnButtons={this.props.styleColumnButtons} styleEmptyColumn={this.props.styleEmptyColumn} styleViewTitle={this.props.styleViewTitle} styleTextTitle={this.props.styleTextTitle} styleTextSubtitle={this.props.styleTextSubtitle} styleContainer={this.props.styleContainerPinCode} styleColumnDeleteButton={this.props.styleColumnDeleteButton} styleDeleteButtonColorShowUnderlay={this.props.styleDeleteButtonColorShowUnderlay} styleDeleteButtonColorHideUnderlay={this.props.styleDeleteButtonColorHideUnderlay} styleColorTitle={this.props.styleColorTitle} styleColorTitleError={this.props.styleColorTitleError} styleColorSubtitle={this.props.styleColorSubtitle} styleColorSubtitleError={this.props.styleColorSubtitleError} styleDeleteButtonIcon={this.props.styleDeleteButtonIcon} styleDeleteButtonSize={this.props.styleDeleteButtonSize} styleDeleteButtonText={this.props.styleDeleteButtonText} styleColorButtonTitle={this.props.styleColorButtonTitle} styleColorButtonTitleSelected={this.props.styleColorButtonTitleSelected} pinCodeVisible={this.props.pinCodeVisible} textPasswordVisibleFamily={this.props.textPasswordVisibleFamily} textPasswordVisibleSize={this.props.textPasswordVisibleSize}/>)}
        {this.state.status === PinStatus.confirm && (<PinCode endProcess={this.endProcessConfirm} sentenceTitle={this.props.titleConfirm} status={PinStatus.confirm} cancelFunction={this.cancelConfirm} subtitle={this.props.subtitleConfirm} previousPin={this.state.pinCode} buttonNumberComponent={this.props.buttonNumberComponent || null} emptyColumnComponent={this.props.emptyColumnComponent} passwordLength={this.props.passwordLength || 4} passwordComponent={this.props.passwordComponent || null} titleAttemptFailed={this.props.titleAttemptFailed || "Incorrect PIN Code"} titleConfirmFailed={this.props.titleConfirmFailed || "Your entries did not match"} subtitleError={this.props.subtitleError || "Please try again"} colorPassword={this.props.colorPassword || undefined} colorPasswordError={this.props.colorPasswordError || undefined} numbersButtonOverlayColor={this.props.numbersButtonOverlayColor || undefined} buttonDeleteComponent={this.props.buttonDeleteComponent || null} buttonDeleteText={this.props.buttonDeleteText} titleComponent={this.props.titleComponent || null} subtitleComponent={this.props.subtitleComponent || null} styleButtonCircle={this.props.styleButtonCircle} styleTextButton={this.props.styleTextButton} getCurrentLength={this.props.getCurrentLength} styleCircleHiddenPassword={this.props.styleCircleHiddenPassword} styleCircleSizeEmpty={this.props.styleCircleSizeEmpty} styleCircleSizeFull={this.props.styleCircleSizeFull} iconButtonDeleteDisabled={this.props.iconButtonDeleteDisabled} styleRowButtons={this.props.styleRowButtons} styleColumnButtons={this.props.styleColumnButtons} styleEmptyColumn={this.props.styleEmptyColumn} styleViewTitle={this.props.styleViewTitle} styleTextTitle={this.props.styleTextTitle} styleTextSubtitle={this.props.styleTextSubtitle} styleColorTitle={this.props.styleColorTitle} styleColorTitleError={this.props.styleColorTitleError} styleColorSubtitle={this.props.styleColorSubtitle} styleColorSubtitleError={this.props.styleColorSubtitleError} styleContainer={this.props.styleContainerPinCode} styleColumnDeleteButton={this.props.styleColumnDeleteButton} styleDeleteButtonColorShowUnderlay={this.props.styleDeleteButtonColorShowUnderlay} styleDeleteButtonColorHideUnderlay={this.props.styleDeleteButtonColorHideUnderlay} styleDeleteButtonIcon={this.props.styleDeleteButtonIcon} styleDeleteButtonSize={this.props.styleDeleteButtonSize} styleDeleteButtonText={this.props.styleDeleteButtonText} styleColorButtonTitle={this.props.styleColorButtonTitle} styleColorButtonTitleSelected={this.props.styleColorButtonTitleSelected} pinCodeVisible={this.props.pinCodeVisible} textPasswordVisibleFamily={this.props.textPasswordVisibleFamily} textPasswordVisibleSize={this.props.textPasswordVisibleSize}/>)}
      </View>);
    }
}
export default PinCodeChoose;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
