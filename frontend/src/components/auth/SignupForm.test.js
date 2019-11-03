import React from 'react'
import { shallow } from 'enzyme'
import { FormControl, Footer } from './SignupForm'


describe('<SignupForm />', () => {
    it('should render FormControl1 without errors', () => {
        const component = shallow(<FormControl />)
        const wrapper= component.find('.UncontrolledTextField')
        expect(wrapper.length).toBe(1)
    }),
    it('should render FormControl2 without errors', () => {
        const component = shallow(<FormControl validated={false}/>)
        const wrapper = component.find('.ValidationTextFields')
        expect(wrapper.length).toBe(1)
    })
    // it('should render Footer without errors', () => {
    //     const component = shallow(<Footer />)
    //     const wrapper = component.find('.Footer')
    //     expect(wrapper.length).toBe(1)
    // })   
}
)
