import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { fetchData } from './utils';

jest.mock('./utils')

describe('Test case', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue({results: [{
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },{
    "name": "mew",
    "url": "https://pokeapi.co/api/v2/pokemon/151/"
}]})
  })
  test('Should render the pokemon list data', async () => {
    
    await act(async () => {
      await render(<BrowserRouter><App /></BrowserRouter>);
    })
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
  });

  test('Should render the search bar and search button', async () => {
    await act(async () => {
      await render(<BrowserRouter><App /></BrowserRouter>);
    })
    expect(screen.getByPlaceholderText(/search for a pokemon/i)).toBeInTheDocument()
  })

  it('Should be able to search for a pokemon', async () => {
    await act(async () => {
      await render(<BrowserRouter><App /></BrowserRouter>);
    })
    const inputBox = screen.getByPlaceholderText(/search for a pokemon/i)
    fireEvent.change(inputBox, {target: {value: 'mew'}})
    const searchBtn = screen.getByRole('button', {name: /search/i})
    fireEvent.click(searchBtn)
    expect(screen.getByText('mew')).toBeInTheDocument()
  })
})


