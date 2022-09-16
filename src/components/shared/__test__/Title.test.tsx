import { Title } from "../Title";
import { render, screen } from "@testing-library/react";

describe('Title', () => { 
    it('should render the title', () => { 
        render(<Title/>);
        const text = screen.getByText('Quiz Game');
        expect(text).toBeInTheDocument();
    })
})