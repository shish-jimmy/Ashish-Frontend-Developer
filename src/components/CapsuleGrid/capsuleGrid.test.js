import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import CapsuleGrid from './index';
import { fetchCapsules } from '../../store/capsules/actions'; 

import capsulesReducer from '../../store/capsules/combineReducer'; 
jest.mock('../../store/capsules/actions'); 

const mockStore = (state) => ({
  getState: () => state,
  dispatch: jest.fn(),
  subscribe: jest.fn(),
});

describe('CapsuleGrid', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      capsules: {
        capsules: [
          {
            capsule_serial: 'C101',
            status: 'active',
            type: 'Dragon 1.0',
            original_launch: '2010-12-08',
          },
          {
            capsule_serial: 'C102',
            status: 'retired',
            type: 'Dragon 1.0',
            original_launch: '2012-05-22',
          },
          {
            capsule_serial: 'C103',
            status: 'unknown',
            type: 'Dragon 2.0',
            original_launch: null,
          },
        ],
        searchParams: {},
        currentPage: 1,
        itemsPerPage: 2,
      },
    });
  });

  it('should render without errors', async () => {
    fetchCapsules.mockResolvedValueOnce(); 
    render(
      <Provider store={store}>
        <CapsuleGrid />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Welcome to the Capsule Collection')).toBeInTheDocument();
    });
  });

  it('should display all capsules by default', async () => {
    fetchCapsules.mockResolvedValueOnce(store.getState().capsules); 
    render(
      <Provider store={store}>
        <CapsuleGrid />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(1); 
    });
  });

  

  it('should display only capsules that match the search parameters', async () => {
    fetchCapsules.mockResolvedValueOnce(); 
    store = mockStore({
      capsules: {
        capsules: [
          {
            capsule_serial: 'C101',
            status: 'active',
            type: 'Dragon 1.0',
            original_launch: '2010-12-08',
          },
          {
            capsule_serial: 'C102',
            status: 'retired',
            type: 'Dragon 1.0',
            original_launch: '2012-05-22',
            },
            {
            capsule_serial: 'C103',
            status: 'unknown',
            type: 'Dragon 2.0',
            original_launch: null,
            },
            ],
            searchParams: {
            status: 'retired',
            },
            currentPage: 1,
            itemsPerPage: 2,
            },
            });
            render(
            <Provider store={store}>
            <CapsuleGrid />
            </Provider>
            );
            await waitFor(() => {
            expect(screen.getAllByRole('article')).toHaveLength(1);
            expect(screen.getByText('C102')).toBeInTheDocument();
            })
            });
            
            it('should display a message when no capsules match the search parameters', async () => {
            fetchCapsules.mockResolvedValueOnce(); 
            store = mockStore({
            capsules: {
            capsules: [
            {
            capsule_serial: 'C101',
            status: 'active',
            type: 'Dragon 1.0',
            original_launch: '2010-12-08',
            },
            {
            capsule_serial: 'C102',
            status: 'retired',
            type: 'Dragon 1.0',
            original_launch: '2012-05-22',
            },
            {
            capsule_serial: 'C103',
            status: 'unknown',
            type: 'Dragon 2.0',
            original_launch: null,
            },
            ],
            searchParams: {
            status: 'destroyed',
            },
            currentPage: 1,
            itemsPerPage: 2,
            },
            });
            render(
            <Provider store={store}>
            <CapsuleGrid />
            </Provider>
            );
            await waitFor(() => {
            expect(screen.getByText('Oops ,Nothing to see here')).toBeInTheDocument();
            expect(screen.queryAllByRole('article')).toHaveLength(0);
            });
            });
            
           })
