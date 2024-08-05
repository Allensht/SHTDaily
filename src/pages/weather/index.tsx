import { useIntl } from '@umijs/max';

const Weather = () => {
    const intl = useIntl();
    const msg = intl.formatMessage({ id: 'weather' });
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{msg}</h1>
        </div>
    )
}
export default Weather