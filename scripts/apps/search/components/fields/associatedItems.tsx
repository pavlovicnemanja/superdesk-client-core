import React from 'react';
import {isEmpty} from 'lodash';
import {AssociatedItemsList} from './AssociatedItemsList';
import {IPropsItemListInfo} from '../ListItemInfo';

export const associatedItems: React.StatelessComponent<IPropsItemListInfo> = ({item, svc}) => (
    isEmpty(item.associations) ? null : <AssociatedItemsList key="associatedItems" item={item} svc={svc} />
);
