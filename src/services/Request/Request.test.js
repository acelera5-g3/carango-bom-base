import request from './Request';

describe('Request service', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({"foo": "bar"});
    });

    it('deve testar token em local storage', async () => {
        global.localStorage.setItem('token', 'TOKEN');
        const req = await request("https://test.com", 'METHOD', {});
        expect(req).toBeDefined();
    });
    it('deve testar sem token em local storage', async () => {
        const req = await request("https://test.com", 'METHOD', {});
        expect(req).toBeDefined();
    });
});
