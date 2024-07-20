import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from "./ProductsPage";
import { PRODUCTS_URL } from "../ApiHelper";

export default {
    title: 'Products Page',
    component: ProductsPage,
    decorators: [(Story) => (<MemoryRouter><Story /></MemoryRouter>)]
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;
const FilterUrl = `${PRODUCTS_URL}?status=Active`

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
    mockData: [
        {
            url: FilterUrl,
            method: 'GET',
            status: 200,
            response: {
                "data": [
                    {
                        "ProductID": 1,
                        "ProductName": 'Product 1',
                        "ProductPhotoURL": '/assets/images/hat.jpg',
                    },
                    {
                        "ProductID": 2,
                        "ProductName": 'Product 2',
                        "ProductPhotoURL": '/assets/images/shoe.jpg',
                    },
                    {
                        "ProductID": 3,
                        "ProductName": 'Product 3',
                        "ProductPhotoURL": '/assets/images/pants.jpg',
                    },
                    {
                        "ProductID": 4,
                        "ProductName": 'Product 4',
                        "ProductPhotoURL": '/assets/images/shirt.jpg',
                    },
                    {
                        "ProductID": 5,
                        "ProductName": 'Product 5',
                        "ProductPhotoURL": '/assets/images/coat.jpg',
                    }
                ],
                "message": ""
            }
        }
    ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
    mockData: [
        {
            url: FilterUrl,
            method: 'GET',
            status: 200,
            response: { "data": [], "message": "" }
        },

    ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
    mockData: [
        {
            url: FilterUrl,
            method: 'GET',
            status: 500,
            response: { "data": null, "message": "Unexpected error" }
        }
    ],
};
