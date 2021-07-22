import { estaLogado } from './auth';

describe('Auth', () => {
   it('Deve ter um token no local storage', () => {
       localStorage.setItem('token', 'TOKEN');
       expect(estaLogado()).toBeTruthy();
   });
    it('Não deve ter um token no local storage', () => {
        localStorage.clear();
        expect(estaLogado()).toBeFalsy();
    });
});
