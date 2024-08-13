import { Radio } from 'antd';

const LanguageTool = (e: { changeLanguageToZh: Function, changeLanguageToEn: Function, enUS: boolean }) => {
    const { changeLanguageToZh, changeLanguageToEn, enUS } = e

    return (
        <>
            <Radio.Group defaultValue={enUS ? 'b' : 'a'} size="large" style={{ marginTop: 10 }}>
                <Radio.Button onClick={() => { changeLanguageToZh() }} value='a'>简体中文</Radio.Button>
                <Radio.Button onClick={() => { changeLanguageToEn() }} value='b'>English</Radio.Button>
            </Radio.Group>
        </>
    )
}

export default LanguageTool