import {startApp} from 'superdesk-core/scripts/index';

setTimeout(() => {
    startApp(
        [
            {
                id: 'publisher-extension',
                load: () => import('superdesk-publisher/client/publisher-extension'),
            },
        ],
        {}
    );
});

export default angular.module('main.superdesk', []);