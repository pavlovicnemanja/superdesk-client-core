module.exports = function(grunt) {
    return {
        importApps: [
            '../index',
            'superdesk-publisher'
        ],
        apps: [
            'superdesk-publisher'
        ],
        defaultRoute: '/workspace',
        publisher: {
            protocol: 'https',                /* http or https */
            tenant: '',              /* tenant - semantically subdomain, '' is allowed */
            domain: 'sp-publisher.superdesk.pro',           /* domain name for the publisher */
            base: 'api/v2',                  /* api base path */

            wsProtocol: 'wss',                /* ws or wss (websocket); if unspecified or '' defaults to 'wss' */
            wsDomain: 'sp-publisher.superdesk.pro',  /* domain name (usually domain as above) */
                                            /* e.g.: example.com, abc.example.com */
                                            /* tenant, as above, is NOT used for websocket */
            wsPath: '/ws',                    /* path to websocket root dir */
            wsPort: '80',                   /* if not specified: defaults to 443 for wss, 80 for ws */
            hideContentRoutesInPublishPane: false, /* hides routes of type "content" from select box in publish panes in monitoring view as well as in output control. If not specified: defaults to false */
            hideCustomRoutesInPublishPane: false   /* hides routes of type "custom" from select box in publish panes in monitoring view as well as in output control. If not specified: defaults to false */
        },
        features: {
            swimlane: {defaultNumberOfColumns: 4},
            editor3: true,
            qumu: true,
            savedSearch: {
                subscriptions: true,
            },
            validatePointOfInterestForImages: true,
            hideRoutedDesks: false,
            showCharacterLimit: 40,
        },
        auth: {google: false},
        ingest: {
            PROVIDER_DASHBOARD_DEFAULTS: {
                show_log_messages: true,
                show_ingest_count: true,
                show_time: true,
                log_messages: 'error',
                show_status: true,
            },
            DEFAULT_SCHEDULE: {minutes: 5, seconds: 0},
            DEFAULT_IDLE_TIME: {hours: 0, minutes: 0},
        },
    };
};
