import { useIntl } from '@umijs/max';

const News = () => {
    const intl = useIntl();
    const msg = intl.formatMessage({ id: 'welcome' });
    return (
        <div>
            {msg}
        </div>
    )
}
export default News