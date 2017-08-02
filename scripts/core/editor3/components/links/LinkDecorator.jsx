import React from 'react';
import PropTypes from 'prop-types';

export const LinkDecorator = {
    strategy: LinkStrategy,
    component: LinkComponent
};

/**
 * @name LinkStrategy
 * @param {Object} contentBlock The content block being scanned
 * @param {Function} callback The callback to call upon finding a range to decorate
 * @param {Object} contentState The content state
 * @description The function that defines the strategy for identifying ranges to decorate.
 */
function LinkStrategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();

            return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
        },
        callback
    );
}

/**
 * @name LinkComponent
 * @param {Object} props
 * @description The link decorator.
 */
function LinkComponent(props) {
    const entity = props.contentState.getEntity(props.entityKey);
    const {url} = entity.getData();

    return <a href={url} title={url}>{props.children}</a>;
}

LinkComponent.propTypes = {
    contentState: PropTypes.object.isRequired,
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
};
