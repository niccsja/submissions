import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Note from './Notes';

// ...

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true,
    };

    const mockHandler = jest.fn();

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    );

    const button = component.getByText('make not important');
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});
