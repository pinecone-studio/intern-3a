import { checkUser } from '../src/controller/user/checkUser.controller';

describe('checkUser', () => {
  it('should return 401 if user is not authenticated', async () => {
    const req = {
      headers: {},
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Response;

    await checkUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not authenticated' });
  });
});
