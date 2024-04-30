import { proxy } from 'valtio';
import test from '../assets/logoTest.png'

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: test,
    fullDecal: test
})

export default state;