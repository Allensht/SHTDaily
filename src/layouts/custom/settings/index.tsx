import ThemeTool from '@/layouts/custom/themeTool'
import { SettingOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { message, Modal, Radio } from 'antd';
import { useEffect, useState } from 'react';
import '@/layouts/custom/settings/index.less'

const Settings = (e: { darktheme: boolean, enUS: boolean, setEnUS: React.Dispatch<React.SetStateAction<boolean>>, setDarkTheme: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const intl = useIntl();
    const settings = intl.formatMessage({ id: 'settings' })
    const language = intl.formatMessage({ id: 'language' })
    const changeTheme = intl.formatMessage({ id: 'theme' })
    const setting = intl.formatHTMLMessage({ id: 'setting' })
    const succs = intl.formatHTMLMessage({ id: 'settingSuccs' })
    const { darktheme, enUS, setEnUS, setDarkTheme } = e
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const set = (value: String) => {
        messageApi.loading(setting, 0)
        setTimeout(() => {
            if (value === 'zh') {
                messageApi.destroy()
                messageApi.success(succs, 2)
                setEnUS(false)
            } else if (value === 'us') {
                messageApi.destroy()
                messageApi.success(succs, 2)
                setEnUS(true)
            } else if (value === 'dark') {
                messageApi.destroy()
                messageApi.success(succs, 2)
                setDarkTheme(true)
            } else if (value === 'light') {
                messageApi.destroy()
                messageApi.success(succs, 2)
                setDarkTheme(false)
            }
            setIsModalOpen(false)
        }, 1000)
    };
    const [radioValue, setRadioValue] = useState('a');
    useEffect(() => {
        if (enUS) {
            setRadioValue('b')
        } else {
            setRadioValue('a')
        }
    }, [enUS])

    return (
        <>
            {contextHolder}
            <button onClick={showModal} className='settingsButton' style={{
                backgroundColor: darktheme ? '#fff' : '#000',
                color: darktheme ? '#000' : '#fff',
            }}>
                <SettingOutlined />
            </button>
            <Modal title={settings} open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className='languageSettings'>
                    <span>{language}</span>
                    <br />
                    <Radio.Group defaultValue={radioValue} size="large" style={{ marginTop: 10 }}>
                        <Radio.Button onClick={() => { set('zh') }} value='a'>简体中文</Radio.Button>
                        <Radio.Button onClick={() => { set('us') }} value='b'>English</Radio.Button>
                    </Radio.Group>
                </div>
                <div className='themeSettings'>
                    <span>{changeTheme}</span>
                    <br />
                    <ThemeTool set={set} darkTheme={darktheme} />
                </div>
            </Modal>
        </>
    )
}

export default Settings