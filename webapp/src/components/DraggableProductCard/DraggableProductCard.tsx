import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { DraggableProductCardProps } from '../interfaces';

const DraggableProductCard = (props: DraggableProductCardProps) => (
    <div
        ref={props.draggableProvided.innerRef}
        {...props.draggableProvided.draggableProps}
        {...props.draggableProvided.dragHandleProps}
        className='bg-neutral-300 p-3 rounded '
        data-testid={`draggable-container-${props.ProductID}`}
    >
        <p data-testid={`draggable-productID-${props.ProductID}`}>{props.ProductName} <em>(ID: {props.ProductID})</em></p>
        <img className='w-40' src={props.ProductPhotoURL} alt={props.ProductName} />
    </div>
);

export default DraggableProductCard;
