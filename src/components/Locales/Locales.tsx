import {useState} from 'react';
import {useAppStore} from "../../shared/store";
import {HiddenRadio, LabelText, RadioGroup, RadioOption, StyledRadio} from "./styles.ts";

export const Locales = () => {
    const {locales, currentLocale, setLocale} = useAppStore()
    const [selectedCode, setSelectedCode] = useState(currentLocale);

    const handleChange = (code: string) => {
        setSelectedCode(code);
        setLocale(code)
    };

    return <>
        <RadioGroup>
            {locales.map((locale) => (
                <RadioOption key={locale}>
                    <HiddenRadio
                        type="radio"
                        id={`localization-${locale}`}
                        name="localization"
                        value={locale}
                        checked={selectedCode === locale}
                        onChange={() => handleChange(locale)}
                    />
                    <StyledRadio checked={selectedCode === locale}>
                        <LabelText>{locale}</LabelText>
                    </StyledRadio>
                </RadioOption>
            ))}
        </RadioGroup>
    </>
}


