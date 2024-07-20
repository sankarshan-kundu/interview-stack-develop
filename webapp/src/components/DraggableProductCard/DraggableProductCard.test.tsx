import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { create, ReactTestRenderer } from 'react-test-renderer';
import DraggableProductCard from './DraggableProductCard';

describe('DraggableItem', () => {
    let tree: ReactTestRenderer;
    const ID = 1234;
    beforeEach(() => {
        const draggableProvided: DraggableProvided = ({
            innerRef: () => { },
            draggableProps: {
                'data-rbd-draggable-context-id': '1',
                'data-rbd-draggable-id': '1',
            },
            dragHandleProps: null,
        });
        const props = {
            ProductID: ID,
            ProductName: 'P1',
            ProductPhotoURL: 'p1.jpg',
            draggableProvided,
            removeOrder: () => { },
        };
        tree = create(<DraggableProductCard {...props} />);
    });
    afterEach(() => {
        tree.unmount();
    });
    it('rendersDraggableItem', async () => {
        const testInstance = tree.root;
        await testInstance.findByProps({ 'data-testid': `draggable-productID-${ID}` });
    });
});
