import { it, expect, describe, vi } from 'vitest';//in our tests we should not contact a real backend
import { Product } from './Product';
import userEvent from '@testing-library/user-event';
//userevent lets us simulate an event like a click
import { render, screen } from '@testing-library/react';//render is used to test componrnts and its designed specifically for them
//render creates a fake webPage for testing
//a test for components is called an integration test as it usually combines several functions and elements in it
import axios from 'axios';
vi.mock('axios');//this will mock entire axios package and our test now will use fake axios
describe('Product Component', () => {
    it('displays the product details correctly', () => {
        const product = {//we'll give a sample product for testing
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };
        const loadCart = vi.fn();//vi helps us to mock a function since we dont want to modify original data and in case of loadcart it actually contacts to backend
        render(<Product product={product} loadCart={loadCart} />);
        expect(
            screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
            //screen lets us check the screen created on the fake web
        ).toBeInTheDocument();
        expect(
            screen.getByText("10.90")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("product-image")//first we gave data-testid to the original element which contains the image we're testing
            //then we can do Tsetid here
        ).toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(
            screen.getByTestId("product-rating-stars-image")//first we gave data-testid to the original element which contains the image we're testing
            //then we can do Tsetid here
        ).toHaveAttribute('src', "images/ratings/rating-45.png");
        //pay attention to the naming of rating images it is copied from original code from Product
        //after multiplying rating by 10 we're gonna get 45
        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
        //now we;ve almost all theproduct details are displayed correctly
    });
    it('adds a product into the cart', async() => {
        const product = {//we'll give a sample product for testing
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };
        const loadCart = vi.fn();//vi helps us to mock a function since we dont want to modify original data and in case of loadcart it actually contacts to backend
        render(<Product product={product} loadCart={loadCart} />);
        const user = userEvent.setup();//first we need to setup userEvent
        //the user simulations may take some time to finish so better await with them
        //then we need to give dataset to the element we want simulation on
        //like in case of add to cart button we have given data-testid="add-to-cart-button"
        const addTocartButton = screen.getByTestId("add-to-cart-button");
        await user.click(addTocartButton);
        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity : 1
            }
        );
        expect(loadCart).toHaveBeenCalled();
    });
});