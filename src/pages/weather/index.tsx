import { useIntl } from '@umijs/max';

const Weather = () => {
    const intl = useIntl();
    const msg = intl.formatMessage({ id: 'welcome' });
    return (
        <div>
            {msg}
        </div>
    )
}
export default Weather