import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { DraggableProvided } from 'react-beautiful-dnd';
import DraggableProductCard from './DraggableProductCard';

export default {
    title: 'Draggable Product Card',
    component: DraggableProductCard,
} as ComponentMeta<typeof DraggableProductCard>;

const draggableProvided: DraggableProvided = ({
    innerRef: () => { },
    draggableProps: {
        'data-rbd-draggable-context-id': '1',
        'data-rbd-draggable-id': '1',
    },
    dragHandleProps: null,
});

const args = {
    ProductID: 1234,
    ProductName: 'Product 1',
    ProductPhotoURL: '/assets/images/hat.jpg',
    draggableProvided,
};
export const draggableProductCard = () => <DraggableProductCard {...args} />;
