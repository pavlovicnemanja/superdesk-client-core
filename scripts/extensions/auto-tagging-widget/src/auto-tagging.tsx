import * as React from 'react';
import {IArticle, ISuperdesk} from 'superdesk-api';

interface ITag {
    uuid: string;
    title: string;
    weight: number;
    media_topic: Array<any>;
}

interface IAutoTaggingResponse {
    analysis: {
        organisation?: Array<ITag>;
        place?: Array<ITag>;
        subject?: Array<ITag>;
    };
}

interface IProps {
    article: IArticle;
}

interface IState {
    response: IAutoTaggingResponse | null;
}

export function getAutoTaggingComponent(superdesk: ISuperdesk, label: string) {
    const {httpRequestJsonLocal} = superdesk;
    const {gettext} = superdesk.localization;

    return class AutoTagging extends React.PureComponent<IProps, IState> {
        constructor(props: IProps) {
            super(props);

            this.state = {
                response: null,
            };
        }
        componentDidMount() {
            httpRequestJsonLocal<IAutoTaggingResponse>({
                method: 'POST',
                path: '/ai/',
                payload: {
                    service: 'imatrics',
                    item_id: this.props.article._id,
                },
            }).then((response) => {
                this.setState({
                    response,
                });
            });
        }
        render() {
            const {response} = this.state;

            return (
                <div>
                    <div>
                        <span>{label}</span>
                        <button
                            onClick={() => {
                                console.log('test');
                            }}
                        >
                            +
                        </button>
                    </div>

                    {
                        response == null
                            ? (<div>{gettext('loading...')}</div>)
                            : (
                                <div>
                                    {
                                        response.analysis.subject == null ? null : (
                                            <div>
                                                <h4>{gettext('Organisation')}</h4>

                                                <ul>
                                                    {
                                                        (response.analysis.subject).map((item: ITag) => {
                                                            return (<li key={item.uuid}>{item.title}</li>);
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                    {
                                        response.analysis.place == null ? null : (
                                            <div>
                                                <h4>{gettext('Place')}</h4>

                                                <ul>
                                                    {
                                                        (response.analysis.place).map((item: ITag) => {
                                                            return (<li key={item.uuid}>{item.title}</li>);
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                                    {
                                        response.analysis.subject == null ? null : (
                                            <div>
                                                <h4>{gettext('Subject')}</h4>

                                                <ul>
                                                    {
                                                        (response.analysis.subject).map((item: ITag) => {
                                                            return (<li key={item.uuid}>{item.title}</li>);
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                    }
                </div>
            );
        }
    };
}
