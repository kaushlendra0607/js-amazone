import { it, expect, describe, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';//this router is specially made for testing router elements like Link in our test
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios');
//mocking the implementation means we're gonna make a funcn or a method do whatever we want
describe('HomePage Component', () => {

    let loadCart;
    beforeEach(() => {
        loadCart = vi.fn();
        //mockImplementation means we make a mock do whatever we want
        axios.get.mockImplementation((urlPath) => {//using async this funcn will return a promise which a backend call usually does
            //here we're mocking the implementtation of get request
            if (urlPath === '/api/products') {
                return {//we should normally return what our backend returns when we send a get req
                    //usually it returns an object response with property data
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                            stars: 4,
                            count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    }]
                };
            }
        });
    });

    it('displays the products correct', async() => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
                {/* our homepage has header and header has navlink which works only inside a router */}
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId("product-container");//we use all here bcz we're gonna have multiple product on home page and here we'l have two
        //we're using find instead of get, it waits untill it finds the given data in case of asynch codes 
        expect(productContainers.length).toBe(2);
       expect( within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    //using getbytext with screen will search on whole screen or wntire page
    //using getbytext with within will search only within that element provided
       ).toBeInTheDocument();
       expect( within(productContainers[1]).getByText("Intermediate Size Basketball")
       ).toBeInTheDocument();
    });
});
